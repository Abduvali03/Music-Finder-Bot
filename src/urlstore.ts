import { randomBytes } from "node:crypto";

export interface UrlEntry {
  url: string;
  title?: string;
  uploader?: string;
  expiresAt: number;
}

const store = new Map<string, UrlEntry>();
const TTL_MS = 60 * 60 * 1000; // 1 soat

export function saveUrl(url: string, meta?: { title?: string; uploader?: string }): string {
  const id = randomBytes(4).toString("hex");
  store.set(id, { url, title: meta?.title, uploader: meta?.uploader, expiresAt: Date.now() + TTL_MS });
  return id;
}

export function getEntry(id: string): UrlEntry | null {
  const entry = store.get(id);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    store.delete(id);
    return null;
  }
  return entry;
}

export function getUrl(id: string): string | null {
  return getEntry(id)?.url ?? null;
}

setInterval(() => {
  const now = Date.now();
  for (const [id, entry] of store.entries()) {
    if (now > entry.expiresAt) store.delete(id);
  }
}, 10 * 60 * 1000);
