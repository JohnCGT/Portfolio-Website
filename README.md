# Portfolio Website - John Carlo Tulin

Personal portfolio built with HTML, CSS, and vanilla JavaScript on top of
Bootstrap 5. No frameworks, no build step, no package manager. Clone the repo
and open `index.html` in a browser and everything runs.

## Tech stack

| Technology | Used for |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | All styling, custom properties, Flexbox and Grid layout |
| JavaScript (ES6+) | Rendering shared content across pages from a single data source |
| Bootstrap 5.3 | Grid system and a small set of responsive utility classes |
| Boxicons | Icon set used throughout the site |
| Google Fonts | Inter (body text) and JetBrains Mono (code style accents) |
| Circular Std | Self hosted heading font, loaded through `@font-face` |

## File structure

```
Portfolio-main/
├── index.html
├── about.html
├── contact.html
├── README.md
└── assets/
    ├── css/
    │   └── style.css
    ├── js/
    │   ├── site-data.js
    │   └── main.js
    ├── fonts/
    │   ├── CircularStd-Book.otf
    │   └── CircularStd-Black.otf
    ├── img/
    │   ├── favicon.svg
    │   └── projects/
    │       └── README.md
    └── resume.pdf
```

## File by file breakdown

### Root files

| File | Purpose |
|---|---|
| `index.html` | Home page. Contains the hero section, the tech stack section, and the featured projects section. The tech stack and project cards are empty containers in this file and get filled in by `main.js` at runtime. |
| `about.html` | About page. Contains my education, a short bio, a quick facts row (education, frontend, backend, location), and a tools grid that reuses the same tech stack data shown on the home page. |
| `contact.html` | Contact page. Contains a two column layout: a short intro panel with my availability status and social links, and a list of contact methods (phone, email, location) built from data. |
| `README.md` | This file. |

### assets/css/style.css

One stylesheet for the whole site, organized into labeled sections in this order:

| Section | Covers |
|---|---|
| Fonts and design tokens | `@font-face` declarations and the `:root` block of CSS custom properties (colors, fonts) reused everywhere else in the file |
| Base and typography | `body`, heading defaults, focus states |
| Navbar | The fixed top navigation bar, nav link underline animation, and the resume dropdown button |
| Eyebrow and status pill | Small reusable text and badge styles used across all three pages |
| Hero | The home page hero, including the IDE style window, the code snippet card, and the line number gutter |
| Tech stack | The icon and name grid used on the home page and reused on the About page tools section |
| Projects | The featured project card and the smaller project card grid, including the optional image thumbnail styling |
| Footer | The site footer shared across all pages |
| Fade in | The shared scroll reveal animation and its `prefers-reduced-motion` override |
| About page | Layout for the photo frame, monogram, quick facts row, and pull quote |
| Contact page | Layout for the two column contact panel and the contact method rows |
| Responsive overrides | Breakpoint specific adjustments near the bottom of the file |

### assets/js/site-data.js

A single JavaScript object, `SITE_DATA`, holding every piece of content that
repeats across pages. Nothing in this file touches the DOM directly, it is
data only.

| Key | Contains |
|---|---|
| `owner` | My full name, initials (used in the navbar logo), and the copyright year for the footer |
| `resume` | The path to `resume.pdf` and the filename used when it is downloaded |
| `navLinks` | Label, href, and page identifier for each navbar link |
| `socialLinks` | Label, icon, and href for each social platform |
| `techStack` | An array of groups (Frontend, Backend, Languages and Data, Tools and Workflow), each with a list of `{ name, icon }` items |
| `projects` | An array of project objects, each with a title, description, tags, file label, icon, and optional `image`, `liveHref`, and `type` fields |
| `contactMethods` | An array of contact entries, each with an icon, label, value, action label, and href |

### assets/js/main.js

Reads `SITE_DATA` and renders it into the empty containers present in each
HTML file. Every function below is written so it only runs on the page that
actually has its target container, checked with an early return.

| Function | Renders |
|---|---|
| `renderNavbar()` | The navbar, including the active link highlight and the resume preview or download dropdown |
| `renderFooter()` | The footer copyright line and social icons |
| `renderTechStack()` | The icon and name grid on the home page, grouped by category |
| `renderAboutSkillTags()` | The same tech stack items, flattened into a single row on the About page |
| `renderAboutSummary()` | A sentence on the About page built from live counts (technologies, categories, projects) pulled from `SITE_DATA` |
| `renderProjects()` | The featured project card plus the smaller project card grid, including the conditional Code, Live Demo, and image logic |
| `renderContactMethods()` | The contact method rows on the Contact page |
| `initScrollSpy()` | Updates the active navbar link while scrolling through the home page sections, using `IntersectionObserver` |

All of the functions above run inside a single `DOMContentLoaded` listener, in
a loop that wraps each one in its own `try/catch`.

### assets/fonts/

| File | Purpose |
|---|---|
| `CircularStd-Book.otf` | Regular weight of the heading font |
| `CircularStd-Black.otf` | Bold weight of the heading font, used for headings and the navbar logo |

### assets/img/

| File | Purpose |
|---|---|
| `favicon.svg` | Browser tab icon, a simple monogram matching the site's color palette |
| `projects/README.md` | A short note for myself on how to add project screenshots and connect them to `site-data.js` |

### assets/resume.pdf

My current resume. Linked from the navbar dropdown on every page, both for
viewing in a new tab and for direct download.
