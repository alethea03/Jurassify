import React from "react";
import { MapContainer, TileLayer, Marker, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Dino {
  _id: string;
  name: string;
  period: string;
  type: string;
  diet: string;
  description: string;
  image: string;
  lat: number;
  lng: number;
}

interface TimelineMapProps {
  dinos: Dino[];
  onMarkerClick: (dino: Dino) => void;
}

const TimelineMap: React.FC<TimelineMapProps> = ({ dinos, onMarkerClick }) => {
  const placeholderImage = "/images/dinos/placeholder.jpg";

  const getIconByDinoImage = (image: string) =>
    new L.DivIcon({
      html: `<div style="
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid white;
        box-shadow: 0 0 6px rgba(0,0,0,0.5);
        background-image: url('${image}');
        background-size: cover;
        background-position: center;
      "></div>`,
      className: "",
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50],
    });

  // PRE-CALCULATE offsets based on coordinates
  const calculateOffsetPositions = (dinos: Dino[]) => {
    const counts: Record<string, number> = {};
    return dinos.map(dino => {
      const key = `${dino.lat}-${dino.lng}`;
      const count = counts[key] || 0;
      counts[key] = count + 1;
      const offset = 0.01 * count;
      return { ...dino, offsetLat: dino.lat + offset, offsetLng: dino.lng + offset };
    });
  };

  const dinosWithOffsets = calculateOffsetPositions(dinos);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      scrollWheelZoom={true}
      style={{ height: "100vh", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <ZoomControl position="bottomright" />
      {dinosWithOffsets.map((dino, idx) => (
        <Marker
          key={`${dino._id}-${idx}`}
          position={[dino.offsetLat, dino.offsetLng]}
          icon={getIconByDinoImage(dino.image || placeholderImage)}
          eventHandlers={{ click: () => onMarkerClick(dino) }}
        />
      ))}
    </MapContainer>
  );
};

export default TimelineMap;
