import "server-only";
import { timingSafeEqual } from "node:crypto";

const minimumTokenLength = 32;

export function isApiTokenConfigured() {
  const token = process.env.API_TOKEN;
  return Boolean(token && token.length >= minimumTokenLength);
}

export function verifyApiToken(candidate: string) {
  const token = process.env.API_TOKEN;
  if (
    !token ||
    token.length < minimumTokenLength ||
    candidate.length > 256
  ) {
    return false;
  }

  const expected = Buffer.from(token);
  const actual = Buffer.from(candidate);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function isApiTokenAuthorized(authorization: string | null) {
  if (!authorization) return false;

  const match = /^Bearer ([^\s]+)$/i.exec(authorization);
  return match ? verifyApiToken(match[1]) : false;
}
