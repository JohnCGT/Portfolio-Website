/**
 * main.js
 * ------------------------------------------------------------------
 * Loaded on every page. Each page just has an empty <div> where the
 * navbar/footer/sections should go, and the functions below fill
 * them in from SITE_DATA. Saves me from writing the navbar three
 * separate times and them slowly drifting out of sync with each
 * other, which is exactly what happened before I set this up.
 *
 * Every render function starts by grabbing its target element and
 * bailing out if it's not there. That's the only thing that lets one
 * shared file run on all three pages without throwing errors on
 * pages that don't need a particular section.
 * ------------------------------------------------------------------
 */

/**
 * Navbar + resume dropdown. Active link is decided by comparing each
 * link's `page` value to document.body.dataset.page, which I set on
 * the <body> tag of each page (e.g. <body data-page="about">).
 */
function renderNavbar() {
  const navbarSlot = document.getElementById("site-navbar");
  if (!navbarSlot) return;

  const currentPage = document.body.dataset.page;

  const navLinksHtml = SITE_DATA.navLinks
    .map((link) => {
      const isActive = link.page === currentPage ? "active" : "";
      return `
        <li class="nav-item">
          <a class="nav-link ${isActive}" href="${link.href}" data-nav-page="${link.page}">
            ${link.label}
          </a>
        </li>`;
    })
    .join("");

  navbarSlot.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top py-3">
      <div class="container">
        <a class="navbar-brand logo" href="index.html">
          ${SITE_DATA.owner.initials}<span class="accent">.</span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#mainNav" aria-controls="mainNav"
                aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="mainNav">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            ${navLinksHtml}

            <!-- resume is a dropdown so someone can preview it before downloading,
                 instead of just yeeting a pdf onto their computer -->
            <li class="nav-item dropdown">
              <a class="nav-link nav-resume-btn dropdown-toggle" href="#" role="button"
                 data-bs-toggle="dropdown" aria-expanded="false">
                <i class='bx bx-file'></i> Resume
              </a>
              <ul class="dropdown-menu dropdown-menu-end resume-menu">
                <li>
                  <a class="dropdown-item" href="${SITE_DATA.resume.filePath}" target="_blank" rel="noopener">
                    <i class='bx bx-show'></i> View Resume
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="${SITE_DATA.resume.filePath}" download="${SITE_DATA.resume.downloadedFileName}">
                    <i class='bx bx-download'></i> Download PDF
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;
}

/**
 * Footer
 */
function renderFooter() {
  const footerSlot = document.getElementById("site-footer");
  if (!footerSlot) return;

  const socialLinksHtml = SITE_DATA.socialLinks
    .map(
      (social) => `
        <a href="${social.href}" target="_blank" rel="noopener" aria-label="${social.label}">
          <i class='bx ${social.icon}'></i>
        </a>`
    )
    .join("");

  footerSlot.innerHTML = `
    <footer class="footer py-4">
      <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <p class="mb-0 footer-text">
          © ${SITE_DATA.owner.copyrightYear} ${SITE_DATA.owner.fullName}. Portfolio.
        </p>
        <div class="d-flex gap-3 socials">
          ${socialLinksHtml}
        </div>
      </div>
    </footer>`;
}

/**
 * Home page: "What I Work With" section. Just the icon and the name
 * for each skill, grouped under a plain label per category — kept
 * it minimal instead of wrapping everything in cards.
 */
function renderTechStack() {
  const techStackSlot = document.getElementById("tech-stack-grid");
  if (!techStackSlot) return;

  techStackSlot.innerHTML = SITE_DATA.techStack
    .map((group) => {
      const itemsHtml = group.items
        .map((item) => `
          <div class="stack-item">
            <i class='bx ${item.icon}'></i>
            <span>${item.name}</span>
          </div>`)
        .join("");

      return `
        <div class="stack-group">
          <p class="stack-group-name">${group.group}</p>
          <div class="stack-grid">${itemsHtml}</div>
        </div>`;
    })
    .join("");
}

/**
 * About page: same big-icon-plus-name look as the Home page tech
 * stack, just flattened into one row instead of grouped by category.
 * Pulls from the same list in site-data.js so it can't drift out of
 * sync with the Home page version.
 */
function renderAboutSkillTags() {
  const skillGridSlot = document.getElementById("about-skill-tags");
  if (!skillGridSlot) return;

  const allItems = SITE_DATA.techStack.flatMap((group) => group.items);

  skillGridSlot.innerHTML = allItems
    .map((item) => `
      <div class="stack-item">
        <i class='bx ${item.icon}'></i>
        <span>${item.name}</span>
      </div>`)
    .join("");
}

/**
 * About page: a short sentence summarizing the tech stack and
 * project count, with the numbers pulled from SITE_DATA instead of
 * typed in by hand. Went with a sentence instead of the usual boxed
 * "12 / Technologies" stat cards — felt more like something I'd
 * actually say and less like a dashboard.
 */
function renderAboutSummary() {
  const summarySlot = document.getElementById("about-summary");
  if (!summarySlot) return;

  const totalSkills = SITE_DATA.techStack.reduce((total, group) => total + group.items.length, 0);
  const areaCount = SITE_DATA.techStack.length;
  const projectCount = SITE_DATA.projects.length;

  summarySlot.innerHTML = `
    Right now that's <strong>${totalSkills}</strong> technologies across
    <strong>${areaCount}</strong> areas I actually enjoy working in, and
    <strong>${projectCount}</strong> project${projectCount === 1 ? "" : "s"} I've
    shipped or am actively building.`;
}

/**
 * Home page: the project cards. The first project in SITE_DATA.projects
 * gets a bigger, horizontal "featured" treatment — it's the one I've
 * actually finished, so it should look more important than two
 * placeholders. The rest render as the smaller card grid underneath.
 */
function renderProjects() {
  const projectsSlot = document.getElementById("projects-grid");
  if (!projectsSlot) return;

  const [featuredProject, ...otherProjects] = SITE_DATA.projects;
  if (!featuredProject) return;

  const buildTagsHtml = (project) =>
    project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

  // "Live Demo" only shows up once a project actually has somewhere
  // to send people, "#" counts as not having one, same as leaving
  // liveHref out entirely.
  const buildLiveDemoHtml = (project) => {
    const hasLiveDemo = project.liveHref && project.liveHref !== "#";
    return hasLiveDemo
      ? `<a href="${project.liveHref}" class="card-link" target="_blank" rel="noopener">
           <i class='bx bx-link-external'></i> Website
         </a>`
      : "";
  };

  // same deal for "Code" no point linking to "#", so it's treated
  // the same as codeHref being left out entirely.
  const buildCodeHtml = (project) => {
    const hasCode = project.codeHref && project.codeHref !== "#";
    return hasCode
      ? `<a href="${project.codeHref}" class="card-link" target="_blank" rel="noopener">
          <i class='bx bxl-github'></i> Code
        </a>`
      : "";
  };

  // same idea for the screenshot — falls back to the icon look
  // if a project doesn't have one yet.
  const buildThumbHtml = (project) =>
    project.image
      ? `<img src="${project.image}" alt="${project.title} preview" loading="lazy">`
      : `<i class='bx ${project.icon}'></i>`;
    
  // optional — shows a small label above the title if a project has
  // a type set (e.g. "Academic Project"). the featured card falls
  // back to "featured build" so it always has something there.
  const buildTypeLabelHtml = (project, fallbackText) => {
    const labelText = project.type ? `// ${project.type.toLowerCase()}` : fallbackText;
    return labelText ? `<p class="featured-label">${labelText}</p>` : "";
  };

  const featuredThumbClass = featuredProject.image ? "has-image" : "";

  const featuredHtml = `
    <div class="project-featured fade-in fade-in-2">
      <div class="card-thumb ${featuredThumbClass}">
        <div class="window-bar w-100">
          <span><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></span>
          <span class="file-name">${featuredProject.fileLabel}</span>
        </div>
        ${buildThumbHtml(featuredProject)}
      </div>
      <div class="featured-body">
        ${buildTypeLabelHtml(featuredProject, "// featured build")}
        <h3 class="card-title featured-title">${featuredProject.title}</h3>
        <p class="card-text">${featuredProject.description}</p>
        <div class="d-flex flex-wrap gap-2 mb-3">${buildTagsHtml(featuredProject)}</div>
        <div class="card-footer">
          ${buildCodeHtml(featuredProject)}
          ${buildLiveDemoHtml(featuredProject)}
        </div>
      </div>
    </div>`;

  const otherProjectsHtml = otherProjects
    .map((project) => {
      const thumbModifier = project.image ? "has-image" : "";
      return `
        <div class="col-12 col-md-6">
          <div class="card project-card h-100">
            <div class="card-thumb ${thumbModifier}">
              <div class="window-bar w-100">
                <span><span class="dot dot-red"></span><span class="dot dot-yellow"></span><span class="dot dot-green"></span></span>
                <span class="file-name">${project.fileLabel}</span>
              </div>
              ${buildThumbHtml(project)}
            </div>
            <div class="card-body">
              ${buildTypeLabelHtml(project, "")}
              <h5 class="card-title">${project.title}</h5>
              <p class="card-text">${project.description}</p>
              <div class="d-flex flex-wrap gap-2 mb-3">${buildTagsHtml(project)}</div>
            </div>
            <div class="card-footer">
              ${buildCodeHtml(project)}
              ${buildLiveDemoHtml(project)}
            </div>
          </div>
        </div>`;
    })
    .join("");

  projectsSlot.innerHTML = `
    ${featuredHtml}
    <div class="row g-4 fade-in fade-in-3">${otherProjectsHtml}</div>`;
}

/**
 * About page: work experience cards. One card per job in
 * SITE_DATA.experience, an icon badge on the left (same circular
 * badge look as the Quick Facts row), role and dates on the right.
 */
function renderExperience() {
  const timelineSlot = document.getElementById("experience-timeline");
  if (!timelineSlot) return;

  timelineSlot.innerHTML = SITE_DATA.experience
    .map((job) => {
      const pointsHtml = job.points.map((point) => `<li>${point}</li>`).join("");

      return `
        <div class="timeline-item">
          <span class="timeline-icon"><i class='bx bx-briefcase'></i></span>
          <div class="timeline-content">
            <div class="timeline-top">
              <h3 class="timeline-role">${job.role}</h3>
              <span class="tag timeline-period">${job.period}</span>
            </div>
            <p class="timeline-org">${job.organization}</p>
            <ul class="timeline-points">${pointsHtml}</ul>
          </div>
        </div>`;
    })
    .join("");
}

/**
 * Contact page: each method (phone, email, location) becomes a
 * clickable row instead of a card, since I only had 3 methods and
 * a card grid felt like it was trying too hard to fill space.
 */
function renderContactMethods() {
  const contactSlot = document.getElementById("contact-methods-grid");
  if (!contactSlot) return;

  contactSlot.innerHTML = SITE_DATA.contactMethods
    .map(
      (method) => `
        <a class="contact-row" href="${method.href}" target="_blank" rel="noopener">
          <span class="contact-row-icon"><i class='bx ${method.icon}'></i></span>
          <span class="contact-row-text">
            <span class="contact-row-label">${method.label}</span>
            <span class="contact-row-value">${method.value}</span>
          </span>
          <span class="contact-row-action">${method.actionLabel} <i class='bx bx-right-arrow-alt'></i></span>
        </a>`
    )
    .join("");
}

/**
 * Home page only: while scrolling through #home and #projects,
 * swaps the active nav link to match whichever section is on
 * screen. Just IntersectionObserver, didn't need a library for two
 * sections.
 */
function initScrollSpy() {
  const watchedSections = document.querySelectorAll("#home, #projects");
  if (watchedSections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeSectionId = entry.target.id === "home" ? "home" : "projects";
        document.querySelectorAll("[data-nav-page]").forEach((link) => {
          link.classList.toggle("active", link.dataset.navPage === activeSectionId);
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  watchedSections.forEach((section) => observer.observe(section));
}

// Runs everything above once the page has parsed. Wrapped each call
// in its own try/catch — one section throwing (bad data, typo,
// whatever) shouldn't take the rest of the page down with it.
document.addEventListener("DOMContentLoaded", () => {
  const renderSteps = [
    renderNavbar,
    renderFooter,
    renderTechStack,
    renderAboutSkillTags,
    renderAboutSummary,
    renderProjects,
    renderExperience,
    renderContactMethods,
    initScrollSpy,
  ];

  renderSteps.forEach((renderStep) => {
    try {
      renderStep();
    } catch (error) {
      console.error(`"${renderStep.name}" failed:`, error);
    }
  });
});
