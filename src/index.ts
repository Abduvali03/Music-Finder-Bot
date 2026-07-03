import { Bot } from "grammy";
import yts from "yt-search";
import { logger } from "../lib/logger";
import { getMediaInfo, downloadMedia, cleanupTmp, isValidUrl, detectPlatform, formatDuration, DownloadError } from "./downloader";
import { mainMenuKeyboard, downloadTypeKeyboard, searchResultKeyboard, backKeyboard, langKeyboard } from "./menus";
import { saveUrl, getUrl, getEntry } from "./urlstore";
import { setupBot } from "./setup";
import { getUserLang, setUserLang } from "./langstore";
import { t, LANG_CODES, type LangCode } from "./langs";
import { trackUser, trackSearch, trackDownload, getGlobalStats, getUserStats } from "./stats";

const token = process.env["TELEGRAM_BOT_TOKEN"];
if (!token) throw new Error("TELEGRAM_BOT_TOKEN environment variable is required");

export const bot = new Bot(token);

const MAX_TG_FILE_SIZE = 50 * 1024 * 1024;

function uid(ctx: any): number {
  return ctx.from?.id ?? 0;
}

// ── /start ──────────────────────────────────────────────────────────────────
bot.command("start", async (ctx) => {
  const lang = getUserLang(uid(ctx));
  const s = t(lang);
  await ctx.reply(s.welcome, {
    parse_mode: "MarkdownV2",
    reply_markup: mainMenuKeyboard(lang),
  });
});

// ── /help ───────────────────────────────────────────────────────────────────
bot.command("help", async (ctx) => {
  const lang = getUserLang(uid(ctx));
  await ctx.reply(t(lang).helpText, {
    parse_mode: "MarkdownV2",
    reply_markup: backKeyboard(lang),
  });
});

// ── /stats ──────────────────────────────────────────────────────────────────
bot.command("stats", async (ctx) => {
  const id = uid(ctx);
  const lang = getUserLang(id);
  const g = getGlobalStats();
  const u = getUserStats(id);
  const text = t(lang).statsText(
    { users: g.totalUsers, searches: g.totalSearches, audio: g.totalAudioDownloads, video: g.totalVideoDownloads, uptime: g.uptime },
    u ? { searches: u.searches, audio: u.audioDownloads, video: u.videoDownloads } : null
  );
  await ctx.reply(text, { parse_mode: "Markdown", reply_markup: backKeyboard(lang) });
});

// ── /lang ───────────────────────────────────────────────────────────────────
bot.command("lang", async (ctx) => {
  const lang = getUserLang(uid(ctx));
  await ctx.reply(t(lang).selectLang, { reply_markup: langKeyboard() });
});

// ── /search ─────────────────────────────────────────────────────────────────
bot.command("search", async (ctx) => {
  const lang = getUserLang(uid(ctx));
  const query = ctx.match;
  if (!query) {
    await ctx.reply(t(lang).noQuery, { reply_markup: backKeyboard(lang) });
    return;
  }
  await handleSearch(ctx, query, lang);
});

// ── Language selection ───────────────────────────────────────────────────────
bot.callbackQuery(/^lang_(.+)$/, async (ctx) => {
  const code = ctx.match[1] as LangCode;
  if (!LANG_CODES.includes(code)) { await ctx.answerCallbackQuery(); return; }
  setUserLang(uid(ctx), code);
  const s = t(code);
  await ctx.answerCallbackQuery(s.langSet.replace(/\\/g, ""));
  await ctx.editMessageText(s.welcome, {
    parse_mode: "MarkdownV2",
    reply_markup: mainMenuKeyboard(code),
  });
});

// ── Main menu callbacks ──────────────────────────────────────────────────────
bot.callbackQuery("menu_main", async (ctx) => {
  const lang = getUserLang(uid(ctx));
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(t(lang).welcome, {
    parse_mode: "MarkdownV2",
    reply_markup: mainMenuKeyboard(lang),
  });
});

bot.callbackQuery("menu_help", async (ctx) => {
  const lang = getUserLang(uid(ctx));
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(t(lang).helpText, {
    parse_mode: "MarkdownV2",
    reply_markup: backKeyboard(lang),
  });
});

bot.callbackQuery("menu_lang", async (ctx) => {
  const lang = getUserLang(uid(ctx));
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(t(lang).selectLang, { reply_markup: langKeyboard() });
});

bot.callbackQuery("menu_stats", async (ctx) => {
  const id = uid(ctx);
  const lang = getUserLang(id);
  const g = getGlobalStats();
  const u = getUserStats(id);
  const text = t(lang).statsText(
    { users: g.totalUsers, searches: g.totalSearches, audio: g.totalAudioDownloads, video: g.totalVideoDownloads, uptime: g.uptime },
    u ? { searches: u.searches, audio: u.audioDownloads, video: u.videoDownloads } : null
  );
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(text, { parse_mode: "Markdown", reply_markup: backKeyboard(lang) });
});

bot.callbackQuery("menu_search", async (ctx) => {
  const lang = getUserLang(uid(ctx));
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(t(lang).searchPrompt, {
    parse_mode: "MarkdownV2",
    reply_markup: backKeyboard(lang),
  });
});

bot.callbackQuery("menu_download", async (ctx) => {
  const lang = getUserLang(uid(ctx));
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(t(lang).downloadPrompt, {
    parse_mode: "MarkdownV2",
    reply_markup: backKeyboard(lang),
  });
});

// ── Download callback: a_{id} = audio, v_{id} = video ───────────────────────
bot.callbackQuery(/^([av])_([0-9a-f]{8})$/, async (ctx) => {
  const lang = getUserLang(uid(ctx));
  const s = t(lang);
  const mode = ctx.match[1] === "a" ? "audio" : "video";
  const urlId = ctx.match[2]!;
  const entry = getEntry(urlId);

  if (!entry) {
    await ctx.answerCallbackQuery(s.linkExpired.replace(/\\/g, ""));
    return;
  }

  const { url, title, uploader } = entry;

  await ctx.answerCallbackQuery(mode === "audio" ? s.mp3Ready.replace(/\\/g, "") : s.mp4Ready.replace(/\\/g, ""));

  const statusMsg = await ctx.reply(
    mode === "audio" ? s.audioLoading : s.videoLoading,
    { parse_mode: "MarkdownV2" }
  );

  let tmpDir: string | null = null;
  try {
    const { filePath, tmpDir: td } = await downloadMedia(url, mode);
    tmpDir = td;

    const { stat } = await import("node:fs/promises");
    const fileSize = (await stat(filePath)).size;
    const mb = Math.round(fileSize / 1024 / 1024);

    if (fileSize > MAX_TG_FILE_SIZE) {
      await ctx.api.editMessageText(ctx.chat!.id, statusMsg.message_id, s.tooLarge(mb), {
        parse_mode: "MarkdownV2",
        reply_markup: backKeyboard(lang),
      });
      return;
    }

    await ctx.api.deleteMessage(ctx.chat!.id, statusMsg.message_id);
    trackDownload(uid(ctx), mode);

    const { InputFile } = await import("grammy");
    if (mode === "audio") {
      await ctx.replyWithAudio(new InputFile(filePath), {
        title: title ?? undefined,
        performer: uploader ?? undefined,
        reply_markup: backKeyboard(lang),
      });
    } else {
      await ctx.replyWithVideo(new InputFile(filePath), {
        supports_streaming: true,
        reply_markup: backKeyboard(lang),
      });
    }
  } catch (err) {
    logger.error({ err }, "Download failed");
    await ctx.api.editMessageText(ctx.chat!.id, statusMsg.message_id, s.downloadError, {
      parse_mode: "MarkdownV2",
      reply_markup: backKeyboard(lang),
    });
  } finally {
    if (tmpDir) await cleanupTmp(tmpDir);
  }
});

// ── Text: URL or search query ────────────────────────────────────────────────
bot.on("message:text", async (ctx) => {
  const text = ctx.message.text.trim();
  if (text.startsWith("/")) return;
  const id = uid(ctx);
  trackUser(id);
  const lang = getUserLang(id);
  if (isValidUrl(text)) {
    await handleUrl(ctx, text, lang);
  } else {
    await handleSearch(ctx, text, lang);
  }
});

// ── URL handler ──────────────────────────────────────────────────────────────
async function handleUrl(ctx: any, url: string, lang: LangCode) {
  const s = t(lang);
  const platform = detectPlatform(url);
  const msg = await ctx.reply(s.detectingLink(escMd(platform)), { parse_mode: "MarkdownV2" });

  try {
    const info = await getMediaInfo(url);
    const urlId = saveUrl(url, { title: info.title, uploader: info.uploader });

    await ctx.api.editMessageText(
      ctx.chat.id, msg.message_id,
      `${s.found}\n\n🎵 *${escMd(info.title)}*\n👤 ${escMd(info.uploader)}\n⏱ ${escMd(formatDuration(info.duration))}\n📡 ${escMd(platform)}\n\n${s.chooseFormat}`,
      { parse_mode: "MarkdownV2", reply_markup: downloadTypeKeyboard(urlId, lang) }
    );
  } catch (err) {
    logger.error({ err }, "getMediaInfo failed");
    let errorText = s.infoError;
    if (err instanceof DownloadError) {
      if (err.kind === "auth") errorText = s.authError;
      else if (err.kind === "unavailable") errorText = s.unavailableError;
    }
    await ctx.api.editMessageText(ctx.chat.id, msg.message_id, errorText, {
      parse_mode: "MarkdownV2",
      reply_markup: backKeyboard(lang),
    });
  }
}

// ── Search handler ───────────────────────────────────────────────────────────
async function handleSearch(ctx: any, query: string, lang: LangCode) {
  trackSearch(uid(ctx));
  const s = t(lang);
  const msg = await ctx.reply(s.searching(escMd(query)), { parse_mode: "MarkdownV2" });

  try {
    const result = await yts(query);
    const videos = result.videos.slice(0, 5);

    if (videos.length === 0) {
      await ctx.api.editMessageText(ctx.chat.id, msg.message_id, s.notFound, {
        parse_mode: "MarkdownV2", reply_markup: backKeyboard(lang),
      });
      return;
    }

    await ctx.api.deleteMessage(ctx.chat.id, msg.message_id);
    await ctx.reply(s.results(escMd(query), videos.length), { parse_mode: "MarkdownV2" });

    for (const video of videos) {
      const duration = video.duration?.timestamp ?? "?";
      const views = Number(video.views).toLocaleString();
      const urlId = saveUrl(video.url, { title: video.title, uploader: video.author.name });

      await ctx.reply(
        `🎵 *${escMd(video.title)}*\n👤 ${escMd(video.author.name)}   ⏱ ${duration}   👁 ${views}`,
        { parse_mode: "MarkdownV2", reply_markup: searchResultKeyboard(video.url, urlId, lang) }
      );
    }
  } catch (err) {
    logger.error({ err }, "Search error");
    await ctx.api.editMessageText(ctx.chat.id, msg.message_id, s.searchError, {
      parse_mode: "MarkdownV2", reply_markup: backKeyboard(lang),
    });
  }
}

function escMd(text: string): string {
  return String(text).replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

bot.catch((err) => {
  logger.error({ err: err.error }, "Bot unhandled error");
});

export function startBot() {
  logger.info("Starting Telegram bot...");
  bot.start({
    onStart: async (info) => {
      logger.info({ username: info.username }, "Bot started successfully");
      await setupBot(bot);
    },
  });
}
