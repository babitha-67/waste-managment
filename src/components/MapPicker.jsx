// components/MapPicker.jsx
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function MapPicker({ onLocationChange }) {
  const [position, setPosition] = useState(null);
  const { t } = useTranslation();

  function LocationMarker() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const data = await res.json();
        const address = data.address;

        // 👇 You can customize which parts you want
        const locationText = [
          address.road,
          address.suburb || address.neighbourhood,
          address.city || address.town || address.village,
          address.state,
          address.postcode,
        ]
          .filter(Boolean)
          .join(", ");

        onLocationChange({ lat, lng, text: locationText });
      },
    });

    return position === null ? null : <Marker position={position} />;
  }

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{t("map_picker.label")}</label>
      <MapContainer
        center={[10.7905, 78.7047]} // Centered on Trichy
        zoom={13}
        style={{ height: "300px", width: "100%" }}
        className="rounded shadow"
      >
        <TileLayer
          attribution="© OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
      </MapContainer>
    </div>
  );
}
