import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, rm, readdir, access } from "node:fs/promises";
import path from "node:path";
import os from "node:os";

const execFileAsync = promisify(execFile);

const YTDLP  = "/nix/store/am2x1y1qyja0hbyjpffj7rcvycp9d644-yt-dlp-2025.6.30/bin/yt-dlp";
const FFMPEG = "/nix/store/k28ypnisbhajg3x1kv5hy7h2vjbajkvy-replit-runtime-path/bin";

// Cookie files for platforms that need login — place them in /tmp/cookies/
const COOKIE_DIR = "/tmp/cookies";
async function cookieArg(platform: string): Promise<string[]> {
  const names: Record<string, string> = {
    instagram: "instagram.txt",
    tiktok:    "tiktok.txt",
    facebook:  "facebook.txt",
  };
  const file = names[platform];
  if (!file) return [];
  const fullPath = path.join(COOKIE_DIR, file);
  try {
    await access(fullPath);
    return ["--cookies", fullPath];
  } catch {
    return [];
  }
}

// Browser-like headers — only for platforms that need them (NOT YouTube)
// YouTube rejects Chrome UA and returns "not available on this app"
function browserArgs(url: string): string[] {
  if (/youtube\.com|youtu\.be/i.test(url)) return [];
  return [
    "--user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "--add-header", "Accept-Language:en-US,en;q=0.9",
  ];
}

// Per-platform extractor tweaks
function platformArgs(url: string): string[] {
  if (/youtube\.com|youtu\.be/i.test(url)) {
    // android client bypasses "not available on this app" bot-protection
    return ["--extractor-args", "youtube:player_client=android,web"];
  }
  if (/tiktok\.com/i.test(url)) {
    return [
      "--extractor-args", "tiktok:api_hostname=api16-normal-c-useast1a.tiktokv.com",
    ];
  }
  if (/instagram\.com/i.test(url)) {
    return [
      "--extractor-args", "instagram:app_id=936619743392459",
      "--add-header", "Referer:https://www.instagram.com/",
    ];
  }
  if (/twitter\.com|x\.com/i.test(url)) {
    return [
      "--extractor-args", "twitter:api=syndication",
    ];
  }
  return [];
}

function platformKey(url: string): string {
  if (/instagram\.com/i.test(url)) return "instagram";
  if (/tiktok\.com/i.test(url))    return "tiktok";
  if (/facebook\.com|fb\.watch/i.test(url)) return "facebook";
  return "";
}

export interface MediaInfo {
  title: string;
  duration: number;
  thumbnail: string;
  uploader: string;
  platform: string;
}

const PLATFORM_PATTERNS: Record<string, RegExp> = {
  "YouTube":    /youtube\.com|youtu\.be/,
  "TikTok":     /tiktok\.com/,
  "Instagram":  /instagram\.com/,
  "SoundCloud": /soundcloud\.com/,
  "Twitter/X":  /twitter\.com|x\.com/,
  "VK":         /vk\.com/,
  "Dailymotion":/dailymotion\.com/,
  "Facebook":   /facebook\.com|fb\.watch/,
};

export function detectPlatform(url: string): string {
  for (const [name, pattern] of Object.entries(PLATFORM_PATTERNS)) {
    if (pattern.test(url)) return name;
  }
  return "Boshqa platforma";
}

export function isValidUrl(text: string): boolean {
  try {
    const url = new URL(text);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export type DownloadErrorKind = "auth" | "unsupported" | "unavailable" | "generic";

export class DownloadError extends Error {
  constructor(public kind: DownloadErrorKind, message: string) {
    super(message);
  }
}

function classifyError(stderr: string): DownloadErrorKind {
  const s = stderr.toLowerCase();
  if (
    s.includes("login") || s.includes("cookies") || s.includes("authentication") ||
    s.includes("empty media response") || s.includes("private") || s.includes("sign in") ||
    s.includes("please log in") || s.includes("checkpoint_required") || s.includes("login_required")
  ) {
    return "auth";
  }
  if (
    s.includes("not available") || s.includes("removed") || s.includes("deleted") ||
    s.includes("geo") || s.includes("copyright") || s.includes("no longer available") ||
    s.includes("account has been terminated")
  ) {
    return "unavailable";
  }
  if (s.includes("unsupported url") || s.includes("no video formats")) {
    return "unsupported";
  }
  return "generic";
}

export async function getMediaInfo(url: string): Promise<MediaInfo> {
  const cookies = await cookieArg(platformKey(url));
  let result: { stdout: string; stderr: string };
  try {
    result = await execFileAsync(YTDLP, [
      "--dump-json",
      "--no-playlist",
      "--no-warnings",
      ...browserArgs(url),
      ...platformArgs(url),
      ...cookies,
      url,
    ], { timeout: 30000 });
  } catch (err: any) {
    const stderr: string = err?.stderr ?? err?.message ?? "";
    throw new DownloadError(classifyError(stderr), stderr);
  }

  const info = JSON.parse(result.stdout) as Record<string, unknown>;
  return {
    title:    String(info["title"]    ?? "Noma'lum"),
    duration: Number(info["duration"] ?? 0),
    thumbnail:String(info["thumbnail"]?? ""),
    uploader: String(info["uploader"] ?? info["channel"] ?? "Noma'lum"),
    platform: String(info["extractor_key"] ?? detectPlatform(url)),
  };
}

export async function downloadMedia(
  url: string,
  mode: "audio" | "video"
): Promise<{ filePath: string; tmpDir: string }> {
  const tmpDir  = await mkdtemp(path.join(os.tmpdir(), "bot-dl-"));
  const cookies = await cookieArg(platformKey(url));
  const outputTemplate = path.join(tmpDir, "output.%(ext)s");

  const commonArgs = [
    "--no-playlist",
    "--no-warnings",
    "--ffmpeg-location", FFMPEG,
    ...browserArgs(url),
    ...platformArgs(url),
    ...cookies,
    "-o", outputTemplate,
    url,
  ];

  const modeArgs =
    mode === "audio"
      ? ["-x", "--audio-format", "mp3", "--audio-quality", "128K"]
      : [
          "-f",
          "bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=720]+bestaudio/best[height<=720]/best",
          "--merge-output-format", "mp4",
        ];

  try {
    await execFileAsync(YTDLP, [...modeArgs, ...commonArgs], { timeout: 180000 });
  } catch (err: any) {
    await rm(tmpDir, { recursive: true, force: true });
    const stderr: string = err?.stderr ?? err?.message ?? "";
    throw new DownloadError(classifyError(stderr), stderr);
  }

  const files = await readdir(tmpDir);
  const file  = files.find((f) => f.startsWith("output."));
  if (!file) throw new DownloadError("generic", "Fayl yuklab olinmadi");

  return { filePath: path.join(tmpDir, file), tmpDir };
}

export async function cleanupTmp(tmpDir: string) {
  await rm(tmpDir, { recursive: true, force: true });
}

export function formatDuration(seconds: number): string {
  if (!seconds) return "Noma'lum";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}
