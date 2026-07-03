import type { LangCode } from "./langs";

const store = new Map<number, LangCode>();

export function getUserLang(userId: number): LangCode {
  return store.get(userId) ?? "uz";
}

export function setUserLang(userId: number, lang: LangCode): void {
  store.set(userId, lang);
}
