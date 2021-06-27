import { LatLngExpression } from 'leaflet';
import React, { memo, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { Text } from '@chakra-ui/react';

const CreateMap: React.FC<{}> = () => {
  const [position, setPosition] = useState<LatLngExpression>([
    53.48095, -2.23743,
  ]); // manc

  const GetLoc = () => {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng as any);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <>
      <Text as="h2" fontSize="20px" mb={2}>
        Pick your property from the map
      </Text>
      <MapContainer
        center={position}
        zoom={9}
        scrollWheelZoom
        style={{ height: '35vw', width: '75vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={[p.longitude, p.latitude]}>
          <Popup>{p.title}</Popup>
        </Marker> */}
        <GetLoc />
      </MapContainer>
    </>
  );
};
export default memo(CreateMap);
