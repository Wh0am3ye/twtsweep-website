function initMenu() { const toggle = document.querySelector(".toggle"); const menu = document.querySelector(".menu"); const closeBtn = document.querySelector(".close"); if (!menu) return; toggle?.addEventListener("click", () => { menu.classList.toggle("active"); }); closeBtn?.addEventListener("click", () => { menu.classList.remove("active"); }); document.querySelectorAll(".menu a").forEach(link => { link.addEventListener("click", () => { menu.classList.remove("active"); }); }); }

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