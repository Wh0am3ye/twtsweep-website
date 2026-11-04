const PERSIST_EMBED_CHOICES = false;
const MAPBOX_VERSION = "v3.23.1";
const MAPBOX_CSS = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VERSION}/mapbox-gl.css`;
const MAPBOX_JS = `https://api.mapbox.com/mapbox-gl-js/${MAPBOX_VERSION}/mapbox-gl.js`;
let mapboxAssetsPromise;

function loadMapboxAssets() {
  if (window.mapboxgl) return Promise.resolve();
  if (mapboxAssetsPromise) return mapboxAssetsPromise;

  mapboxAssetsPromise = new Promise((resolve, reject) => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = MAPBOX_CSS;
    stylesheet.addEventListener("error", () => {
      stylesheet.remove();
      mapboxAssetsPromise = null;
      reject(new Error("Mapbox styles could not be loaded."));
    }, { once: true });
    stylesheet.addEventListener("load", () => {
      const script = document.createElement("script");
      script.src = MAPBOX_JS;
      script.async = true;
      script.addEventListener("error", () => {
        script.remove();
        stylesheet.remove();
        mapboxAssetsPromise = null;
        reject(new Error("Mapbox GL JS could not be loaded."));
      }, { once: true });
      script.addEventListener("load", () => {
        if (window.mapboxgl) {
          resolve();
        } else {
          mapboxAssetsPromise = null;
          reject(new Error("Mapbox GL JS did not initialise."));
        }
      }, { once: true });
      document.head.append(script);
    }, { once: true });
    document.head.append(stylesheet);
  });

  return mapboxAssetsPromise;
}

function statusRegion(gate) {
  return gate.closest("section")?.querySelector("[data-gate-status]");
}

function storeChoice(gate) {
  if (PERSIST_EMBED_CHOICES) {
    sessionStorage.setItem(`embed-${gate.dataset.embedGate}`, "loaded");
  }
}

async function loadMap(gate, button) {
  const status = statusRegion(gate);
  const mapElement = gate.querySelector("#map");
  button.disabled = true;
  status.textContent = gate.dataset.loadingMessage;

  try {
    await loadMapboxAssets();
    const { initMap } = await import("./map.js");
    const map = await initMap();
    gate.classList.add("is-loaded");
    gate.querySelector("[data-gate-placeholder]").hidden = true;
    mapElement.setAttribute("aria-hidden", "false");
    map.resize();
    status.textContent = gate.dataset.loadedMessage;
    mapElement.focus({ preventScroll: true });
    storeChoice(gate);
  } catch (error) {
    console.error("Error loading the service-area map:", error);
    gate.querySelector("[data-gate-error]").hidden = false;
    status.textContent = gate.dataset.errorMessage;
    button.disabled = false;
  }
}

function loadBooking(gate) {
  const placeholder = gate.querySelector("[data-gate-placeholder]");
  const iframe = document.createElement("iframe");
  const bookingUrl = new URL(gate.dataset.src, window.location.href);
  const serviceId = new URLSearchParams(window.location.search).get("service");

  if (serviceId) bookingUrl.pathname = `/services/${encodeURIComponent(serviceId)}`;

  iframe.id = "booking-frame";
  iframe.src = bookingUrl.href;
  iframe.title = gate.dataset.title;
  iframe.width = "100%";
  iframe.height = "600";
  iframe.className = "booking-frame";
  const status = statusRegion(gate);
  status.textContent = gate.dataset.loadingMessage;
  iframe.addEventListener("load", () => {
    status.textContent = gate.dataset.loadedMessage;
    iframe.focus({ preventScroll: true });
  }, { once: true });
  placeholder.replaceWith(iframe);
  storeChoice(gate);
}

export function initEmbedGates() {
  document.querySelectorAll("[data-embed-gate]").forEach(gate => {
    const button = gate.querySelector("[data-gate-load]");
    if (!button) return;

    const activate = () => {
      if (gate.dataset.embedGate === "map") {
        loadMap(gate, button);
      } else if (gate.dataset.embedGate === "booking") {
        loadBooking(gate);
      }
    };

    button.addEventListener("click", activate);

    if (PERSIST_EMBED_CHOICES && sessionStorage.getItem(`embed-${gate.dataset.embedGate}`) === "loaded") {
      activate();
    }
  });
}