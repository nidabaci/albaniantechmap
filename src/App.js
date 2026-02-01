import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./App.css";
import data from "./data.json";

// Fix for default marker icons in Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const center = [41.33, 19.83];

function MyComponent() {
  const [selectedMarker, setSelectedMarker] = useState(null);

  return (
    <div className="app-wrapper">
      <h2> Harta e Kompanive IT / Digjitale ne Shqiperi </h2>
      <div className="mapContainer">
        <MapContainer center={center} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {data.map((location, index) => (
            <Marker
              key={index}
              position={[location.lat, location.lng]}
              eventHandlers={{
                click: () => setSelectedMarker(location),
              }}
            >
              <Popup>
                <div className="infoWindow">
                  <h3>{location.name}</h3>
                  <h4>{location.category}</h4>
                  {location.link && (
                    <a
                      href={location.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VENDODHJA &nbsp; {String.fromCodePoint("0x2192")}
                    </a>
                  )}
                  {location.website && (
                    <a
                      href={location.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WEBSITE &nbsp; {String.fromCodePoint("0x2192")}
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default React.memo(MyComponent);
