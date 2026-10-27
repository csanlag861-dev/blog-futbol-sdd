import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { setTimeout as delay } from "node:timers/promises";
import { after, before, test } from "node:test";
import { randomBytes, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";
import Database from "better-sqlite3";
import nextEnv from "@next/env";

const root = process.cwd();
nextEnv.loadEnvConfig(root);
const nextCli = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);
const apiToken = process.env.TEST_BASE_URL
  ? process.env.TEST_API_TOKEN
  : randomBytes(32).toString("hex");
const slug = `api-test-${randomUUID()}`;
let baseUrl = process.env.TEST_BASE_URL || "";
let nextProcess;
let ownsServer = false;
let serverOutput = "";
let draftCreated = false;

async function getAvailablePort() {
  const { createServer } = await import("node:net");
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  return address.port;
}

async function isApiReady() {
  try {
    const response = await fetch(`${baseUrl}/api/articulos`);
    return response.ok;
  } catch {
    return false;
  }
}

function request(pathname, options) {
  return fetch(`${baseUrl}${pathname}`, options);
}

before(async () => {
  if (process.env.TEST_BASE_URL) {
    if (!apiToken) {
      throw new Error("Define TEST_API_TOKEN para probar la API externa.");
    }
    if (await isApiReady()) return;
    throw new Error(`La API de prueba no está disponible en ${baseUrl}.`);
  }

  const port = await getAvailablePort();
  baseUrl = `http://127.0.0.1:${port}`;
  ownsServer = true;
  nextProcess = spawn(
    process.execPath,
    [nextCli, "start", "--hostname", "127.0.0.1", "--port", String(port)],
    {
      cwd: root,
      env: { ...process.env, API_TOKEN: apiToken },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  nextProcess.stdout.setEncoding("utf8").on("data", (chunk) => {
    serverOutput += chunk;
  });
  nextProcess.stderr.setEncoding("utf8").on("data", (chunk) => {
    serverOutput += chunk;
  });

  const deadline = Date.now() + 90_000;
  while (Date.now() < deadline) {
    if (nextProcess.exitCode !== null) {
      throw new Error(`Next.js terminó antes de iniciar:\n${serverOutput}`);
    }
    try {
      if (await isApiReady()) return;
    } catch {
      await delay(500);
      continue;
    }
    await delay(500);
  }

  throw new Error(`Next.js no inició a tiempo:\n${serverOutput}`);
});

after(async () => {
  if (ownsServer && nextProcess && nextProcess.exitCode === null) {
    nextProcess.kill();
    await Promise.race([
      new Promise((resolve) => nextProcess.once("exit", resolve)),
      delay(10_000),
    ]);
  }

  const databasePath = path.join(root, "data", "blog.sqlite");
  if (draftCreated && existsSync(databasePath)) {
    const database = new Database(databasePath);
    database.prepare("DELETE FROM articles WHERE slug = ?").run(slug);
    database.close();
  }
});

test("la API pública solo devuelve artículos publicados", async () => {
  const listResponse = await request("/api/articulos/");
  assert.equal(listResponse.status, 200);
  const list = await listResponse.json();
  assert.ok(Array.isArray(list.articles));
  assert.ok(list.articles.length > 0);
  assert.ok(list.articles.every((article) => article.published === true));

  const publishedSlug = list.articles[0].slug;
  const detailResponse = await request(
    `/api/articulos/${encodeURIComponent(publishedSlug)}/`,
  );
  assert.equal(detailResponse.status, 200);
  assert.equal((await detailResponse.json()).article.slug, publishedSlug);
});

test("la API requiere Bearer token y crea borradores no públicos", async () => {
  const unauthorized = await request("/api/articulos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  assert.equal(unauthorized.status, 401);
  assert.equal(typeof (await unauthorized.json()).error, "string");

  const invalidToken = await request("/api/articulos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer token-invalido",
    },
    body: JSON.stringify({}),
  });
  assert.equal(invalidToken.status, 401);

  const article = {
    slug,
    title: "Artículo de prueba de API",
    category: "Táctica",
    date: "27 de octubre de 2026",
    readingTime: "4 min de lectura",
    excerpt: "Extracto de prueba.",
    lead: "Entradilla de prueba.",
    image: "/images/partido.jpg",
    imageAlt: "Partido de fútbol",
    sections: [{ heading: "Análisis", paragraphs: ["Contenido de prueba."] }],
    published: true,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiToken}`,
  };

  const malformed = await request("/api/articulos", {
    method: "POST",
    headers,
    body: "{",
  });
  assert.equal(malformed.status, 400);
  assert.equal(typeof (await malformed.json()).error, "string");

  const invalid = await request("/api/articulos", {
    method: "POST",
    headers,
    body: JSON.stringify({ ...article, title: "" }),
  });
  assert.equal(invalid.status, 400);

  const createResponse = await request("/api/articulos", {
    method: "POST",
    headers,
    body: JSON.stringify(article),
  });
  assert.equal(createResponse.status, 201);
  draftCreated = true;
  const created = (await createResponse.json()).article;
  assert.equal(created.slug, slug);
  assert.equal(created.published, false);

  const publicList = await (await request("/api/articulos")).json();
  assert.ok(!publicList.articles.some((item) => item.slug === slug));
  const draftDetail = await request(`/api/articulos/${slug}/`);
  assert.equal(draftDetail.status, 404);

  const duplicate = await request("/api/articulos", {
    method: "POST",
    headers,
    body: JSON.stringify(article),
  });
  assert.equal(duplicate.status, 409);

  const database = new Database(path.join(root, "data", "blog.sqlite"), {
    readonly: true,
  });
  const stored = database
    .prepare("SELECT published FROM articles WHERE slug = ?")
    .get(slug);
  database.close();
  assert.deepEqual(stored, { published: 0 });
});
