
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import "./Map.css";
import { showDataMap } from './util';
function Map({countries, casesType, coord, zoom}) {
    return (
    <div className="map">
      <MapContainer  center={coord} zoom={zoom}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataMap(countries, casesType)}
        
        </MapContainer>
        
    </div>
    )
}

export default Map
