import { InlineKeyboard } from "grammy";
import { LANG_CODES, LANGS, type LangCode, t } from "./langs";

export function mainMenuKeyboard(lang: LangCode) {
  const s = t(lang);
  return new InlineKeyboard()
    .text(s.searchBtn, "menu_search")
    .row()
    .text(s.downloadBtn, "menu_download")
    .row()
    .text(s.statsBtn, "menu_stats")
    .row()
    .text(s.helpBtn, "menu_help")
    .text("🌐 Til / Lang", "menu_lang");
}

export function langKeyboard() {
  const kb = new InlineKeyboard();
  const codes = LANG_CODES;
  for (let i = 0; i < codes.length; i += 2) {
    const a = codes[i]!;
    const b = codes[i + 1];
    const btnA = LANGS[a];
    if (b) {
      const btnB = LANGS[b];
      kb.text(`${btnA.flag} ${btnA.name}`, `lang_${a}`)
        .text(`${btnB.flag} ${btnB.name}`, `lang_${b}`)
        .row();
    } else {
      kb.text(`${btnA.flag} ${btnA.name}`, `lang_${a}`).row();
    }
  }
  return kb;
}

export function downloadTypeKeyboard(urlId: string, lang: LangCode) {
  const s = t(lang);
  return new InlineKeyboard()
    .text(s.audioBtn, `a_${urlId}`)
    .text(s.videoBtn, `v_${urlId}`)
    .row()
    .text(s.backBtn, "menu_main");
}

export function searchResultKeyboard(youtubeUrl: string, urlId: string, lang: LangCode) {
  const s = t(lang);
  return new InlineKeyboard()
    .url(s.youtubeBtn, youtubeUrl)
    .row()
    .text(s.audioBtn, `a_${urlId}`)
    .text(s.videoBtn, `v_${urlId}`);
}

export function backKeyboard(lang: LangCode) {
  return new InlineKeyboard().text(t(lang).backBtn, "menu_main");
}
