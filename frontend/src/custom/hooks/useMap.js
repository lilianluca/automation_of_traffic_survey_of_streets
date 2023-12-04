import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";
import addPolyline from "./addPolyline";

const useMap = (
  mapContainer,
  MAPYCZ_API_KEY,
  heatData,
  isLoading,
  streetData,
  streetDataAreLoading
) => {
  let map;
  useEffect(() => {
    map = L.map(mapContainer.current).setView(
      [50.772245567257514, 15.0744030469653],
      16
    );

    /*
    We store all our tile layers in an object, because we will
    need to pass that to the layers switching map control.
    */
    const tileLayers = {
      Basic: L.tileLayer(
        `https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${MAPYCZ_API_KEY}`,
        {
          minZoom: 0,
          maxZoom: 19,
          attribution:
            '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }
      ),
      Outdoor: L.tileLayer(
        `https://api.mapy.cz/v1/maptiles/outdoor/256/{z}/{x}/{y}?apikey=${MAPYCZ_API_KEY}`,
        {
          minZoom: 0,
          maxZoom: 19,
          attribution:
            '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }
      ),
      Winter: L.tileLayer(
        `https://api.mapy.cz/v1/maptiles/winter/256/{z}/{x}/{y}?apikey=${MAPYCZ_API_KEY}`,
        {
          minZoom: 0,
          maxZoom: 19,
          attribution:
            '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }
      ),
      Aerial: L.tileLayer(
        `https://api.mapy.cz/v1/maptiles/aerial/256/{z}/{x}/{y}?apikey=${MAPYCZ_API_KEY}`,
        {
          minZoom: 0,
          maxZoom: 19,
          attribution:
            '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
        }
      ),
    };

    // Then we add the first raster tile layer to the map.
    tileLayers["Basic"].addTo(map);

    // Leaflet has a built-in map control for switching layers.
    L.control.layers(tileLayers).addTo(map);

    // Logo Mapy.cz
    const LogoControl = L.Control.extend({
      options: {
        position: "bottomleft",
      },

      onAdd: function (map) {
        const container = L.DomUtil.create("div");
        const link = L.DomUtil.create("a", "", container);

        link.setAttribute("href", "http://mapy.cz/");
        link.setAttribute("target", "_blank");
        link.innerHTML = '<img src="https://api.mapy.cz/img/api/logo.svg" />';
        L.DomEvent.disableClickPropagation(link);

        return container;
      },
    });

    // finally we add our LogoControl to the map
    new LogoControl().addTo(map);

    if (!isLoading) {
      L.heatLayer(heatData, {
        radius: 10, // Radius of each data point
        maxZoom: 19, // Maximum zoom level to display the heatmap
        gradient: { 0.4: "blue", 0.65: "lime", 1: "red" }, // Customize the gradient colors
      }).addTo(map);
    }

    if (!streetDataAreLoading) {
      streetData.forEach((element) => {
        const { coordinates } = element.geojson;
        const formattedCoordinates = coordinates.map((element) => {
          return [element[1], element[0]];
        });
        addPolyline(map, formattedCoordinates);
      });
    }
    return () => map.remove();
  }, [isLoading, streetDataAreLoading]);
};

export default useMap;
