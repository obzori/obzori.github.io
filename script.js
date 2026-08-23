// ===== Localization (ru / en) =====
const i18n = {
  en: {
    'hero.kicker': 'Full-Stack Developer',
    'hero.lead': 'I build full-stack applications, developer tools, and experimental projects — practical systems, clean APIs, and tools that solve real problems.',
    'hero.projects': 'Projects →',
    'hero.contact': 'Contact →',
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




