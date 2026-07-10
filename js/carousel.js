export function initCarousel() {
  const slides = document.querySelectorAll(".review-slide");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!slides.length || !dotsContainer) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let current = 0;
  let interval;
  let isPaused = prefersReducedMotion;

  slides[0].classList.add("active");
  slides[0].setAttribute("aria-hidden", "false");

  slides.forEach((_, i) => {
    const button = document.createElement("button");
    button.classList.add("carousel-dot");
    button.setAttribute("aria-label", `Review ${i + 1} of ${slides.length}`);
    button.setAttribute("aria-pressed", i === 0 ? "true" : "false");
    if (i === 0) button.classList.add("active");

    button.addEventListener("click", () => {
      goToSlide(i);
      resetAuto();
    });

    dotsContainer.appendChild(button);
  });

  const dots = document.querySelectorAll(".carousel-dot");

  function goToSlide(index) {
    slides.forEach((s, i) => {
      s.classList.remove("active");
      s.setAttribute("aria-hidden", "true");
      // Hide all links in inactive slides
      const links = s.querySelectorAll("a");
      links.forEach(link => {
        link.setAttribute("aria-hidden", "true");
        link.setAttribute("tabindex", "-1");
      });
    });
    dots.forEach((d, i) => {
      d.classList.remove("active");
      d.setAttribute("aria-pressed", "false");
    });

    slides[index].classList.add("active");
    slides[index].setAttribute("aria-hidden", "false");
    // Show all links in active slide
    const activeLinks = slides[index].querySelectorAll("a");
    activeLinks.forEach(link => {
      link.setAttribute("aria-hidden", "false");
      link.removeAttribute("tabindex");
    });
    dots[index].classList.add("active");
    dots[index].setAttribute("aria-pressed", "true");
    current = index;
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((current - 1 + slides.length) % slides.length);
  }

  function startAuto() {
    if (isPaused || interval) return;
    interval = window.setInterval(nextSlide, 6000);
  }

  function stopAuto() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function pauseAuto() {
    isPaused = true;
    stopAuto();
  }

  function resumeAuto() {
    if (prefersReducedMotion) return;
    isPaused = false;
    startAuto();
  }

  function resetAuto() {
    stopAuto();
    if (!isPaused && !prefersReducedMotion) {
      startAuto();
    }
  }

  startAuto();

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    const focusedButton = document.activeElement;
    
    if (focusedButton && focusedButton.classList.contains("carousel-dot")) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevSlide();
        resetAuto();
        focusedButton.blur();
        dots[(current - 1 + slides.length) % slides.length].focus();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        nextSlide();
        resetAuto();
        focusedButton.blur();
        dots[(current + 1) % slides.length].focus();
      }
    }
  });

  const container = document.querySelector(".reviews-carousel");

  if (container) {
    let startX = 0;

    container.addEventListener("mouseenter", pauseAuto);
    container.addEventListener("mouseleave", resumeAuto);
    container.addEventListener("focusin", pauseAuto);
    container.addEventListener("focusout", e => {
      if (e.relatedTarget && container.contains(e.relatedTarget)) return;
      resumeAuto();
    });

    container.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    container.addEventListener("touchend", e => {
      const diff = startX - e.changedTouches[0].clientX;

      if (Math.abs(diff) > 50) {
        diff > 0 ? nextSlide() : prevSlide();
        resetAuto();
      }
    });
  }
}