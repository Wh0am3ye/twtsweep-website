export function initMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement || !window.mapboxgl) return;

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