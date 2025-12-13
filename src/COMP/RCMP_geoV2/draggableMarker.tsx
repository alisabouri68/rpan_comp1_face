import { useState, useRef, useMemo } from "react";
import { Marker } from "react-leaflet";

function DraggableMarker({ iconPerson, position, setPosition }: any) {
  const [draggable] = useState(true);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker: any = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  // const toggleDraggable = useCallback(() => {
  //     setDraggable((d) => !d)
  // }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      icon={iconPerson}
      ref={markerRef}
    >
      {/* <Popup minWidth={90}>
                <span onClick={toggleDraggable}>
                    {draggable
                        ? 'Marker is draggable'
                        : 'Click here to make marker draggable'}
                </span>
            </Popup> */}
    </Marker>
  );
}

export default DraggableMarker;
