#!/bin/bash
set -e

# ── Colors ────────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; BLUE='\033[0;34m'; NC='\033[0m'
info()  { echo -e "${BLUE}[*]${NC} $1"; }
ok()    { echo -e "${GREEN}[✓]${NC} $1"; }
warn()  { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✗]${NC} $1"; exit 1; }

echo -e "${GREEN}"
echo "  ╔══════════════════════════════════════╗"
echo "  ║     🎵 Musiq1 Bot — O'rnatish        ║"
echo "  ╚══════════════════════════════════════╝"
echo -e "${NC}"

# ── Root check ────────────────────────────────────────────────────────────────
[ "$EUID" -ne 0 ] && error "Iltimos root yoki sudo bilan ishga tushiring"

# ── OS check ──────────────────────────────────────────────────────────────────
if ! command -v apt-get &>/dev/null; then
  error "Bu skript faqat Ubuntu/Debian uchun. CentOS uchun qo'lda o'rnating."
fi

# ── Token so'rash ─────────────────────────────────────────────────────────────
echo ""
read -p "  Telegram Bot Token (@BotFather dan): " BOT_TOKEN
[ -z "$BOT_TOKEN" ] && error "Token kiritilmadi!"
echo ""

INSTALL_DIR="/opt/musiq1bot"
SERVICE_USER="musiq1bot"

# ── System update ─────────────────────────────────────────────────────────────
info "Tizim yangilanmoqda..."
apt-get update -qq

# ── Node.js 20 ────────────────────────────────────────────────────────────────
if ! command -v node &>/dev/null || [[ $(node -v | cut -d. -f1 | tr -d v) -lt 18 ]]; then
  info "Node.js 20 o'rnatilmoqda..."
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - >/dev/null 2>&1
  apt-get install -y -qq nodejs
  ok "Node.js $(node -v) o'rnatildi"
else
  ok "Node.js $(node -v) mavjud"
fi

# ── ffmpeg ────────────────────────────────────────────────────────────────────
if ! command -v ffmpeg &>/dev/null; then
  info "ffmpeg o'rnatilmoqda..."
  apt-get install -y -qq ffmpeg
  ok "ffmpeg o'rnatildi"
else
  ok "ffmpeg mavjud"
fi

# ── yt-dlp ────────────────────────────────────────────────────────────────────
info "yt-dlp o'rnatilmoqda (eng yangi versiya)..."
curl -sL "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp" -o /usr/local/bin/yt-dlp
chmod a+rx /usr/local/bin/yt-dlp
ok "yt-dlp $(yt-dlp --version) o'rnatildi"

# ── git ───────────────────────────────────────────────────────────────────────
if ! command -v git &>/dev/null; then
  apt-get install -y -qq git
fi

# ── Bot foydalanuvchisi ───────────────────────────────────────────────────────
if ! id "$SERVICE_USER" &>/dev/null; then
  info "Tizim foydalanuvchisi yaratilmoqda: $SERVICE_USER"
  useradd --system --shell /bin/false --home "$INSTALL_DIR" --create-home "$SERVICE_USER"
fi

# ── Repo clone yoki update ────────────────────────────────────────────────────
if [ -d "$INSTALL_DIR/.git" ]; then
  info "Kod yangilanmoqda..."
  cd "$INSTALL_DIR" && git pull -q
else
  info "GitHub'dan yuklanmoqda..."
  rm -rf "$INSTALL_DIR"
  git clone -q https://github.com/Abduvali03/Music-Finder-Bot "$INSTALL_DIR"
fi
chown -R "$SERVICE_USER:$SERVICE_USER" "$INSTALL_DIR"

# ── .env ─────────────────────────────────────────────────────────────────────
info ".env fayl yaratilmoqda..."
cat > "$INSTALL_DIR/.env" << ENV
TELEGRAM_BOT_TOKEN=${BOT_TOKEN}
NODE_ENV=production
YTDLP_PATH=/usr/local/bin/yt-dlp
FFMPEG_PATH=/usr/bin
ENV
chmod 600 "$INSTALL_DIR/.env"
chown "$SERVICE_USER:$SERVICE_USER" "$INSTALL_DIR/.env"
ok ".env tayyor"

# ── npm install + build ───────────────────────────────────────────────────────
info "Kutubxonalar o'rnatilmoqda..."
cd "$INSTALL_DIR"
npm install --quiet 2>/dev/null
ok "npm install bajarildi"

info "Loyiha build qilinmoqda..."
npm run build 2>&1 | tail -5
ok "Build muvaffaqiyatli"

# ── systemd service ───────────────────────────────────────────────────────────
info "Systemd xizmati sozlanmoqda..."
cat > /etc/systemd/system/musiq1bot.service << SERVICE
[Unit]
Description=Musiq1 Telegram Bot
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=${SERVICE_USER}
WorkingDirectory=${INSTALL_DIR}
EnvironmentFile=${INSTALL_DIR}/.env
ExecStart=/usr/bin/node ${INSTALL_DIR}/dist/index.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SERVICE

systemctl daemon-reload
systemctl enable musiq1bot -q
systemctl restart musiq1bot
sleep 3

# ── Status tekshiruv ──────────────────────────────────────────────────────────
if systemctl is-active --quiet musiq1bot; then
  echo ""
  echo -e "${GREEN}╔══════════════════════════════════════════════╗${NC}"
  echo -e "${GREEN}║  ✅  Bot muvaffaqiyatli ishga tushdi!        ║${NC}"
  echo -e "${GREEN}╚══════════════════════════════════════════════╝${NC}"
  echo ""
  echo "  Foydali buyruqlar:"
  echo "  📋 Loglarni ko'rish:  journalctl -u musiq1bot -f"
  echo "  🔄 Qayta ishlatish:   systemctl restart musiq1bot"
  echo "  ⏹  To'xtatish:       systemctl stop musiq1bot"
  echo "  📦 Yangilash:         cd /opt/musiq1bot && git pull && npm run build && systemctl restart musiq1bot"
  echo ""
else
  warn "Bot ishga tushmadi. Loglarni tekshiring:"
  journalctl -u musiq1bot -n 20 --no-pager
fi
