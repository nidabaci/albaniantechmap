import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import "./App.css";
import data from "./data.json";

const containerStyle = {
  width: "1000px",
  height: "450px",
};

const center = {
  lat: 41.33,
  lng: 19.83,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = React.useState(null);
  const onLoad = useCallback(() => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerClick = (marker, location) => {
    setSelectedMarker({ marker, location });
  };

  return isLoaded ? (
    <div>
      <h2> Companies on IT services and IT consulting in Albania </h2>
      <div className="mapContainer">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {data.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              title={location.name}
              onClick={(marker) => handleMarkerClick(marker, location)}
            />
          ))}
          {selectedMarker && (
            <InfoWindow
              position={{ lat: selectedMarker.location.lat, lng: selectedMarker.location.lng }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="infoWindow">
                <h3>{selectedMarker.location.name}</h3>
                <h4>{selectedMarker.location.category}</h4>
                {selectedMarker.location.link && (
                  <a href={selectedMarker.location.link} target="_blank" rel="noopener noreferrer">
                    Vizito Vendodhjen &nbsp; {String.fromCodePoint("0x2192")}
                  </a>
                )}
                {selectedMarker.location.website && (
                  <a href={selectedMarker.location.website} target="_blank" rel="noopener noreferrer">
                    Website &nbsp; {String.fromCodePoint("0x2192")}
                  </a>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);