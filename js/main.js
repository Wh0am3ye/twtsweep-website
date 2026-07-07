function initMenu() {
  const toggle = document.querySelector(".toggle.open");
  const menu = document.querySelector(".menu");
  const closeBtn = document.querySelector(".toggle.close");

  if (!menu) return;

  syncMenuState();
  window.addEventListener("resize", syncMenuState);

  // All focusable elements inside the menu
  function getFocusable() {
    return [...menu.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )];
  }

  function syncMenuState() {
    const isMobile = window.matchMedia("(max-width: 989px)").matches;

    if (!isMobile) {
      menu.removeAttribute("aria-hidden");
      menu.removeAttribute("tabindex");
      return;
    }

    if (menu.classList.contains("active")) {
      menu.setAttribute("aria-hidden", "false");
      menu.removeAttribute("tabindex");
    } else {
      menu.setAttribute("aria-hidden", "true");
      menu.setAttribute("tabindex", "-1");
    }
  }

  function openMenu() {
    menu.classList.add("active");
    syncMenuState();
    toggle.setAttribute("aria-expanded", "true");

    // Prevent screen readers reaching background content
    document.querySelector("nav").setAttribute("data-menu-open", "true");
    document.querySelectorAll("body > *:not(header          )").forEach(el => {
      el.setAttribute("inert", "");
    });

    // Move focus to the close button
    closeBtn.focus();
  }

  function closeMenu() {
    menu.classList.remove("active");
    syncMenuState();
    toggle.setAttribute("aria-expanded", "false");

    // Restore background content
    document.querySelectorAll("[inert]").forEach(el => {
      el.removeAttribute("inert");
    });

    // Return focus to the hamburger button
    toggle.focus();
  }

  // Focus trap on Tab / Shift+Tab
  menu.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      closeMenu();
      return;
    }

    if (e.key !== "Tab") return;

    // Only trap focus when the menu is open (mobile overlay mode)
    if (!menu.classList.contains("active")) return;    

    const focusable = getFocusable();
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  toggle.addEventListener("click", openMenu);

  closeBtn.addEventListener("click", closeMenu);

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMenu();

  // Conditional loading for page-specific features
  if (document.querySelector("form")) {
    import("./form.js").then(m => m.initForm());
  }

  if (document.querySelector(".review-slide")) {
    import("./carousel.js").then(m => m.initCarousel());
  }

  if (document.getElementById("map")) {
    import("./map.js").then(m => m.initMap());
  }

  if (document.getElementById("smoke")) {
    import("./smoke.js").then(m => m.initSmoke());
  }
});