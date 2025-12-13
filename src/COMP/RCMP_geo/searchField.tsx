import { useEffect } from "react";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";

function SearchField({ setPosition, iconPerson }: any) {
  const provider = new OpenStreetMapProvider();

  // @ts-ignore
  const searchControl = new GeoSearchControl({
    provider: provider,
    autoComplete: true,
    autoCompleteDelay: 250,
    showMarker: true, // optional: true|false  - default true
    showPopup: false, // optional: true|false  - default false
    marker: {
      // optional: L.Marker    - default L.Icon.Default
      icon: iconPerson,
      draggable: true,
    },
    popupFormat: ({ result }: any) => result.label, // optional: function    - default returns result label,
    resultFormat: ({ result }: any) => result.label, // optional: function    - default returns result label
    maxMarkers: 1, // optional: number      - default 1
    retainZoomLevel: false, // optional: true|false  - default false
    animateZoom: true, // optional: true|false  - default true
    autoClose: false, // optional: true|false  - default false
    searchLabel: "Enter address", // optional: string      - default 'Enter address'
    keepResult: false, // optional: true|false  - default false
    updateMap: true, // optional: true|false  - default true
  });

  const map = useMap();
  // @ts-ignore
  useEffect(() => {
    map.addControl(searchControl);
    map.on("geosearch/marker/dragend", (event: any) =>
      setPosition(event.location)
    );
    return () => map.removeControl(searchControl);
  }, []);

  return null;
}

export default SearchField;
