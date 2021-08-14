
import React, { useState } from 'react';
import { MapContainer as LeafletMap, MapContainerProps as LeafletMapProps, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



interface MapContainerProps extends LeafletMapProps {
  interactive?: boolean
  children: React.ReactNode
}

export default function Map({ children, interactive = true, ...props }: MapContainerProps) {
  return (
    <LeafletMap 
      center={[-26.9951682,-48.6294723]} 
      zoom={15}       
      style={{ width: '100%', height: '100%' }}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
      {...props}
     
    >
      
       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
    
      {children}
    </LeafletMap>
  );
}