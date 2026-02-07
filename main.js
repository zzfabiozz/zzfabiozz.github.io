const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
const year = document.getElementById("year");
const infoPanel = document.getElementById("info-panel");

// Footer year
if (year) year.textContent = new Date().getFullYear();

// Mobile menu helpers
function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.hidden = true;
  navToggle?.setAttribute("aria-expanded", "false");
}

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  if (mobileNav) mobileNav.hidden = isOpen;
});

mobileNav?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", closeMobileNav);
});

// Close mobile menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMobileNav();
});

// Highlight active section in desktop nav
const sections = document.querySelectorAll("section[id]");
const desktopLinks = document.querySelectorAll(".nav a[href^='#']");

const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      desktopLinks.forEach((l) => {
        l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 }
);

sections.forEach((s) => obs.observe(s));

// Hide the right hero panel when scrolling down, show when scrolling up
let lastScrollY = window.scrollY;
let ticking = false;

window.addEventListener("scroll", () => {
  // Keep it simple: only hide on desktop
  if (window.innerWidth <= 900) return;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY && currentScroll > 80) {
        infoPanel?.classList.add("hide");
      } else {
        infoPanel?.classList.remove("hide");
      }

      lastScrollY = currentScroll;
      ticking = false;
    });
    ticking = true;
  }
});
