/* eslint-disable */
import { LatLngExpression } from 'leaflet';
import React, { memo, useRef, useState, useMemo, useCallback } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const CreateMap: React.FC<{}> = () => {
  const [position, setPosition] = useState<LatLngExpression>([0, 0]); // manc
  const [draggable, setDraggable] = useState<boolean>(false);

  const DraggableMarker = () => {
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current as any;
          if (marker !== null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    );
  };
  const toggleDraggable = useCallback(() => setDraggable((d) => !d), []);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom
      style={{ height: '35vw', width: '75vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />
    </MapContainer>
  );
};
export default memo(CreateMap);
