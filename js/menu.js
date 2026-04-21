export function initMenu() {
  const toggle = document.querySelector(".toggle");
  const menu = document.querySelector(".menu");
  const closeBtn = document.querySelector(".close");

  if (!menu) return;

  toggle?.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  closeBtn?.addEventListener("click", () => {
    menu.classList.remove("active");
  });

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });
}