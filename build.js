#!/usr/bin/env node
/*
 * Mindathon Academy — static site build
 * Assembles pages from partials into dist/.
 * Run: node build.js
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const PARTIALS = path.join(SRC, 'partials');
const PAGES = path.join(SRC, 'pages');
const DIST = path.join(__dirname, 'dist');

// Change this when the site goes live at its real domain.
const SITE_URL = 'https://mindathonacademy.github.io/';

const DEFAULT_DESC =
  'Mindathon Academy makes cognitive skills training engaging with Mindathon, a hands-on cognitive skills enhancement training game for families, students and schools.';

const PAGES_CONF = [
  {
    file: 'index.html',
    title: 'Mindathon Academy | Cognitive Skills Enhancement Training',
    desc: DEFAULT_DESC,
    active: 'home',
  },
  {
    file: 'about.html',
    title: 'About Us | Mindathon Academy',
    desc: 'Learn who created Mindathon — and why — from the memory trainer behind the game.',
    active: 'about',
  },
  {
    file: 'game.html',
    title: 'The Game | Mindathon Academy',
    desc: 'Meet Mindathon, a physical cognitive training game. See how you play, what it trains and why it is different.',
    active: 'game',
  },
  {
    file: 'programmes.html',
    title: 'Programmes | Mindathon Academy',
    desc: 'Use Mindathon at home with your family, in school, or as a structured programme or workshop.',
    active: 'programmes',
  },
  {
    file: 'gallery.html',
    title: 'Gallery | Mindathon Academy',
    desc: 'A look at the Mindathon game.',
    active: 'gallery',
  },
  {
    file: 'get-mindathon.html',
    title: 'Get Mindathon | Mindathon Academy',
    desc: 'Interested in Mindathon? Enquire on WhatsApp or contact the team for schools and organisations.',
    active: 'get',
  },
];

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function partial(name) {
  return read(path.join(PARTIALS, `${name}.html`));
}

function buildHead(page) {
  const head = partial('head');
  const url = SITE_URL + page.file;
  const ogImage = SITE_URL + 'assets/images/mindathon-box-1.jpg';
  return head
    .replaceAll('{{TITLE}}', page.title)
    .replaceAll('{{DESCRIPTION}}', page.desc)
    .replaceAll('{{OG_TITLE}}', page.title)
    .replaceAll('{{OG_DESCRIPTION}}', page.desc)
    .replaceAll('{{OG_URL}}', url)
    .replaceAll('{{OG_IMAGE}}', ogImage);
}

function buildNavbar(active) {
  const nav = partial('navbar');
  return nav.replaceAll('{{ACTIVE}}', active);
}

function assemble(page) {
  let html = read(path.join(PAGES, page.file));
  html = html.replaceAll('{{HEAD}}', () => buildHead(page));
  html = html.replaceAll('{{NAVBAR}}', () => buildNavbar(page.active));
  html = html.replaceAll('{{FOOTER}}', partial('footer'));
  html = html.replaceAll('{{SCRIPTS}}', partial('scripts'));
  return html;
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else if (/\.(mp4|mov|webm)$/i.test(entry.name)) {
      console.log(`skipped (unused media): ${entry.name}`);
    } else fs.copyFileSync(s, d);
  }
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const page of PAGES_CONF) {
  fs.writeFileSync(path.join(DIST, page.file), assemble(page));
  console.log(`built ${page.file}`);
}

copyDir('assets', path.join(DIST, 'assets'));
copyDir('images', path.join(DIST, 'assets', 'images'));
console.log('copied assets');
console.log(`\nDone. ${PAGES_CONF.length} pages in dist/`);
