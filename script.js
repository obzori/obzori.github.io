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
    'hero.kicker': 'full-stack dev',
    'hero.lead': 'i build full-stack stuff, dev tools, and questionable side projects — clean apis, useful systems, and things that actually solve problems.',
    'hero.projects': 'projects →',
    'hero.contact': 'contact →',

    'nav.about': 'about',
    'about.p1': "hey. no idea how you ended up here, but hi. i'm a full-stack dev who likes building stuff — websites, backends, cli tools, random experiments, whatever. i like clean code, good structure, and things that just work™.",
    'about.p2': 'when i’m not doing web stuff, i’m probably messing with minecraft mods using fabric & neoforge.',

    'about.f1t': 'main thing',
    'about.f1d': 'full-stack apps, cli tools & ast wizardry',
    'about.f2t': 'rn',
    'about.f2d': 'building envgraph — currently cooking',
    'about.f3t': 'open to',
    'about.f3d': 'cool collabs, weird ideas & side quests',

    'nav.now': 'rn',
    'now.text': 'a cli tool that hunts down env variable usage across js/ts projects.',

    'nav.projects': 'projects',
    'projects.envgraph': 'finds where your env variables are actually being used. no guessing required.',
    'projects.routefolio': 'turns express routes into openapi docs. automatically. pretty neat ngl.',
    'projects.private': 'private',
    'projects.mzdbf': 'a framework for making structured discord bots without the usual suffering.',
    'projects.ask': 'a co-op extraction horror game — sneaking around, collecting stuff & questioning every life decision.',

    'nav.fandoms': 'fandoms',
    'fandoms.intro': 'things i’m unreasonably invested in.',

    'nav.stack': 'stack',
    'stack.backend': 'backend',
    'stack.frontend': 'frontend',
    'stack.mobile': 'mobile',
    'stack.database': 'database',
    'stack.other': 'other',
    'stack.fun': 'side quests',
    'stack.fun_desc': 'minecraft modding — fabric & neoforge',

    'nav.contact': 'contact',
    'contact.lead': 'got an idea? wanna collab? just wanna yap about tech? hit me up.',

    'footer.text': '© 2026 obzori · built by hand · 0 frameworks were harmed'
  },

  ru: {
    'hero.kicker': 'фуллстек-разраб',
    'hero.lead': 'делаю фуллстек-штуки, инструменты для разрабов и сомнительные сайд-проекты — чистые апи, полезные системы и вещи, которые реально что-то решают.',
    'hero.projects': 'проекты →',
    'hero.contact': 'контакты →',

    'nav.about': 'инфа',
    'about.p1': 'хей. хз, как ты сюда попал, но привет. я фуллстек-разраб, люблю что-нибудь собирать — сайты, бэкенды, cli-шки, рандомные эксперименты, короче всё подряд. люблю чистый код, нормальную структуру и штуки, которые просто работают™.',
    'about.p2': 'когда не занимаюсь вебом, скорее всего ковыряю моды для minecraft на fabric и neoforge.',

    'about.f1t': 'основное',
    'about.f1d': 'фуллстек, cli-шки и ast-магия',
    'about.f2t': 'щас',
    'about.f2d': 'пилю envgraph — кухня кипит',
    'about.f3t': 'открыт к',
    'about.f3d': 'крутым коллабам, странным идеям и сайд-квестам',

    'nav.now': 'щас',
    'now.text': 'cli-шка, которая выслеживает использование env-переменных в js/ts-проектах.',

    'nav.projects': 'проекты',
    'projects.envgraph': 'показывает, где на самом деле используются твои env-переменные. без гаданий.',
    'projects.routefolio': 'превращает express-роуты в openapi-доки. автоматически. довольно прикольно, ngl.',
    'projects.private': 'приватный',
    'projects.mzdbf': 'фреймворк для создания структурированных discord-ботов без привычных страданий.',
    'projects.ask': 'коопный extraction-хоррор — крадёмся, собираем всякое и задаёмся вопросом «зачем мы сюда пришли».',

    'nav.fandoms': 'фандомы',
    'fandoms.intro': 'штуки, в которые я подозрительно сильно залип.',

    'nav.stack': 'стек',
    'stack.backend': 'бэкенд',
    'stack.frontend': 'фронтенд',
    'stack.mobile': 'мобильное',
    'stack.database': 'базы данных',
    'stack.other': 'прочее',
    'stack.fun': 'сайд-квесты',
    'stack.fun_desc': 'майнкрафт-моддинг — fabric и neoforge',

    'nav.contact': 'контакты',
    'contact.lead': 'есть идея? хочешь коллаб? просто хочешь поболтать о техе? пиши.',

    'footer.text': '© 2026 obzori · сделано руками · 0 фреймворков пострадало'
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




