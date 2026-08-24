// ===== Preloader (min 1 second) =====
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

// ===== Localization (ru / en) =====
const i18n = {
  en: {
    'hero.kicker': 'Full-Stack Developer',
    'hero.lead': 'I build full-stack apps, dev tools, and random experiments — clean APIs, practical systems, and things that actually solve problems.',
    'hero.projects': 'projects →',
    'hero.contact': 'contact →',

    'nav.about': 'about',
    'about.p1': "hey! no idea who's reading this, but here's the short version. i'm a full-stack dev who likes building stuff — from interfaces and backends to weird little tools. i care about clean structure and things that just make sense.",
    'about.p2': 'outside of web dev, i mess around with Minecraft mods using Fabric & NeoForge.',

    'about.f1t': 'focus',
    'about.f1d': 'Full-stack apps, CLI tools, AST magic',
    'about.f2t': 'right now',
    'about.f2d': 'Building envgraph — an env variable usage analyzer',
    'about.f3t': 'open to',
    'about.f3d': 'Collabs, cool ideas & side projects',

    'nav.now': 'now',
    'now.text': 'a CLI tool that finds and analyzes environment variable usage across JS/TS projects.',

    'nav.projects': 'projects',
    'projects.envgraph': 'Environment variable usage analyzer for JavaScript/TypeScript.',
    'projects.routefolio': 'Express route analyzer + OpenAPI docs generator.',
    'projects.private': 'private',
    'projects.mzdbf': 'A framework for building structured Discord bots.',
    'projects.ask': 'A co-op extraction horror game — stealth, tension & paranoia.',

    'nav.stack': 'stack',
    'stack.backend': 'backend',
    'stack.frontend': 'frontend',
    'stack.mobile': 'mobile',
    'stack.database': 'database',
    'stack.other': 'other',
    'stack.fun': 'for fun',
    'stack.fun_desc': 'Minecraft dev — Fabric & NeoForge',

    'nav.contact': 'contact',
    'contact.lead': 'always down for ideas, collabs, or just talking tech.',

    'footer.text': '© 2026 obzori · built by hand, no frameworks were harmed'
  },

  ru: {
    'hero.kicker': 'Фуллстек-разработчик',
    'hero.lead': 'Делаю фуллстек-приложения, инструменты для разрабов и всякие эксперименты — чистые API, нормальные системы и штуки, которые реально решают проблемы.',
    'hero.projects': 'проекты →',
    'hero.contact': 'контакты →',

    'nav.about': 'инфа',
    'about.p1': 'хей! хз, кто это читает, но вот коротко обо мне. я фуллстак-разраб, люблю что-нибудь собирать — от интерфейсов и бэкенда до странных маленьких утилит. ценю нормальную структуру и код, который просто имеет смысл.',
    'about.p2': 'а вне веба иногда ковыряю моды для Minecraft на Fabric и NeoForge.',

    'about.f1t': 'фокус',
    'about.f1d': 'Фуллстек-приложения, CLI-утилиты, AST-магия',
    'about.f2t': 'щас',
    'about.f2d': 'Пилю envgraph — анализатор использования env-переменных',
    'about.f3t': 'открыт к',
    'about.f3d': 'Коллабам, крутым идеям и сайд-проектам',

    'nav.now': 'щас',
    'now.text': 'CLI-утилита, которая ищет и анализирует использование env-переменных в JS/TS-проектах.',

    'nav.projects': 'проекты',
    'projects.envgraph': 'Анализатор использования env-переменных для JavaScript/TypeScript.',
    'projects.routefolio': 'Анализатор Express-маршрутов + генератор OpenAPI-документации.',
    'projects.private': 'приватный',
    'projects.mzdbf': 'Фреймворк для создания структурированных Discord-ботов.',
    'projects.ask': 'Кооперативный extraction-хоррор — стелс, напряжение и паранойя.',

    'nav.stack': 'стек',
    'stack.backend': 'бэкенд',
    'stack.frontend': 'фронтенд',
    'stack.mobile': 'мобильное',
    'stack.database': 'базы данных',
    'stack.other': 'прочее',
    'stack.fun': 'для души',
    'stack.fun_desc': 'Minecraft-разработка — Fabric и NeoForge',

    'nav.contact': 'контакты',
    'contact.lead': 'всегда за идеи, коллабы и просто поговорить о техе.',

    'footer.text': '© 2026 obzori · сделано руками, фреймворки не пострадали'
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

langToggle.addEventListener('click', () => {
  lang = lang === 'ru' ? 'en' : 'ru';
  localStorage.setItem('lang', lang);
  applyLang(lang);
});

// ===== Theme toggle =====
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

// ===== Reveal on scroll =====
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

// ===== Lucide icons =====
if (window.lucide) lucide.createIcons();

// ===== Burger menu =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
});

// close the mobile menu after clicking a link
navLinks.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  })
);

// ===== envgraph version from npm registry =====
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

// ===== Craft Mode (type "craft") =====
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




