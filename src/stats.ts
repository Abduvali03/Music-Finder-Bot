const startTime = Date.now();

interface UserStat {
  searches: number;
  audioDownloads: number;
  videoDownloads: number;
  firstSeen: number;
  lastSeen: number;
}

const users = new Map<number, UserStat>();

let totalSearches = 0;
let totalAudioDownloads = 0;
let totalVideoDownloads = 0;

export function trackUser(userId: number) {
  if (!users.has(userId)) {
    users.set(userId, {
      searches: 0,
      audioDownloads: 0,
      videoDownloads: 0,
      firstSeen: Date.now(),
      lastSeen: Date.now(),
    });
  } else {
    users.get(userId)!.lastSeen = Date.now();
  }
}

export function trackSearch(userId: number) {
  trackUser(userId);
  users.get(userId)!.searches++;
  totalSearches++;
}

export function trackDownload(userId: number, mode: "audio" | "video") {
  trackUser(userId);
  if (mode === "audio") {
    users.get(userId)!.audioDownloads++;
    totalAudioDownloads++;
  } else {
    users.get(userId)!.videoDownloads++;
    totalVideoDownloads++;
  }
}

export function getGlobalStats() {
  const uptimeMs = Date.now() - startTime;
  const uptimeSec = Math.floor(uptimeMs / 1000);
  const d = Math.floor(uptimeSec / 86400);
  const h = Math.floor((uptimeSec % 86400) / 3600);
  const m = Math.floor((uptimeSec % 3600) / 60);
  const uptime = d > 0 ? `${d}k ${h}s ${m}d` : h > 0 ? `${h}s ${m}d` : `${m}d`;

  return {
    totalUsers: users.size,
    totalSearches,
    totalAudioDownloads,
    totalVideoDownloads,
    totalDownloads: totalAudioDownloads + totalVideoDownloads,
    uptime,
  };
}

export function getUserStats(userId: number): UserStat | null {
  return users.get(userId) ?? null;
}
