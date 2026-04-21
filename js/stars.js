export function initStars() {
  document.querySelectorAll(".stars").forEach(el => {
    const rating = parseInt(el.dataset.rating, 10) || 5;

    for (let i = 0; i < rating; i++) {
      const star = document.createElement("i");
      star.className = "fas fa-star";
      el.appendChild(star);
    }
  });
}