export function initCarousel() {
  const slides = document.querySelectorAll(".review-slide");
  const dotsContainer = document.querySelector(".carousel-dots");

  if (!slides.length || !dotsContainer) return;

  let current = 0;
  let interval;

  slides[0].classList.add("active");

  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.classList.add("carousel-dot");
    if (i === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      goToSlide(i);
      resetAuto();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".carousel-dot");

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    current = index;
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((current - 1 + slides.length) % slides.length);
  }

  function resetAuto() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 6000);
  }

  interval = setInterval(nextSlide, 6000);

  const container = document.querySelector(".reviews-carousel");

  if (container) {
    let startX = 0;

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