const year = document.querySelector("#year");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");
const copyEmailButton = document.querySelector("#copyEmail");
const typedRole = document.querySelector("#typedRole");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const projectDetailButtons = document.querySelectorAll(".project-detail");
const projectModal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#modalTitle");
const modalDetail = document.querySelector("#modalDetail");
const modalClose = document.querySelector(".modal-close");
const email = "gokulvyshant@gmail.com";

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = "Email Copied";
    } catch {
      copyEmailButton.textContent = email;
    }

    window.setTimeout(() => {
      copyEmailButton.textContent = "Copy Email";
    }, 2200);
  });
}

if (typedRole) {
  const roles = [
    "Frontend + Backend + AI",
    "HTML, CSS, JavaScript",
    "Python, Java, MySQL",
    "Building full-stack projects"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeRole = () => {
    const current = roles[roleIndex];
    typedRole.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex += 1;
      window.setTimeout(typeRole, 70);
      return;
    }

    if (!deleting && charIndex === current.length) {
      deleting = true;
      window.setTimeout(typeRole, 1300);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      window.setTimeout(typeRole, 35);
      return;
    }

    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    window.setTimeout(typeRole, 300);
  };

  typeRole();
}

const revealTargets = document.querySelectorAll(
  ".reveal, .section-heading, .metrics article, .stack-card, .service-card, .project-card, .timeline-item"
);

revealTargets.forEach((element) => element.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealTargets.forEach((element) => revealObserver.observe(element));

const skillCards = document.querySelectorAll("[data-skill]");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const level = entry.target.dataset.skill || "75";
      const bar = entry.target.querySelector(".skill-meter span");
      if (bar) {
        bar.style.width = `${level}%`;
      }
      skillObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

skillCards.forEach((card) => skillObserver.observe(card));

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      const target = Number(entry.target.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 36));

      const updateCount = () => {
        current = Math.min(current + step, target);
        entry.target.textContent = `${current}+`;

        if (current < target) {
          window.requestAnimationFrame(updateCount);
        }
      };

      updateCount();
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

projectDetailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!projectModal || !modalTitle || !modalDetail) {
      return;
    }

    modalTitle.textContent = button.dataset.title || "Project";
    modalDetail.textContent = button.dataset.detail || "";

    if (typeof projectModal.showModal === "function") {
      projectModal.showModal();
    }
  });
});

if (modalClose && projectModal) {
  modalClose.addEventListener("click", () => projectModal.close());
}

const navLinks = document.querySelectorAll(".site-nav a");
const sections = [...navLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const activeNavObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

sections.forEach((section) => activeNavObserver.observe(section));
