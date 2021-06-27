import { PaginatedProperties } from '@src/generated/graphql';
import React, { memo } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

interface Props {
  properties?: PaginatedProperties;
}

const position: [number, number] = [51.505, -0.09];

const Map: React.FC<Props> = ({ properties }) => {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom
      style={{ height: '100vw', width: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties!.properties.map((p) => (
        <Marker position={[p.longitude, p.latitude]}>
          <Popup>{p.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default memo(Map);
