import React, { useEffect, useRef } from "react";
import useFetch from "../custom/hooks/useFetch";
import useMap from "../custom/hooks/useMap";

const Map = () => {
  const MAPYCZ_API_KEY = import.meta.env.VITE_MAPYCZ_API_KEY;
  const mapContainer = useRef();
  const { data, isLoading } = useFetch(
    "http://127.0.0.1:8000/api/v1/map-points/"
  );
  const { data: streetData, isLoading: streetDataAreLoading } = useFetch(
    "https://nominatim.openstreetmap.org/search?q=Husova,Liberec&format=json&polygon_geojson&addressdetails=1&dedupe=0"
  );
  // UI - URL - https://nominatim.openstreetmap.org/ui/search.html?q=Liberec%2C+Husova&dedupe=0
  const heatData = data?.results.map((mapPoint) => {
    const longitude = mapPoint.longitude;
    const latitude = mapPoint.latitude;
    const intensity = mapPoint.intensity;
    return [longitude, latitude, intensity];
  });

  useMap(
    mapContainer,
    MAPYCZ_API_KEY,
    heatData,
    isLoading,
    streetData,
    streetDataAreLoading
  );

  return (
    <>
      <div
        className="w-[100%] h-[100vh]"
        ref={(el) => (mapContainer.current = el)}
      ></div>
    </>
  );
};

export default Map;
