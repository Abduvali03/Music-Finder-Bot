import { Bot } from "grammy";
import { logger } from "./lib/logger";

export async function setupBot(bot: Bot) {
  try {
    await bot.api.setMyName("🎵 Musiqa Bot");

    await bot.api.setMyDescription(
      "🎵 Musiqa Bot — barcha platformalardan musiqa va video yuklab olish!\n\n" +
      "✅ YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n" +
      "🎵 MP3 audio formati\n" +
      "🎬 MP4 video formati\n\n" +
      "Boshlash uchun /start ni bosing 👇"
    );

    await bot.api.setMyShortDescription(
      "YouTube, TikTok, Instagram va boshqa saytlardan musiqa va video yuklash boti 🎵"
    );

    await bot.api.setMyCommands([
      { command: "start", description: "🏠 Bosh menyu" },
      { command: "search", description: "🔍 Musiqa qidirish" },
      { command: "stats", description: "📊 Statistika" },
      { command: "lang", description: "🌐 Tilni o'zgartirish" },
      { command: "help", description: "ℹ️ Yordam" },
    ]);

    logger.info("Bot profile and commands set successfully");
  } catch (err) {
    logger.error({ err }, "Failed to setup bot profile");
  }
}
