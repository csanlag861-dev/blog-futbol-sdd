# Incorporar una API REST al blog de fútbol

Actúa como desarrollador experto en Next.js y TypeScript. Analiza el repositorio, especialmente `src/app/`, `src/lib/`, `PRD.md` y `spec/`. Antes de implementar, consulta la documentación de Route Handlers incluida en la versión de Next.js instalada y actualiza primero las especificaciones que correspondan.

## 1. API

Implementa la API con Route Handlers del App Router de Next.js, dentro de `src/app/api/`:

- `GET /api/articulos/`: devuelve los artículos publicados.
- `GET /api/articulos/{slug}/`: devuelve un artículo publicado identificado por su slug.
- `POST /api/articulos/`: crea un artículo como borrador.

Usa `slug` como identificador, de acuerdo con las rutas públicas `/articulos/[slug]` y el almacenamiento actual. Las consultas y escrituras deben utilizar las funciones y la conexión SQLite existentes en `src/lib/database.ts`; no crees otra base de datos ni dupliques la lógica de persistencia.

## 2. Contrato JSON

Los artículos siguen el tipo `Article` de `src/lib/articles.ts`. El POST recibe los campos del artículo:

- `slug`, `title`, `category`, `date`, `readingTime`, `excerpt`, `lead`, `image`, `imageAlt` y `sections`.
- Cada elemento de `sections` contiene `heading` y `paragraphs`.
- El cliente no puede decidir el estado de publicación: el servidor debe guardar siempre `published: false`.

La respuesta de la colección usa `{ "articles": [...] }`. Las respuestas de detalle y creación usan `{ "article": {...} }`; la creación responde con estado HTTP `201` e incluye `published: false`. Los errores se devuelven como JSON con un campo `error` y un estado HTTP apropiado.

## 3. Datos y validación

- Conserva el tipo `Article`, el esquema SQLite existente y los campos obligatorios actuales; evita cambios de modelo o migraciones.
- Reutiliza `validateArticle` o adapta la validación para que el servidor establezca `published: false` sin confiar en un valor enviado por el cliente.
- Valida el cuerpo recibido y conserva las restricciones actuales para slugs, texto, imágenes y secciones.
- Trata un slug duplicado como conflicto (`409`) y devuelve `404` cuando no exista el artículo solicitado.
- No devuelvas borradores a través de los endpoints públicos, ni siquiera cuando se consulte directamente su slug.

## 4. Seguridad

- Los GET son públicos y solo devuelven artículos publicados.
- El POST requiere `Authorization: Bearer <token>` y compara el token con `API_TOKEN`, configurado únicamente en el entorno del servidor. Rechaza tokens ausentes o incorrectos con `401`; si el token no está configurado correctamente, responde `503`.
- Mantén la sesión basada en `ADMIN_PASSWORD` para el panel `/admin`, independiente del token de automatización.
- No añadas cuentas ni perfiles de usuario. Genera el token como secreto aleatorio, no lo expongas al navegador ni lo incluyas en Git.
- Los errores de entrada inválida y JSON mal formado deben comunicarse explícitamente con estados apropiados.

## 5. Compatibilidad

- Conserva la web pública, el panel `/admin`, el inicio y cierre de sesión, las rutas `/api/admin/` y los artículos existentes.
- Mantén SQLite como almacenamiento y reutiliza las funciones de acceso a datos existentes siempre que sea posible.
- No añadas dependencias si la API se puede implementar con Next.js, TypeScript y las utilidades ya presentes.
- No conviertas el proyecto a Django ni incorpores Django REST Framework, FastAPI, agentes o MCP.

## 6. Verificación y documentación

- Añade pruebas para los contratos de la API, permisos, validación, exclusión de borradores y creación persistente de borradores. Usa las herramientas ya configuradas en el proyecto; no incorpores un framework de pruebas sin justificarlo.
- Ejecuta las comprobaciones disponibles, como `npm run lint`, `npm run typecheck` y `npm run build`, además de las pruebas que hayas añadido.
- Actualiza el README con instrucciones para configurar `API_TOKEN` en `.env.local` y ejemplos `curl` para listar y consultar artículos, y para crear un borrador con autorización Bearer.
- Resume los cambios y los resultados de las comprobaciones ejecutadas.
