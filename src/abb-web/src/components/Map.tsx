import React, { memo } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

// interface _Property {
//   hasMore: boolean;
//   properties: {
//     id: number;
//     title: string;
//     propertyType: string;
//     mainImage: string;
//     description: string;
//     pricePerNight: number;
//     latitude: number;
//     longitude: number;
//     createdAt: number;
//     updatedAt: number;
//     creator: {
//       id: number;
//       email: string;
//       picture: string;
//       fullName: string;
//     }
//     reviews: {
//       id: number;
//       title: string;
//       body: string;
//       creator: {
//         id: number;
//         email: string;
//         fullName: string;
//       }
//     }
//   }
// }

// interface Props {
//   properties?: _Property[]
// }

const position: [number, number] = [51.505, -0.09];

const Map: React.FC<{}> = ({ properties }: any) => {
  console.log(properties);
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
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default memo(Map);
