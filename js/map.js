export function initMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement || !window.mapboxgl) return;

  mapboxgl.accessToken = window.MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/wh0am3ye/cmnst0r6j002101qw838zg4xj",
    center: [-4.2, 53.15],
    zoom: 8.2,
    performanceMetricsCollection: false,
    collectResourceTiming: false,
    scrollZoom: false,
    doubleClickZoom: false,
    touchZoomRotate: false,
    boxZoom: false
  });

  map.on("load", () => {
    fetch("/maps/service-areas.geojson")
      .then(res => res.json())
      .then(geojson => {
        map.addSource("service-area", {
          type: "geojson",
          data: geojson
        });

        map.addLayer({
          id: "service-area-fill",
          type: "fill",
          source: "service-area",
          paint: {
            "fill-color": "#f28123",
            "fill-opacity": 0.25
          }
        });

        map.addLayer({
          id: "service-area-line",
          type: "line",
          source: "service-area",
          paint: {
            "line-color": "#f28123",
            "line-width": 3
          }
        });

        const bounds = new mapboxgl.LngLatBounds();

        geojson.features.forEach(feature => {
          const coords = feature.geometry.coordinates[0];
          coords.forEach(coord => bounds.extend(coord));
        });

        map.fitBounds(bounds, { padding: 40 });
      })
      .catch(err => console.error("Error loading GeoJSON:", err));

    const isWelshPage = window.location.pathname.includes("/cy/");
    const towns = [
      { nameEn: "Aberdaron", nameCy: "Aberdaron", coords: [-4.7101, 52.8046] },
      { nameEn: "Abergele", nameCy: "Abergele", coords: [-3.5822, 53.2844] },
      { nameEn: "Amlwch", nameCy: "Amlwch", coords: [-4.3454, 53.4107] },
      { nameEn: "Betws-y-Coed", nameCy: "Betws-y-coed", coords: [-3.8009, 53.0911] },
      { nameEn: "Cricieth", nameCy: "Cricieth", coords: [-4.2332, 52.9188] },
      { nameEn: "Harlech", nameCy: "Harlech", coords: [-4.1024, 52.8567] },
      { nameEn: "Holyhead", nameCy: "Caergybi", coords: [-4.6323, 53.3092] },
      { nameEn: "Llandudno", nameCy: "Llandudno", coords: [-3.8272, 53.3238] },
      { nameEn: "Menai Bridge", nameCy: "Porthaethwy", coords: [-4.1651, 53.2223] },
      { nameEn: "Penygroes", nameCy: "Penygroes", coords: [-4.2836, 53.0545] },
      { nameEn: "Pwllheli", nameCy: "Pwllheli", coords: [-4.4174, 52.8886] }
    ];

    const sortedTowns = [...towns].sort((a, b) => {
      const leftLabel = isWelshPage ? a.nameCy || a.nameEn : a.nameEn;
      const rightLabel = isWelshPage ? b.nameCy || b.nameEn : b.nameEn;
      return leftLabel.localeCompare(rightLabel, isWelshPage ? "cy" : "en", { sensitivity: "base" });
    });

    const townListContainer = document.getElementById("town-list");
    if (townListContainer) {
      const listTitle = document.createElement("h2");
      listTitle.textContent = isWelshPage ? "Trefi a phentrefi" : "Towns and villages";

      const townList = document.createElement("ul");
      townList.className = "town-list__items";

      sortedTowns.forEach(town => {
        const item = document.createElement("li");
        item.textContent = isWelshPage ? town.nameCy || town.nameEn : town.nameEn;
        townList.appendChild(item);
      });

      townListContainer.replaceChildren(listTitle, townList);
    }

    sortedTowns.forEach(town => {
      const langLabel = isWelshPage ? town.nameCy || town.nameEn : town.nameEn;

      const dot = document.createElement("div");
      dot.className = "town-dot-only";

      new mapboxgl.Marker({
        element: dot,
        anchor: "center"
      })
        .setLngLat(town.coords)
        .addTo(map);

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