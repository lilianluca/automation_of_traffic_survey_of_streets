import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";

const useMap = (
  mapContainer,
  MAPYCZ_API_KEY,
  heatData,
  highlightData,
  isLoading
) => {
  useEffect(() => {
    const map = L.map(mapContainer.current).setView(
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

    const streetCoordinates = [
      [50.77104406473406, 15.047249248014701],
      [50.77038527066764, 15.047225162590252],
      [50.77006539043373, 15.047170970385233],
      [50.76986356011302, 15.047146884960783],
      [50.76952082738492, 15.0470926927557683],
      [50.769162859410216, 15.047104735467991],
      [50.76914381848378, 15.047086671399654],
      [50.769033380957545, 15.0470926927557682],
      [50.76874395723812, 15.046978286989626],
      [50.76867921747688, 15.046731411389],
      [50.76870968325804, 15.046189489338849],
      [50.768945792389296, 15.04550305474199],
      [50.769242831216644, 15.044810598789018],
      [50.76930757019792, 15.044515552339494],
    ];

    L.polyline(streetCoordinates, { color: 'red', opacity: 0.65, weight: 5 }).addTo(map);

    if (!isLoading) {
      // L.polyline(highlightData, { color: "red" }).addTo(map);

      L.heatLayer(heatData, {
        radius: 10, // Radius of each data point
        maxZoom: 19, // Maximum zoom level to display the heatmap
        gradient: { 0.4: "blue", 0.65: "lime", 1: "red" }, // Customize the gradient colors
      }).addTo(map);
    }
    return () => map.remove();
  }, [isLoading]);
};

export default useMap;
