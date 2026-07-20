/**
 * site-data.js
 * ------------------------------------------------------------------
 * Everything that repeats across pages (nav links, socials, tech
 * stack, projects, contact info) lives in this one object instead
 * of being copy-pasted into every html file. I kept getting bitten
 * by updating a link on one page and forgetting the other two, so
 * now main.js just reads from here and builds the navbar/footer/
 * sections wherever they're needed.
 * ------------------------------------------------------------------
 */

const SITE_DATA = {

  owner: {
    fullName: "John Carlo Tulin",
    initials: "JC",
    copyrightYear: 2026,
  },

  resume: {
    filePath: "assets/resume.pdf",
    downloadedFileName: "John-Carlo-Tulin-Resume.pdf",
  },

  // `page` is how renderNavbar() in main.js decides which link gets
  // the active underline on a given page.
  navLinks: [
    { label: "Home", href: "index.html", page: "home" },
    { label: "About", href: "about.html", page: "about" },
    { label: "Portfolio", href: "index.html#projects", page: "projects" },
    { label: "Contact", href: "contact.html", page: "contact" },
  ],

  socialLinks: [
    { label: "Facebook", icon: "bxl-facebook", href: "https://www.facebook.com/kaloizkie.22" },
    { label: "LinkedIn", icon: "bxl-linkedin", href: "https://www.linkedin.com/in/john-carlo-tulin-809158369/" },
    { label: "GitHub", icon: "bxl-github", href: "https://github.com/JohnCGT" },
  ],

  // Grouped the way I actually think about my own stack. "Languages
  // & Data" is the odd one out — C++ and Python don't really belong
  // under Frontend or Backend, and SQL/Tableau/Power BI are more
  // about working with data than building with it, so they got their
  // own group instead of being forced somewhere they don't fit.
  techStack: [
    {
      group: "Frontend",
      items: [
        { name: "HTML", icon: "bxl-html5" },
        { name: "CSS", icon: "bxl-css3" },
        { name: "JavaScript", icon: "bxl-javascript" },
        { name: "Bootstrap", icon: "bxl-bootstrap" },
        { name: "React", icon: "bxl-react" },
      ],
    },
    {
      group: "Backend",
      items: [
        { name: "PHP", icon: "bxl-php" },
        { name: "Laravel", icon: "bx-code-curly" },
        { name: "Node.js", icon: "bxl-nodejs" },
        { name: "MySQL", icon: "bx-data" },
      ],
    },
    {
      group: "Languages & Data",
      items: [
        { name: "Python", icon: "bxl-python" },
        { name: "C++", icon: "bx-terminal" },
        { name: "SQL", icon: "bx-data" },
        { name: "Tableau", icon: "bx-bar-chart-alt-2" },
        { name: "Power BI", icon: "bx-pie-chart-alt-2" },
      ],
    },
    {
      group: "Tools & Workflow",
      items: [
        { name: "Git", icon: "bxl-git" },
        { name: "GitHub", icon: "bxl-github" },
        { name: "VS Code", icon: "bx-code-alt" },
        { name: "XAMPP", icon: "bx-server" },
      ],
    },
  ],

  // sect is the real one. the other two are placeholders until I
  // actually finish something worth showing — codeHref stays "#"
  // and liveHref is left out completely so the card only shows the
  // "Code" button (see the hasLiveDemo check in renderProjects()).
  //
  // image is optional too. once I have an actual screenshot I'll
  // point it at assets/img/projects/whatever.png and the card will
  // use that instead of the icon automatically.
  projects: [
    {
      fileLabel: "sect.app",
      icon: "bx-shield-quarter",
      title: "SECT: Cheating Detection Examination System",
      description: "Undergraduate thesis project: a web-based exam platform that flags a live cheating-probability score using Isolation Forest, One-Class SVM, and Hidden Markov Model behavior detection. Built with a four-person team and deployed to production.",
      tags: ["React", "node.js", "Laravel", "Python / ML", "PHP", "DigitalOcean"],
      codeHref: "https://github.com/JohnCGT/SECT-Exam-Anomaly-Detection",
      // liveHref: "https://sectexam.app",
      image: "assets/img/projects/sect.png",
    },
    {
      fileLabel: "pwd-e.com",
      icon: "bx-mobile-alt",
      title: "PWD-E",
      description: "Developed and maintained responsive, accessible web application features using AngularJS and Bootstrap, implemented dynamic UI components and WCAG-compliant accessibility enhancements, created UI/UX prototypes in Figma, performed QA testing, and used Git for version control and collaborative feature development.",
      tags: ["Angular", "Bootstrap", "PHP", "Wordpress", "Figma", "CSS"],
      // codeHref: "#",
      liveHref: "https://pwd-e.com/",
      type: "Work Project",
      image: "assets/img/projects/pwd-e.png",
    },
    {
      fileLabel: "burger-snipe-landing-page.com",
      icon: "bx-data",
      title: "Restaurant Landing Page",
      description: "Responsive restaurant landing website with menu filtering, live search, interactive ordering, and client-side checkout. Built with HTML, CSS, vanilla JavaScript, Bootstrap 5, and Tailwind CSS.",
      tags: ["PHP", "MySQL", "VanillaJS", "Tailwind", "CSS"],
      codeHref: "https://github.com/JohnCGT/Burger-Snipe-Landing-Page",
      liveHref: "https://johncgt.github.io/Burger-Snipe-Landing-Page/about.html",
      type: "Academic Project",
      image: "assets/img/projects/burger-snipe.png",
    },
  ],

  // still placeholder entries below, need to swap in my actual work
  // history (internship, part time job, freelance work, whatever
  // applies) once I have it written up properly. same idea as the
  // project placeholders above, just fill in role, organization,
  // period, and a couple of bullet points for each one.
  experience: [
    {
      role: "Junior Web Developer",
      organization: "Philippine Central Engagement Services Inc.",
      period: "June 2025 - January 2026",
      points: [
        "Developed and maintained front-end features for the PWD-E job hiring platform using AngularJS, Bootstrap, HTML, CSS, and JavaScript.",
        "Implemented backend functionality with PHP, including form handling, input validation, data sanitization, and database integration.",
        "Designed UI/UX wireframes and high-fidelity prototypes in Figma, maintained WordPress websites, and assisted with website deployment and hosting configurations.",
        "Performed functional, regression, and user acceptance testing (UAT), debugging front-end and back-end issues to improve application stability and reliability.",
        "Implemented WCAG accessibility enhancements, collaborated using Git workflows, and contributed to a production platform serving over 5,000 users across multiple devices and browsers.",
      ],
    },
  ],

  contactMethods: [
    {
      icon: "bx-phone",
      label: "Phone Number",
      value: "0928-7628-547",
      actionLabel: "Call",
      href: "tel:+639287628547",
    },
    {
      icon: "bx-envelope",
      label: "Email",
      value: "carlo.tulin22@gmail.com",
      actionLabel: "Compose",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=carlo.tulin22@gmail.com",
    },
    {
      icon: "bx-location-plus",
      label: "Location",
      value: "Mulawin, Tanza, Cavite",
      actionLabel: "Track",
      href: "https://www.google.com/maps/place/Mulawin,+Tanza,+Cavite/@14.383207,120.8297804,14z",
    },
  ],
};
