# Portfolio — John Carlo Tulin

Personal portfolio site built with plain HTML, CSS, and JavaScript on top of
Bootstrap 5. No build step, no framework — clone it and open `index.html`.

**Live pages:** `index.html` (home), `about.html`, `contact.html`

## Why it's built this way

The navbar, footer, tech stack, project cards, and contact cards all pull
from one file, `assets/js/site-data.js`, instead of being copy-pasted into
every page. Update a social link, add a project, or fix a typo once, and it
shows up everywhere it's used. `assets/js/main.js` reads that data and
renders each section into the page.

## Folder structure

```
Portfolio-main/
├── index.html            Home page (hero, tech stack, featured projects)
├── about.html             About page
├── contact.html           Contact page
├── README.md
└── assets/
    ├── css/
    │   └── style.css      All styling, one file, organized by section
    ├── js/
    │   ├── site-data.js   Content: nav links, socials, tech stack, projects, contact info
    │   └── main.js        Renders the shared navbar/footer and data-driven sections
    ├── fonts/              Self-hosted Circular Std (display font)
    ├── img/                 Favicon + placeholder portrait
    └── resume.pdf
```

## Stack

- HTML5 / CSS3 / vanilla JavaScript
- [Bootstrap 5.3](https://getbootstrap.com/) for the grid and responsive utilities
- [Boxicons](https://boxicons.com/) for icons
- Google Fonts (Inter, JetBrains Mono) + a self-hosted Circular Std for headings

## Things still on the to-do list

- Swap the placeholder portrait on the About page for a real photo
  (`assets/img/profile-placeholder.svg` → your own image)
- Replace the two placeholder project cards in `site-data.js` with real
  projects as they're finished
- Update `assets/resume.pdf` whenever the resume changes — the download and
  "view" links in the navbar point at it automatically
