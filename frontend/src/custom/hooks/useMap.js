import { useEffect } from "react";
import L from "leaflet";
import "leaflet.heat";
import "leaflet/dist/leaflet.css";

const useMap = (mapContainer, MAPYCZ_API_KEY, heatData, isLoading) => {
  useEffect(() => {
    const map = L.map(mapContainer.current).setView(
      [50.772245567257514, 15.0744030469653],
      16
    );
    L.tileLayer(
      `https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${MAPYCZ_API_KEY}`,
      {
        minZoom: 0,
        maxZoom: 19,
        attribution:
          '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
      }
    ).addTo(map);

    if (!isLoading) {
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
