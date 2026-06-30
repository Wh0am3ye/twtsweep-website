export function initMenu() {
  const toggle = document.querySelector(".toggle.open");
  const menu = document.querySelector(".menu");
  const closeBtn = document.querySelector(".toggle.close");

  if (!menu) return;

  // All focusable elements inside the menu
  function getFocusable() {
    return [...menu.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )];
  }

  function openMenu() {
    menu.classList.add("active");
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");

    // Prevent screen readers reaching background content
    document.querySelector("nav").setAttribute("data-menu-open", "true");
    document.querySelectorAll("body > *:not(header)").forEach(el => {
      el.setAttribute("inert", "");
    });

    // Move focus to the close button
    closeBtn.focus();
  }

  function closeMenu() {
    menu.classList.remove("active");
    menu.setAttribute("aria-hidden", "true");
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