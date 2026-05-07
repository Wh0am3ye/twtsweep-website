import { initMenu } from "./menu.js";
import { initForm } from "./form.js";
import { initMap } from "./map.js";
import { initCarousel } from "./carousel.js";
import { initSmoke } from "./smoke.js";

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initForm();
  initMap();
  initCarousel();
  initSmoke();
});