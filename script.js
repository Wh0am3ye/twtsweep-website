document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".toggle");
  const menu = document.querySelector(".menu");
  const closeBtn = document.querySelector(".close");

  if (toggle) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  }

  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });

  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const data = new FormData(form);

      const response = await fetch("https://formspree.io/f/YOUR-ID", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        alert("Thanks! Your message has been sent.");
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    });
  }
});
