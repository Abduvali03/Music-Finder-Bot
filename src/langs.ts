export type LangCode =
  | "uz" | "ru" | "en" | "tg" | "ky" | "kk" | "tk" | "tr" | "az" | "ar";

export interface LangStrings {
  flag: string;
  name: string;
  welcome: string;
  welcomeShort: string;
  searchBtn: string;
  downloadBtn: string;
  helpBtn: string;
  backBtn: string;
  searchPrompt: string;
  downloadPrompt: string;
  searching: (q: string) => string;
  results: (q: string, n: number) => string;
  notFound: string;
  searchError: string;
  detectingLink: (platform: string) => string;
  found: string;
  chooseFormat: string;
  infoError: string;
  authError: string;
  unavailableError: string;
  audioLoading: string;
  videoLoading: string;
  mp3Ready: string;
  mp4Ready: string;
  tooLarge: (mb: number) => string;
  downloadError: string;
  linkExpired: string;
  helpText: string;
  noQuery: string;
  selectLang: string;
  langSet: string;
  audioBtn: string;
  videoBtn: string;
  youtubeBtn: string;
  platformsLine: string;
  statsBtn: string;
  statsText: (g: { users: number; searches: number; audio: number; video: number; uptime: string }, u: { searches: number; audio: number; video: number } | null) => string;
}

const T: Record<LangCode, LangStrings> = {
  uz: {
    flag: "🇺🇿", name: "O'zbekcha",
    welcome: `🎵 *Musiqa Bot*\n\nBarcha platformalardan musiqa va video yuklash\\!\n\n*Nima qila olaman:*\n🔍 Nom yoki ijrochi bo'yicha qidirish\n📥 Havola orqali yuklab olish\n🎵 MP3 audio\n🎬 MP4 video\n\n*Platformalar:* YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK va boshqalar\\.\n\nHavola yuboring yoki tugmalardan foydalaning 👇`,
    welcomeShort: "Havola yuboring yoki qidiring 👇",
    searchBtn: "🔍 Musiqa qidirish",
    downloadBtn: "📥 Havola yuklash",
    helpBtn: "ℹ️ Yordam",
    backBtn: "🔙 Bosh menyu",
    searchPrompt: "🔍 *Qidirish*\n\nMusiqa nomi yoki ijrochi ismini yuboring:",
    downloadPrompt: "📥 *Havola yuklash*\n\nYouTube, TikTok, Instagram, SoundCloud va boshqalardan havolani yuboring:",
    searching: (q) => `🔍 *"${q}"* qidirilmoqda\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — ${n} ta natija:`,
    notFound: "❌ Hech narsa topilmadi\\. Boshqa so'z bilan urinib ko'ring\\.",
    searchError: "❌ Qidiruvda xatolik\\. Qayta urinib ko'ring\\.",
    detectingLink: (p) => `🔍 *${p}* havolasi aniqlandi\\.\n\nMa'lumot olinmoqda\\.\\.\\.`,
    found: "✅ *Topildi\\!*",
    chooseFormat: "Formatni tanlang:",
    infoError: "❌ *Xatolik\\.* Havola noto'g'ri yoki qo'llab\\-quvvatlanmaydi\\.",
    authError: "🔒 *Bu kontent ochiq emas\\.* Instagram, TikTok va Facebook ko'pincha login talab qiladi\\. YouTube havolasini yuboring yoki qidiruv foydalaning\\.",
    unavailableError: "⛔ *Kontent mavjud emas\\.* Havola o'chirilgan, geografik cheklangan yoki mualliflik huquqi bilan himoyalangan\\.",
    audioLoading: "⏳ *MP3 tayyorlanmoqda\\.\\.\\.* Iltimos kuting\\.",
    videoLoading: "⏳ *MP4 tayyorlanmoqda\\.\\.\\.* Iltimos kuting\\.",
    mp3Ready: "⏳ Audio yuklanmoqda\\.\\.\\.",
    mp4Ready: "⏳ Video yuklanmoqda\\.\\.\\.",
    tooLarge: (mb) => `❌ Fayl juda katta \\(${mb}MB\\)\\. Telegram 50MB\\'dan kattani qo'llab\\-quvvatlamaydi\\.`,
    downloadError: "❌ Yuklashda xatolik\\. Qayta urinib ko'ring\\.",
    linkExpired: "❌ Havola eskirgan. Qayta yuboring.",
    helpText: `ℹ️ *Yordam*\n\nHavolani yuboring — bot o'zi taniydi\\!\n\n*Qo'llab\\-quvvatlanadigan saytlar:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*Qidirish:* /search Shahzoda\nYoki musiqa nomini yozing\\.`,
    noQuery: "❌ Misol: /search Shahzoda Maftuna",
    selectLang: "🌐 Tilni tanlang:",
    langSet: "✅ Til o'rnatildi: O'zbekcha 🇺🇿",
    audioBtn: "🎵 MP3 Audio",
    videoBtn: "🎬 MP4 Video",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 Statistika",
    statsText: (g, u) =>
      `📊 *Bot Statistikasi*\n\n` +
      `👥 Jami foydalanuvchilar: *${g.users}*\n` +
      `🔍 Jami qidiruvlar: *${g.searches}*\n` +
      `🎵 MP3 yuklashlar: *${g.audio}*\n` +
      `🎬 MP4 yuklashlar: *${g.video}*\n` +
      `📦 Jami yuklashlar: *${g.audio + g.video}*\n` +
      `⏱ Ishlash vaqti: *${g.uptime}*\n` +
      (u ? `\n👤 *Siz:*\n🔍 Qidiruvlar: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
  ru: {
    flag: "🇷🇺", name: "Русский",
    welcome: `🎵 *Музыкальный Бот*\n\nСкачивай музыку и видео с любых платформ\\!\n\n*Что умею:*\n🔍 Поиск по названию или исполнителю\n📥 Скачивание по ссылке\n🎵 Аудио MP3\n🎬 Видео MP4\n\n*Платформы:* YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK и другие\\.\n\nОтправь ссылку или используй кнопки 👇`,
    welcomeShort: "Отправь ссылку или найди музыку 👇",
    searchBtn: "🔍 Поиск музыки",
    downloadBtn: "📥 Скачать по ссылке",
    helpBtn: "ℹ️ Помощь",
    backBtn: "🔙 Главное меню",
    searchPrompt: "🔍 *Поиск*\n\nВведите название песни или исполнителя:",
    downloadPrompt: "📥 *Скачать по ссылке*\n\nОтправьте ссылку с YouTube, TikTok, Instagram, SoundCloud и других сайтов:",
    searching: (q) => `🔍 Ищем *"${q}"*\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — найдено ${n}:`,
    notFound: "❌ Ничего не найдено\\. Попробуйте другой запрос\\.",
    searchError: "❌ Ошибка поиска\\. Попробуйте снова\\.",
    detectingLink: (p) => `🔍 Ссылка *${p}* обнаружена\\.\n\nПолучаю информацию\\.\\.\\.`,
    found: "✅ *Найдено\\!*",
    chooseFormat: "Выберите формат:",
    infoError: "❌ *Ошибка\\.* Ссылка неверна или не поддерживается\\.",
    authError: "🔒 *Контент закрыт\\.* Instagram, TikTok и Facebook часто требуют авторизацию\\. Используйте ссылку YouTube или поиск\\.",
    unavailableError: "⛔ *Контент недоступен\\.* Ссылка удалена, заблокирована по региону или защищена авторским правом\\.",
    audioLoading: "⏳ *Готовлю MP3\\.\\.\\.* Подождите\\.",
    videoLoading: "⏳ *Готовлю MP4\\.\\.\\.* Подождите\\.",
    mp3Ready: "⏳ Загружается аудио\\.\\.\\.",
    mp4Ready: "⏳ Загружается видео\\.\\.\\.",
    tooLarge: (mb) => `❌ Файл слишком большой \\(${mb}МБ\\)\\. Telegram поддерживает до 50МБ\\.`,
    downloadError: "❌ Ошибка загрузки\\. Попробуйте снова\\.",
    linkExpired: "❌ Ссылка устарела. Отправьте заново.",
    helpText: `ℹ️ *Помощь*\n\nОтправьте ссылку — бот сам распознает\\!\n\n*Поддерживаемые сайты:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*Поиск:* /search Adele Hello\nИли просто напишите название\\.\nЯзык: /lang`,
    noQuery: "❌ Пример: /search Адель Hello",
    selectLang: "🌐 Выберите язык:",
    langSet: "✅ Язык установлен: Русский 🇷🇺",
    audioBtn: "🎵 MP3 Аудио",
    videoBtn: "🎬 MP4 Видео",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 Статистика",
    statsText: (g, u) =>
      `📊 *Статистика бота*\n\n` +
      `👥 Всего пользователей: *${g.users}*\n` +
      `🔍 Всего поисков: *${g.searches}*\n` +
      `🎵 Загрузок MP3: *${g.audio}*\n` +
      `🎬 Загрузок MP4: *${g.video}*\n` +
      `📦 Всего загрузок: *${g.audio + g.video}*\n` +
      `⏱ Аптайм: *${g.uptime}*\n` +
      (u ? `\n👤 *Вы:*\n🔍 Поисков: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
  en: {
    flag: "🇬🇧", name: "English",
    welcome: `🎵 *Music Bot*\n\nDownload music and videos from any platform\\!\n\n*What I can do:*\n🔍 Search by title or artist\n📥 Download via link\n🎵 MP3 Audio\n🎬 MP4 Video\n\n*Platforms:* YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK and more\\.\n\nSend a link or use the buttons below 👇`,
    welcomeShort: "Send a link or search for music 👇",
    searchBtn: "🔍 Search Music",
    downloadBtn: "📥 Download via Link",
    helpBtn: "ℹ️ Help",
    backBtn: "🔙 Main Menu",
    searchPrompt: "🔍 *Search*\n\nEnter a song title or artist name:",
    downloadPrompt: "📥 *Download via Link*\n\nSend a link from YouTube, TikTok, Instagram, SoundCloud, etc:",
    searching: (q) => `🔍 Searching *"${q}"*\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — ${n} results:`,
    notFound: "❌ Nothing found\\. Try a different search\\.",
    searchError: "❌ Search error\\. Please try again\\.",
    detectingLink: (p) => `🔍 *${p}* link detected\\.\n\nFetching info\\.\\.\\.`,
    found: "✅ *Found\\!*",
    chooseFormat: "Choose format:",
    infoError: "❌ *Error\\.* Invalid link or unsupported platform\\.",
    authError: "🔒 *Content is private\\.* Instagram, TikTok and Facebook often require login\\. Try a YouTube link or use search instead\\.",
    unavailableError: "⛔ *Content unavailable\\.* The link was deleted, geo\\-blocked, or protected by copyright\\.",
    audioLoading: "⏳ *Preparing MP3\\.\\.\\.* Please wait\\.",
    videoLoading: "⏳ *Preparing MP4\\.\\.\\.* Please wait\\.",
    mp3Ready: "⏳ Loading audio\\.\\.\\.",
    mp4Ready: "⏳ Loading video\\.\\.\\.",
    tooLarge: (mb) => `❌ File too large \\(${mb}MB\\)\\. Telegram supports up to 50MB\\.`,
    downloadError: "❌ Download error\\. Please try again\\.",
    linkExpired: "❌ Link expired. Please resend.",
    helpText: `ℹ️ *Help*\n\nJust send a link — the bot will recognize it\\!\n\n*Supported sites:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*Search:* /search Adele Hello\nOr just type the song name\\.\nLanguage: /lang`,
    noQuery: "❌ Example: /search Adele Hello",
    selectLang: "🌐 Select language:",
    langSet: "✅ Language set: English 🇬🇧",
    audioBtn: "🎵 MP3 Audio",
    videoBtn: "🎬 MP4 Video",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 Statistics",
    statsText: (g, u) =>
      `📊 *Bot Statistics*\n\n` +
      `👥 Total users: *${g.users}*\n` +
      `🔍 Total searches: *${g.searches}*\n` +
      `🎵 MP3 downloads: *${g.audio}*\n` +
      `🎬 MP4 downloads: *${g.video}*\n` +
      `📦 Total downloads: *${g.audio + g.video}*\n` +
      `⏱ Uptime: *${g.uptime}*\n` +
      (u ? `\n👤 *You:*\n🔍 Searches: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
  tg: {
    flag: "🇹🇯", name: "Тоҷикӣ",
    welcome: `🎵 *Бот Мусиқӣ*\n\nАз ҳамаи платформаҳо мусиқа ва видео боргирӣ кунед\\!\n\n*Имконияти ман:*\n🔍 Ҷустуҷӯ бо ном ё ҳунарманд\n📥 Боргирӣ аз тариқи истинод\n🎵 Аудио MP3\n🎬 Видео MP4\n\n*Платформаҳо:* YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\nИстинод фиристед ё аз тугмаҳо истифода баред 👇`,
    welcomeShort: "Истинод фиристед ё ҷустуҷӯ кунед 👇",
    searchBtn: "🔍 Ҷустуҷӯи мусиқӣ",
    downloadBtn: "📥 Боргирӣ аз истинод",
    helpBtn: "ℹ️ Кӯмак",
    backBtn: "🔙 Менюи асосӣ",
    searchPrompt: "🔍 *Ҷустуҷӯ*\n\nНоми суруд ё ҳунармандро нависед:",
    downloadPrompt: "📥 *Боргирӣ аз истинод*\n\nИстиноди YouTube, TikTok, Instagram ё SoundCloud бифиристед:",
    searching: (q) => `🔍 *"${q}"* ҷустуҷӯ мешавад\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — ${n} натиҷа:`,
    notFound: "❌ Ҳеҷ чизе ёфт нашуд\\. Дигар сӯзро санҷед\\.",
    searchError: "❌ Хатои ҷустуҷӯ\\. Дубора санҷед\\.",
    detectingLink: (p) => `🔍 Истиноди *${p}* ёфт шуд\\.\n\nМаълумот гирифта мешавад\\.\\.\\.`,
    found: "✅ *Ёфт шуд\\!*",
    chooseFormat: "Форматро интихоб кунед:",
    infoError: "❌ *Хато\\.* Истинод нодуруст ё дастгирӣ нашуда\\.",
    authError: "🔒 *Мӯҳтаво пӯшида аст\\.* Instagram, TikTok ва Facebook аксар вақт воридшавиро талаб мекунанд\\. Истиноди YouTube истифода баред\\.",
    unavailableError: "⛔ *Мӯҳтаво дастрас нест\\.* Истинод нест карда шудааст ё бо ҳуқуқи муаллиф муҳофизат шудааст\\.",
    audioLoading: "⏳ *MP3 омода мешавад\\.\\.\\.* Лутфан интизор шавед\\.",
    videoLoading: "⏳ *MP4 омода мешавад\\.\\.\\.* Лутфан интизор шавед\\.",
    mp3Ready: "⏳ Аудио боргирӣ мешавад\\.\\.\\.",
    mp4Ready: "⏳ Видео боргирӣ мешавад\\.\\.\\.",
    tooLarge: (mb) => `❌ Файл хеле калон аст \\(${mb}МБ\\)\\. Telegram то 50МБ\\-ро дастгирӣ мекунад\\.`,
    downloadError: "❌ Хатои боргирӣ\\. Дубора санҷед\\.",
    linkExpired: "❌ Истинод кӯҳна шудааст. Дубора бифиристед.",
    helpText: `ℹ️ *Кӯмак*\n\nИстинод фиристед — бот худаш мешиносад\\!\n\n*Сайтҳои дастгирӣшаванда:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*Ҷустуҷӯ:* /search Садо Худоназаров\nЯ танҳо номро нависед\\.\nЗабон: /lang`,
    noQuery: "❌ Намуна: /search Садо Худоназаров",
    selectLang: "🌐 Забонро интихоб кунед:",
    langSet: "✅ Забон танзим шуд: Тоҷикӣ 🇹🇯",
    audioBtn: "🎵 MP3 Аудио",
    videoBtn: "🎬 MP4 Видео",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 Омор",
    statsText: (g, u) =>
      `📊 *Омори Бот*\n\n` +
      `👥 Ҷамъи корбарон: *${g.users}*\n` +
      `🔍 Ҷамъи ҷустуҷӯҳо: *${g.searches}*\n` +
      `🎵 Боргириҳои MP3: *${g.audio}*\n` +
      `🎬 Боргириҳои MP4: *${g.video}*\n` +
      `📦 Ҷамъи боргириҳо: *${g.audio + g.video}*\n` +
      `⏱ Вақти кор: *${g.uptime}*\n` +
      (u ? `\n👤 *Шумо:*\n🔍 Ҷустуҷӯҳо: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
  ky: {
    flag: "🇰🇬", name: "Кыргызча",
    welcome: `🎵 *Музыка Бот*\n\nБардык платформалардан музыка жана видео жүктөп алыңыз\\!\n\n*Эмне кыла алам:*\n🔍 Ат же аткаруучу боюнча издөө\n📥 Шилтеме аркылуу жүктөө\n🎵 MP3 аудио\n🎬 MP4 видео\n\n*Платформалар:* YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\nШилтеме жибериңиз же баскычтарды колдонуңуз 👇`,
    welcomeShort: "Шилтеме жибериңиз же издеңиз 👇",
    searchBtn: "🔍 Музыка издөө",
    downloadBtn: "📥 Шилтеме аркылуу жүктөө",
    helpBtn: "ℹ️ Жардам",
    backBtn: "🔙 Башкы меню",
    searchPrompt: "🔍 *Издөө*\n\nыр аты же аткаруучунун атын жазыңыз:",
    downloadPrompt: "📥 *Шилтеме аркылуу жүктөө*\n\nYouTube, TikTok, Instagram же SoundCloud шилтемесин жибериңиз:",
    searching: (q) => `🔍 *"${q}"* издөлүүдө\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — ${n} натыйжа:`,
    notFound: "❌ Эч нерсе табылган жок\\. Башка сөз менен аракет кылыңыз\\.",
    searchError: "❌ Издөөдө ката\\. Кайра аракет кылыңыз\\.",
    detectingLink: (p) => `🔍 *${p}* шилтемеси аныкталды\\.\n\nМаалымат алынууда\\.\\.\\.`,
    found: "✅ *Табылды\\!*",
    chooseFormat: "Форматты тандаңыз:",
    infoError: "❌ *Ката\\.* Шилтеме туура эмес же колдоого алынбайт\\.",
    authError: "🔒 *Мазмун жабык\\.* Instagram, TikTok жана Facebook кирүүнү талап кылат\\. YouTube шилтемесин же издөөнү колдонуңуз\\.",
    unavailableError: "⛔ *Мазмун жеткиликсиз\\.* Шилтеме өчүрүлгөн же автордук укук менен корголгон\\.",
    audioLoading: "⏳ *MP3 даярдалууда\\.\\.\\.* Күтүңүз\\.",
    videoLoading: "⏳ *MP4 даярдалууда\\.\\.\\.* Күтүңүз\\.",
    mp3Ready: "⏳ Аудио жүктөлүүдө\\.\\.\\.",
    mp4Ready: "⏳ Видео жүктөлүүдө\\.\\.\\.",
    tooLarge: (mb) => `❌ Файл өтө чоң \\(${mb}МБ\\)\\. Telegram 50МБ\\-ка чейин колдойт\\.`,
    downloadError: "❌ Жүктөөдө ката\\. Кайра аракет кылыңыз\\.",
    linkExpired: "❌ Шилтеме эскирди. Кайра жибериңиз.",
    helpText: `ℹ️ *Жардам*\n\nШилтеме жибериңиз — бот өзү таанийт\\!\n\n*Колдоого алынган сайттар:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*Издөө:* /search Атай Огонбаев\nЖана жөн эле ырдын атын жазыңыз\\.\nТил: /lang`,
    noQuery: "❌ Мисал: /search Атай Огонбаев",
    selectLang: "🌐 Тилди тандаңыз:",
    langSet: "✅ Тил коюлду: Кыргызча 🇰🇬",
    audioBtn: "🎵 MP3 Аудио",
    videoBtn: "🎬 MP4 Видео",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 Статистика",
    statsText: (g, u) =>
      `📊 *Бот Статистикасы*\n\n` +
      `👥 Жалпы колдонуучулар: *${g.users}*\n` +
      `🔍 Жалпы издөөлөр: *${g.searches}*\n` +
      `🎵 MP3 жүктөөлөр: *${g.audio}*\n` +
      `🎬 MP4 жүктөөлөр: *${g.video}*\n` +
      `📦 Жалпы жүктөөлөр: *${g.audio + g.video}*\n` +
      `⏱ Иштөө убактысы: *${g.uptime}*\n` +
      (u ? `\n👤 *Сиз:*\n🔍 Издөөлөр: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
  kk: {
    flag: "🇰🇿", name: "Қазақша",
    welcome: `🎵 *Музыка Бот*\n\nКез келген платформадан музыка мен видео жүктеңіз\\!\n\n*Мен не істей аламын:*\n🔍 Ат немесе орындаушы бойынша іздеу\n📥 Сілтеме арқылы жүктеу\n🎵 MP3 аудио\n🎬 MP4 видео\n\n*Платформалар:* YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\nСілтеме жіберіңіз немесе түймелерді пайдаланыңыз 👇`,
    welcomeShort: "Сілтеме жіберіңіз немесе іздеңіз 👇",
    searchBtn: "🔍 Музыка іздеу",
    downloadBtn: "📥 Сілтеме арқылы жүктеу",
    helpBtn: "ℹ️ Көмек",
    backBtn: "🔙 Бас мәзір",
    searchPrompt: "🔍 *Іздеу*\n\nӘннің атын немесе орындаушыны жазыңыз:",
    downloadPrompt: "📥 *Сілтеме арқылы жүктеу*\n\nYouTube, TikTok, Instagram немесе SoundCloud сілтемесін жіберіңіз:",
    searching: (q) => `🔍 *"${q}"* ізделуде\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — ${n} нәтиже:`,
    notFound: "❌ Ештеңе табылмады\\. Басқа сөзбен көріңіз\\.",
    searchError: "❌ Іздеу қатесі\\. Қайта көріңіз\\.",
    detectingLink: (p) => `🔍 *${p}* сілтемесі анықталды\\.\n\nАқпарат алынуда\\.\\.\\.`,
    found: "✅ *Табылды\\!*",
    chooseFormat: "Форматты таңдаңыз:",
    infoError: "❌ *Қате\\.* Сілтеме дұрыс емес немесе қолдау көрсетілмейді\\.",
    authError: "🔒 *Мазмұн жабық\\.* Instagram, TikTok және Facebook жиі кіруді талап етеді\\. YouTube сілтемесін немесе іздеуді пайдаланыңыз\\.",
    unavailableError: "⛔ *Мазмұн қолжетімсіз\\.* Сілтеме жойылған немесе авторлық құқықпен қорғалған\\.",
    audioLoading: "⏳ *MP3 дайындалуда\\.\\.\\.* Күтіңіз\\.",
    videoLoading: "⏳ *MP4 дайындалуда\\.\\.\\.* Күтіңіз\\.",
    mp3Ready: "⏳ Аудио жүктелуде\\.\\.\\.",
    mp4Ready: "⏳ Видео жүктелуде\\.\\.\\.",
    tooLarge: (mb) => `❌ Файл тым үлкен \\(${mb}МБ\\)\\. Telegram 50МБ\\-ға дейін қолдайды\\.`,
    downloadError: "❌ Жүктеу қатесі\\. Қайта көріңіз\\.",
    linkExpired: "❌ Сілтеме ескірген. Қайта жіберіңіз.",
    helpText: `ℹ️ *Көмек*\n\nСілтеме жіберіңіз — бот өзі таниды\\!\n\n*Қолдау көрсетілетін сайттар:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*Іздеу:* /search Dimash Kudaibergen\nЖай ғана әннің атын жазыңыз\\.\nТіл: /lang`,
    noQuery: "❌ Мысал: /search Dimash Kudaibergen",
    selectLang: "🌐 Тілді таңдаңыз:",
    langSet: "✅ Тіл орнатылды: Қазақша 🇰🇿",
    audioBtn: "🎵 MP3 Аудио",
    videoBtn: "🎬 MP4 Видео",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 Статистика",
    statsText: (g, u) =>
      `📊 *Бот Статистикасы*\n\n` +
      `👥 Барлық пайдаланушылар: *${g.users}*\n` +
      `🔍 Барлық іздеулер: *${g.searches}*\n` +
      `🎵 MP3 жүктеулер: *${g.audio}*\n` +
      `🎬 MP4 жүктеулер: *${g.video}*\n` +
      `📦 Барлық жүктеулер: *${g.audio + g.video}*\n` +
      `⏱ Жұмыс уақыты: *${g.uptime}*\n` +
      (u ? `\n👤 *Сіз:*\n🔍 Іздеулер: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
  tk: {
    flag: "🇹🇲", name: "Türkmençe",
    welcome: `🎵 *Aýdym-saz Boty*\n\nHer platformadan aýdym-saz we wideo ýükläň\\!\n\n*Näme edip bilerin:*\n🔍 At ýa-da aýdymçy boýunça gözleg\n📥 Salgy arkaly ýüklemek\n🎵 MP3 ses\n🎬 MP4 wideo\n\n*Platformalar:* YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\nSalgy iberiň ýa-da düwmeleri ulanyň 👇`,
    welcomeShort: "Salgy iberiň ýa-da gözläň 👇",
    searchBtn: "🔍 Aýdym-saz gözlemek",
    downloadBtn: "📥 Salgy arkaly ýüklemek",
    helpBtn: "ℹ️ Kömek",
    backBtn: "🔙 Baş menýu",
    searchPrompt: "🔍 *Gözleg*\n\nAýdymyň adyny ýa-da aýdymçynyň adyny ýazyň:",
    downloadPrompt: "📥 *Salgy arkaly ýüklemek*\n\nYouTube, TikTok, Instagram ýa-da SoundCloud salgysy iberiň:",
    searching: (q) => `🔍 *"${q}"* gözlenýär\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — ${n} netije:`,
    notFound: "❌ Hiç zat tapylmady\\. Başga söz bilen synap görüň\\.",
    searchError: "❌ Gözleg ýalňyşlygy\\. Täzeden synap görüň\\.",
    detectingLink: (p) => `🔍 *${p}* salgysy tapyldy\\.\n\nMaglumaty alýaryn\\.\\.\\.`,
    found: "✅ *Tapyldy\\!*",
    chooseFormat: "Formaty saýlaň:",
    infoError: "❌ *Ýalňyşlyk\\.* Salgy nädogry ýa-da goldanmaýar\\.",
    authError: "🔒 *Mazmun ýapyk\\.* Instagram, TikTok we Facebook köplenç girmegi talap edýär\\. YouTube salgysy ýa-da gözleg ulanyň\\.",
    unavailableError: "⛔ *Mazmun elýeterli däl\\.* Salgy pozulan ýa-da awtorlyk hukugy bilen goralýar\\.",
    audioLoading: "⏳ *MP3 taýýarlanýar\\.\\.\\.* Garaşyň\\.",
    videoLoading: "⏳ *MP4 taýýarlanýar\\.\\.\\.* Garaşyň\\.",
    mp3Ready: "⏳ Ses ýüklenýär\\.\\.\\.",
    mp4Ready: "⏳ Wideo ýüklenýär\\.\\.\\.",
    tooLarge: (mb) => `❌ Faýl gaty uly \\(${mb}MB\\)\\. Telegram 50MB\\-a çenli goldaýar\\.`,
    downloadError: "❌ Ýüklemek ýalňyşlygy\\. Täzeden synap görüň\\.",
    linkExpired: "❌ Salgy köneläpdir. Täzeden iberiň.",
    helpText: `ℹ️ *Kömek*\n\nSalgy iberiň — bot özi tanar\\!\n\n*Goldanýan saýtlar:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*Gözleg:* /search Magtymguly\nÝa-da aýdymyň adyny ýazyň\\.\nDil: /lang`,
    noQuery: "❌ Mysal: /search Magtymguly",
    selectLang: "🌐 Dili saýlaň:",
    langSet: "✅ Dil goýuldy: Türkmençe 🇹🇲",
    audioBtn: "🎵 MP3 Ses",
    videoBtn: "🎬 MP4 Wideo",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 Statistika",
    statsText: (g, u) =>
      `📊 *Bot Statistikasy*\n\n` +
      `👥 Jemi ulanyjylar: *${g.users}*\n` +
      `🔍 Jemi gözlegler: *${g.searches}*\n` +
      `🎵 MP3 ýüklemeler: *${g.audio}*\n` +
      `🎬 MP4 ýüklemeler: *${g.video}*\n` +
      `📦 Jemi ýüklemeler: *${g.audio + g.video}*\n` +
      `⏱ Iş wagty: *${g.uptime}*\n` +
      (u ? `\n👤 *Siz:*\n🔍 Gözlegler: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
  tr: {
    flag: "🇹🇷", name: "Türkçe",
    welcome: `🎵 *Müzik Botu*\n\nTüm platformlardan müzik ve video indir\\!\n\n*Neler yapabilirim:*\n🔍 İsim veya sanatçıya göre arama\n📥 Bağlantı ile indirme\n🎵 MP3 ses\n🎬 MP4 video\n\n*Platformlar:* YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK ve daha fazlası\\.\n\nBir bağlantı gönderin veya düğmeleri kullanın 👇`,
    welcomeShort: "Bağlantı gönderin veya arama yapın 👇",
    searchBtn: "🔍 Müzik Ara",
    downloadBtn: "📥 Bağlantıdan İndir",
    helpBtn: "ℹ️ Yardım",
    backBtn: "🔙 Ana Menü",
    searchPrompt: "🔍 *Arama*\n\nŞarkı adı veya sanatçı adı yazın:",
    downloadPrompt: "📥 *Bağlantıdan İndir*\n\nYouTube, TikTok, Instagram veya SoundCloud bağlantısı gönderin:",
    searching: (q) => `🔍 *"${q}"* aranıyor\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — ${n} sonuç:`,
    notFound: "❌ Hiçbir şey bulunamadı\\. Başka bir kelime deneyin\\.",
    searchError: "❌ Arama hatası\\. Tekrar deneyin\\.",
    detectingLink: (p) => `🔍 *${p}* bağlantısı algılandı\\.\n\nBilgi alınıyor\\.\\.\\.`,
    found: "✅ *Bulundu\\!*",
    chooseFormat: "Format seçin:",
    infoError: "❌ *Hata\\.* Bağlantı geçersiz veya desteklenmiyor\\.",
    authError: "🔒 *İçerik gizli\\.* Instagram, TikTok ve Facebook genellikle giriş gerektirir\\. YouTube bağlantısı veya arama kullanın\\.",
    unavailableError: "⛔ *İçerik kullanılamıyor\\.* Bağlantı silindi veya telif hakkıyla korunuyor\\.",
    audioLoading: "⏳ *MP3 hazırlanıyor\\.\\.\\.* Lütfen bekleyin\\.",
    videoLoading: "⏳ *MP4 hazırlanıyor\\.\\.\\.* Lütfen bekleyin\\.",
    mp3Ready: "⏳ Ses yükleniyor\\.\\.\\.",
    mp4Ready: "⏳ Video yükleniyor\\.\\.\\.",
    tooLarge: (mb) => `❌ Dosya çok büyük \\(${mb}MB\\)\\. Telegram 50MB\\'a kadar destekler\\.`,
    downloadError: "❌ İndirme hatası\\. Tekrar deneyin\\.",
    linkExpired: "❌ Bağlantı süresi doldu. Tekrar gönderin.",
    helpText: `ℹ️ *Yardım*\n\nBağlantı gönderin — bot kendisi tanır\\!\n\n*Desteklenen siteler:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*Arama:* /search Tarkan\nYa da şarkı adını yazın\\.\nDil: /lang`,
    noQuery: "❌ Örnek: /search Tarkan",
    selectLang: "🌐 Dil seçin:",
    langSet: "✅ Dil ayarlandı: Türkçe 🇹🇷",
    audioBtn: "🎵 MP3 Ses",
    videoBtn: "🎬 MP4 Video",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 İstatistik",
    statsText: (g, u) =>
      `📊 *Bot İstatistiği*\n\n` +
      `👥 Toplam kullanıcı: *${g.users}*\n` +
      `🔍 Toplam arama: *${g.searches}*\n` +
      `🎵 MP3 indirme: *${g.audio}*\n` +
      `🎬 MP4 indirme: *${g.video}*\n` +
      `📦 Toplam indirme: *${g.audio + g.video}*\n` +
      `⏱ Çalışma süresi: *${g.uptime}*\n` +
      (u ? `\n👤 *Siz:*\n🔍 Aramalar: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
  az: {
    flag: "🇦🇿", name: "Azərbaycanca",
    welcome: `🎵 *Musiqi Botu*\n\nBütün platformalardan musiqi və video yükləyin\\!\n\n*Nə edə bilərəm:*\n🔍 Ad və ya ifaçıya görə axtarış\n📥 Keçid ilə yükləmə\n🎵 MP3 audio\n🎬 MP4 video\n\n*Platformalar:* YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\nKeçid göndərin və ya düymələrdən istifadə edin 👇`,
    welcomeShort: "Keçid göndərin və ya axtarın 👇",
    searchBtn: "🔍 Musiqi axtar",
    downloadBtn: "📥 Keçidlə yüklə",
    helpBtn: "ℹ️ Kömək",
    backBtn: "🔙 Əsas menyu",
    searchPrompt: "🔍 *Axtarış*\n\nMahnı adını və ya ifaçı adını yazın:",
    downloadPrompt: "📥 *Keçidlə yükləmə*\n\nYouTube, TikTok, Instagram və ya SoundCloud keçidi göndərin:",
    searching: (q) => `🔍 *"${q}"* axtarılır\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — ${n} nəticə:`,
    notFound: "❌ Heç nə tapılmadı\\. Başqa söz ilə cəhd edin\\.",
    searchError: "❌ Axtarış xətası\\. Yenidən cəhd edin\\.",
    detectingLink: (p) => `🔍 *${p}* keçidi aşkarlandı\\.\n\nMəlumat alınır\\.\\.\\.`,
    found: "✅ *Tapıldı\\!*",
    chooseFormat: "Format seçin:",
    infoError: "❌ *Xəta\\.* Keçid düzgün deyil və ya dəstəklənmir\\.",
    authError: "🔒 *Məzmun qapalıdır\\.* Instagram, TikTok və Facebook çox vaxt giriş tələb edir\\. YouTube linkindən və ya axtarışdan istifadə edin\\.",
    unavailableError: "⛔ *Məzmun əlçatmazdır\\.* Link silinib və ya müəllif hüquqları ilə qorunur\\.",
    audioLoading: "⏳ *MP3 hazırlanır\\.\\.\\.* Zəhmət olmasa gözləyin\\.",
    videoLoading: "⏳ *MP4 hazırlanır\\.\\.\\.* Zəhmət olmasa gözləyin\\.",
    mp3Ready: "⏳ Audio yüklənir\\.\\.\\.",
    mp4Ready: "⏳ Video yüklənir\\.\\.\\.",
    tooLarge: (mb) => `❌ Fayl çox böyükdür \\(${mb}MB\\)\\. Telegram 50MB\\-a qədər dəstəkləyir\\.`,
    downloadError: "❌ Yükləmə xətası\\. Yenidən cəhd edin\\.",
    linkExpired: "❌ Keçid köhnəldi. Yenidən göndərin.",
    helpText: `ℹ️ *Kömək*\n\nKeçid göndərin — bot özü tanıyar\\!\n\n*Dəstəklənən saytlar:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*Axtarış:* /search Xəzər İbrahimli\nVə ya sadəcə mahnı adını yazın\\.\nDil: /lang`,
    noQuery: "❌ Nümunə: /search Xəzər İbrahimli",
    selectLang: "🌐 Dil seçin:",
    langSet: "✅ Dil təyin edildi: Azərbaycanca 🇦🇿",
    audioBtn: "🎵 MP3 Audio",
    videoBtn: "🎬 MP4 Video",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 Statistika",
    statsText: (g, u) =>
      `📊 *Bot Statistikası*\n\n` +
      `👥 Cəmi istifadəçilər: *${g.users}*\n` +
      `🔍 Cəmi axtarışlar: *${g.searches}*\n` +
      `🎵 MP3 yükləmələr: *${g.audio}*\n` +
      `🎬 MP4 yükləmələr: *${g.video}*\n` +
      `📦 Cəmi yükləmələr: *${g.audio + g.video}*\n` +
      `⏱ İş vaxtı: *${g.uptime}*\n` +
      (u ? `\n👤 *Siz:*\n🔍 Axtarışlar: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
  ar: {
    flag: "🇸🇦", name: "العربية",
    welcome: `🎵 *بوت الموسيقى*\n\nحمّل الموسيقى والفيديو من أي منصة\\!\n\n*ما أستطيع فعله:*\n🔍 البحث بالاسم أو الفنان\n📥 التحميل عبر الرابط\n🎵 صوت MP3\n🎬 فيديو MP4\n\n*المنصات:* YouTube، TikTok، Instagram، SoundCloud، Twitter/X، Facebook، VK والمزيد\\.\n\nأرسل رابطاً أو استخدم الأزرار أدناه 👇`,
    welcomeShort: "أرسل رابطاً أو ابحث عن موسيقى 👇",
    searchBtn: "🔍 البحث عن موسيقى",
    downloadBtn: "📥 التحميل عبر الرابط",
    helpBtn: "ℹ️ المساعدة",
    backBtn: "🔙 القائمة الرئيسية",
    searchPrompt: "🔍 *البحث*\n\nأدخل اسم الأغنية أو الفنان:",
    downloadPrompt: "📥 *التحميل عبر الرابط*\n\nأرسل رابطاً من YouTube أو TikTok أو Instagram أو SoundCloud:",
    searching: (q) => `🔍 جارٍ البحث عن *"${q}"*\\.\\.\\.`,
    results: (q, n) => `🎵 *"${q}"* — ${n} نتائج:`,
    notFound: "❌ لم يُعثر على شيء\\. جرّب كلمة أخرى\\.",
    searchError: "❌ خطأ في البحث\\. حاول مرة أخرى\\.",
    detectingLink: (p) => `🔍 تم اكتشاف رابط *${p}*\\.\n\nجارٍ الحصول على المعلومات\\.\\.\\.`,
    found: "✅ *تم العثور عليه\\!*",
    chooseFormat: "اختر التنسيق:",
    infoError: "❌ *خطأ\\.* الرابط غير صحيح أو غير مدعوم\\.",
    authError: "🔒 *المحتوى مغلق\\.* Instagram وTikTok وFacebook غالبًا يتطلبون تسجيل دخول\\. استخدم رابط YouTube أو البحث\\.",
    unavailableError: "⛔ *المحتوى غير متاح\\.* تم حذف الرابط أو هو محمي بحقوق النشر\\.",
    audioLoading: "⏳ *جارٍ تحضير MP3\\.\\.\\.* يُرجى الانتظار\\.",
    videoLoading: "⏳ *جارٍ تحضير MP4\\.\\.\\.* يُرجى الانتظار\\.",
    mp3Ready: "⏳ جارٍ تحميل الصوت\\.\\.\\.",
    mp4Ready: "⏳ جارٍ تحميل الفيديو\\.\\.\\.",
    tooLarge: (mb) => `❌ الملف كبير جداً \\(${mb}MB\\)\\. يدعم Telegram حتى 50MB\\.`,
    downloadError: "❌ خطأ في التحميل\\. حاول مرة أخرى\\.",
    linkExpired: "❌ انتهت صلاحية الرابط. أرسله مجدداً.",
    helpText: `ℹ️ *المساعدة*\n\nأرسل رابطاً — سيتعرف عليه البوت تلقائياً\\!\n\n*المواقع المدعومة:*\nYouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK\n\n*البحث:* /search فيروز\nأو اكتب اسم الأغنية فقط\\.\nاللغة: /lang`,
    noQuery: "❌ مثال: /search فيروز",
    selectLang: "🌐 اختر اللغة:",
    langSet: "✅ تم تعيين اللغة: العربية 🇸🇦",
    audioBtn: "🎵 صوت MP3",
    videoBtn: "🎬 فيديو MP4",
    youtubeBtn: "▶️ YouTube",
    platformsLine: "YouTube, TikTok, Instagram, SoundCloud, Twitter/X, Facebook, VK",
    statsBtn: "📊 الإحصائيات",
    statsText: (g, u) =>
      `📊 *إحصائيات البوت*\n\n` +
      `👥 إجمالي المستخدمين: *${g.users}*\n` +
      `🔍 إجمالي عمليات البحث: *${g.searches}*\n` +
      `🎵 تنزيلات MP3: *${g.audio}*\n` +
      `🎬 تنزيلات MP4: *${g.video}*\n` +
      `📦 إجمالي التنزيلات: *${g.audio + g.video}*\n` +
      `⏱ مدة التشغيل: *${g.uptime}*\n` +
      (u ? `\n👤 *أنت:*\n🔍 عمليات البحث: *${u.searches}*\n🎵 MP3: *${u.audio}*\n🎬 MP4: *${u.video}*` : ""),
  },
};

export const LANGS = T;
export const LANG_CODES = Object.keys(T) as LangCode[];

export function t(lang: LangCode): LangStrings {
  return T[lang] ?? T["uz"]!;
}
