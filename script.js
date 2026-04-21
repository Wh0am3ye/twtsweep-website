document.addEventListener("DOMContentLoaded", () => {
  // Menu toggle button for mobile / small screens
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

  // Close the navigation menu when a menu link is clicked
  document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  });

  // Contact form submission via Formspree
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
  const mapElement = document.getElementById("map");

  if (mapElement) {
    mapboxgl.accessToken = window.MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/wh0am3ye/cmnst0r6j002101qw838zg4xj",
      center: [-4.2, 53.15],
      zoom: 8.2
    });

    map.on("load", () => {
      map.addSource("service-area", {
        type: "geojson",
        data: "/maps/service-areas.geojson"
      });

      map.addLayer({
        id: "service-area-fill",
        type: "fill",
        source: "service-area",
        paint: {
          "fill-color": "#C6A27E",
          "fill-opacity": 0.25
        }
      });

      map.addLayer({
        id: "service-area-line",
        type: "line",
        source: "service-area",
        paint: {
          "line-color": "#C6A27E",
          "line-width": 2
        }
      });

      fetch("/maps/service-areas.geojson")
        .then(res => res.json())
        .then(data => {
          const bounds = new mapboxgl.LngLatBounds();

          data.features.forEach(feature => {
            const coords = feature.geometry.coordinates[0];
            coords.forEach(coord => bounds.extend(coord));
          });

          map.fitBounds(bounds, { padding: 40 });
        })
        .catch(err => console.error("Error loading GeoJSON:", err));

      const isWelshPage = window.location.pathname.includes("/cy/");
      const towns = [
        { nameEn: "Penygroes", nameCy: "Penygroes", coords: [-4.2810, 53.0550] },
        { nameEn: "Llanberis", nameCy: "Llanberis", coords: [-4.1290, 53.1170] },
        { nameEn: "Menai Bridge", nameCy: "Porthaethwy", coords: [-4.1650, 53.2270] },
        { nameEn: "Bethesda", nameCy: "Bethesda", coords: [-4.0580, 53.1800] },
        { nameEn: "Llandudno", nameCy: "Llandudno", coords: [-3.8277, 53.3240] },
        { nameEn: "Holyhead", nameCy: "Caergybi", coords: [-4.6330, 53.3060] },
        { nameEn: "Pwllheli", nameCy: "Pwllheli", coords: [-4.4140, 52.8890] }
      ];

      towns.forEach(town => {
        const label = isWelshPage ? town.nameCy || town.nameEn : town.nameEn;
        const el = document.createElement("div");
        el.className = "town-dot-only";

        new mapboxgl.Marker({
          element: el,
          anchor: "center"
        })
          .setLngLat(town.coords)
          .addTo(map);
      });

      towns.forEach(town => {
        const langLabel = isWelshPage ? town.nameCy || town.nameEn : town.nameEn;
        const label = document.createElement("div");
        label.className = "town-label";
        label.textContent = langLabel;

        new mapboxgl.Marker({
          element: label,
          anchor: "left"
        })
          .setLngLat(town.coords)
          .setOffset([15, 0]) // pushes label right of dot
          .addTo(map);
      });
    });
  }

  function initCarousel() {
  const slides = document.querySelectorAll(".review-slide");

if (!slides.length) return;

  slides.forEach(s => s.classList.remove("active"));
  slides[0].classList.add("active");
}
initCarousel();
  const slides = document.querySelectorAll(".review-slide");
  const dotsContainer = document.querySelector(".carousel-dots");
if (slides.length && dotsContainer) {
  let current = 0;
  let startX = 0;
  let endX = 0;

  // -------------------
  // CREATE DOTS
  // -------------------
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

  // -------------------
  // SHOW SLIDE
  // -------------------
  function goToSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");

    current = index;
  }
  

  // -------------------
  // NEXT / PREV
  // -------------------
  function nextSlide() {
    let next = (current + 1) % slides.length;
    goToSlide(next);
  }

  function prevSlide() {
    let prev = (current - 1 + slides.length) % slides.length;
    goToSlide(prev);
  }

  // -------------------
  // AUTO ROTATE
  // -------------------
  let interval = setInterval(nextSlide, 6000);

  function resetAuto() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 6000);
  }

  // -------------------
  // SWIPE SUPPORT (MOBILE)
  // -------------------
  const container = document.querySelector(".reviews-carousel");

if (container) {
  container.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener("touchend", e => {
    endX = e.changedTouches[0].clientX;

    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
      resetAuto();
    }
  });
}
}
  document.querySelectorAll(".stars").forEach(el => {
  const rating = parseInt(el.dataset.rating, 10) || 5;

  for (let i = 0; i < rating; i++) {
    const star = document.createElement("i");
    star.className = "fas fa-star";
    el.appendChild(star);
  }
});

// -------------------
// SMOKE ANIMATION FOR 404 PAGE
// -------------------

const canvas = document.getElementById("smoke");
if (canvas) {
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class SmokeParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    // Puff randomness
    this.size = Math.random() * 20 + 20;
    this.speedX = (Math.random() - 0.5) * 1.5;
    this.speedY = Math.random() * -2 - 0.5;

    this.life = 100;
    this.opacity = 0.6;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.speedX += 0.01;
    // drift outward over time
    this.size += 0.2;

    // fade + disperse
    this.opacity -= 0.006;
    this.life--;
  }

  draw() {
  const shade = 60 + Math.random() * 40; // 60–100 range
  ctx.fillStyle = `rgba(${shade}, ${shade}, ${shade}, ${this.opacity})`;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
}
}

function createPuff(x, y) {
  for (let i = 0; i < 40; i++) {
    particles.push(new SmokeParticle(x, y));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.filter = "blur(8px)";
  particles.forEach((p, i) => {
    p.update();
    p.draw();

    if (p.opacity <= 0 || p.life <= 0) {
      particles.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
}

// Initial puff (center of screen)
createPuff(canvas.width / 2, canvas.height / 2);

animate();

// Optional: trigger new puff on click
window.addEventListener("click", (e) => {
  createPuff(e.clientX, e.clientY);
});
}

});