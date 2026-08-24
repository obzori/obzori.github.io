const preloader = document.getElementById('preloader');
document.body.classList.add('loading');

const minDelay = new Promise((resolve) => setTimeout(resolve, 1000));
const pageLoaded = document.readyState === 'complete'
  ? Promise.resolve()
  : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));

Promise.all([minDelay, pageLoaded]).then(() => {
  preloader.classList.add('done');
  document.body.classList.remove('loading');
});

const i18n = {
  en: {
    'hero.kicker': 'Full-Stack Developer',
    'hero.lead': 'I build full-stack applications, developer tools, and experimental projects — practical systems, clean APIs, and tools that solve real problems.',
    'hero.projects': 'Projects →',
    'hero.contact': 'Contact →',
    'nav.about': 'about',
    'about.p1': "I'm a full-stack developer who enjoys building things end-to-end: from database schema and API design to the last pixel of the UI. I care about clean architecture, developer experience, and tools that actually get used.",
    'about.p2': "Outside of web development I build Minecraft mods with Fabric & NeoForge and experiment with game design — it keeps the engineering side playful.",
    'about.f1t': 'focus',
    'about.f1d': 'Full-stack web apps, CLI tools, AST-based analysis',
    'about.f2t': 'currently',
    'about.f2d': 'Building envgraph — an env variable usage analyzer',
    'about.f3t': 'open to',
    'about.f3d': 'Collaboration, interesting ideas and side projects',
    'nav.fandoms': 'fandoms',
    'fandoms.intro': "Things I'm genuinely obsessed with.",
    'nav.now': 'now',
    'now.text': 'a CLI tool for analyzing environment variables and their usage across JavaScript/TypeScript projects.',
    'nav.projects': 'projects',
    'projects.envgraph': 'Environment variable usage analyzer for JavaScript/TypeScript.',
    'projects.routefolio': 'Express route analyzer and OpenAPI documentation generator.',
    'projects.private': 'private',
    'projects.mzdbf': 'A framework for building structured Discord bots.',
    'projects.ask': 'A cooperative extraction horror game — stealth, tension, paranoia.',
    'nav.stack': 'stack',
    'stack.backend': 'backend',
    'stack.frontend': 'frontend',
    'stack.mobile': 'mobile',
    'stack.database': 'database',
    'stack.other': 'other',
    'stack.fun': 'fun',
    'stack.fun_desc': 'Minecraft dev — Fabric & NeoForge',
    'nav.contact': 'contact',
    'contact.lead': 'Open to communication, ideas, and collaboration.',
    'footer.text': '© 2026 obzori · built by hand, no frameworks harmed'
  },
  ru: {
    'hero.kicker': 'Фуллстек-разработчик',
    'hero.lead': 'Делаю фуллстек-приложения, инструменты для разработчиков и экспериментальные проекты — практичные системы, чистые API и утилиты, решающие реальные задачи.',
    'hero.projects': 'Проекты →',
    'hero.contact': 'Контакты →',
    'nav.about': 'обо мне',
    'about.p1': 'Я фуллстек-разработчик, которому нравится делать вещи от начала до конца: от схемы базы данных и дизайна API до последнего пикселя интерфейса. Ценю чистую архитектуру, удобство для разработчиков и инструменты, которыми реально пользуются.',
    'about.p2': 'Помимо веба пишу моды для Minecraft на Fabric и NeoForge и экспериментирую с геймдизайном — это держит инженерную часть в тонусе.',
    'about.f1t': 'фокус',
    'about.f1d': 'Фуллстек веб-приложения, CLI-утилиты, AST-анализ',
    'about.f2t': 'сейчас',
    'about.f2d': 'Разрабатываю envgraph — анализатор переменных окружения',
    'about.f3t': 'открыт к',
    'about.f3d': 'Коллаборациям, интересным идеям и сайд-проектам',
    'nav.fandoms': 'фандомы',
    'fandoms.intro': 'Вещи, которыми я искренне увлечён.',
    'nav.now': 'сейчас',
    'now.text': 'CLI-утилита для анализа переменных окружения и их использования в JavaScript/TypeScript проектах.',
    'nav.projects': 'проекты',
    'projects.envgraph': 'Анализатор использования переменных окружения для JavaScript/TypeScript.',
    'projects.routefolio': 'Анализатор маршрутов Express и генератор OpenAPI-документации.',
    'projects.private': 'приватный',
    'projects.mzdbf': 'Фреймворк для создания структурированных Discord-ботов.',
    'projects.ask': 'Кооперативный хоррор про extraction — стелс, напряжение и паранойя.',
    'nav.stack': 'стек',
    'stack.backend': 'бэкенд',
    'stack.frontend': 'фронтенд',
    'stack.mobile': 'мобильное',
    'stack.database': 'базы данных',
    'stack.other': 'прочее',
    'stack.fun': 'для души',
    'stack.fun_desc': 'Разработка Minecraft — Fabric и NeoForge',
    'nav.contact': 'контакты',
    'contact.lead': 'Открыт к общению, идеям и коллаборациям.',
    'footer.text': '© 2026 obzori · сделано руками, без пострадавших фреймворков'
  }
};

const langToggle = document.getElementById('langToggle');

function applyLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (i18n[lang][key] !== undefined) el.textContent = i18n[lang][key];
  });
  langToggle.textContent = lang === 'ru' ? 'en' : 'ru';
}

let lang = localStorage.getItem('lang') || 'en';
applyLang(lang);

if (window.MY_STATUS) {
  const ms = window.MY_STATUS;
  if (ms.activity) i18n.en['now.text'] = i18n.ru['now.text'] = ms.activity;
  const badge = document.getElementById('myStatus');
  if (badge && ms.status) badge.textContent = ms.status;
}

langToggle.addEventListener('click', () => {
  lang = lang === 'ru' ? 'en' : 'ru';
  localStorage.setItem('lang', lang);
  applyLang(lang);
});

const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const stored = localStorage.getItem('theme');

if (stored === 'light' || (stored === null && window.matchMedia('(prefers-color-scheme: light)').matches)) {
  root.dataset.theme = 'light';
}

toggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  if (next === 'dark') delete root.dataset.theme;
  else root.dataset.theme = 'light';
  localStorage.setItem('theme', next);
});

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

if (window.lucide) lucide.createIcons();

const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
});

navLinks.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

(async () => {
  const el = document.getElementById('envgraphVersion');
  if (!el) return;
  try {
    const res = await fetch('https://registry.npmjs.org/envgraph/latest');
    if (!res.ok) throw new Error(res.status);
    const data = await res.json();
    el.textContent = data.version;
  } catch {
    el.textContent = '?';
  }
})();

const CRAFT_WORD = 'craft';
let craftBuffer = '';

function toggleCraft() {
  document.body.classList.toggle('mc');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('mc')) {
    document.body.classList.remove('mc');
    return;
  }
  if (e.key.length !== 1) return;
  craftBuffer = (craftBuffer + e.key.toLowerCase()).slice(-CRAFT_WORD.length);
  if (craftBuffer === CRAFT_WORD) {
    craftBuffer = '';
    toggleCraft();
  }
});




