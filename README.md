# Musiq1 Bot

Telegram music bot - YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK

## O'rnatish

```bash
npm install
cp .env.example .env
# .env faylini to'ldiring
npm run build
npm start
```

## Talablar

- Node.js 18+
- yt-dlp: `pip install yt-dlp`
- ffmpeg: `apt install ffmpeg`

## Imkoniyatlar

- 10 til: O'zbek, Rus, Ingliz, Tojik, Qirgiz, Qozoq, Turkman, Turk, Ozarbayjon, Arab
- YouTube, TikTok, SoundCloud, VK, Twitter/X yuklash
- MP3 audio (128kbps) va MP4 video (720p)
- Musiqa qidirish
- Statistika

## Systemd (Linux server)

```ini
[Unit]
Description=Musiq1 Bot
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/musiq1bot
EnvironmentFile=/opt/musiq1bot/.env
ExecStart=/usr/bin/node /opt/musiq1bot/dist/index.js
Restart=always

[Install]
WantedBy=multi-user.target
```
