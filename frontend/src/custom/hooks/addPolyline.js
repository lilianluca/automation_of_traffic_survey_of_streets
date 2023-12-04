import useFetch from "./useFetch";

const addPolyline = (map, coordinates) => {
  L.polyline(coordinates, {
    color: "red",
    opacity: 0.65,
    weight: 5,
  }).addTo(map);
};

export default addPolyline;
