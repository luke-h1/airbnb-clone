import React, { memo } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

interface Props {}

const position: [number, number] = [51.505, -0.09];

const Map: React.FC<Props> = () => {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};
export default memo(Map);
