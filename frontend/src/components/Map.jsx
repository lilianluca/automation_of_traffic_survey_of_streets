import React, { useRef } from "react";
import useFetch from "../custom/hooks/useFetch";
import useMap from "../custom/hooks/useMap";

const Map = () => {
  const MAPYCZ_API_KEY = import.meta.env.VITE_MAPYCZ_API_KEY;
  const mapContainer = useRef();
  const { data, isLoading } = useFetch(
    "http://127.0.0.1:8000/api/v1/map-points/"
  );
  const heatData = data?.results.map((mapPoint) => {
    const longitude = mapPoint.longitude;
    const latitude = mapPoint.latitude;
    const intensity = mapPoint.intensity;
    return [longitude, latitude, intensity];
  });
  const highlightData = data?.results.map((mapPoint) => {
    const longitude = mapPoint.longitude;
    const latitude = mapPoint.latitude;
    return [longitude, latitude];
  });
  useMap(mapContainer, MAPYCZ_API_KEY, heatData, highlightData, isLoading);
  console.log(highlightData)

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
