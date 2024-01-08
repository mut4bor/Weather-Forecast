import { useRef, useEffect, useCallback, useState } from "react";
import { YMaps, Map, Circle } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { latitudeChanged, longitudeChanged } from "../redux/coordsSlice";
import { mapLatitudeChanged, mapLongitudeChanged } from "../redux/mapSlice";

type GeoObject = {
  events: {
    add: Function;
  };
  geometry: {
    getCoordinates: () => [number, number];
  };
};

function GeoMap() {
  const dispatch = useAppDispatch();
  const circleRef = useRef<GeoObject>();
  const mapRef = useRef<GeoObject>();

  const defaultCoordsLat = useAppSelector((state) => state.coords.latitude);
  const defaultCoordsLon = useAppSelector((state) => state.coords.longitude);
  const mapCoords = useAppSelector((state) => state.map);
  const [pageBlurBoolean, setPageBlurBoolean] = useState(true);

  const handleDragCircle = useCallback((event: any) => {
    const { target } = event?.originalEvent ?? {};
    const coordinates = target?.geometry?.getCoordinates() as
      | [number, number]
      | undefined;
    console.log(coordinates);

    if (coordinates) {
      dispatch(latitudeChanged(coordinates[0]));
      dispatch(longitudeChanged(coordinates[1]));
    }
  }, []);

  function handleCoordinates() {
    if (circleRef.current) {
      const circle = circleRef.current;
      circle.events.add("dragend", handleDragCircle);
    }
  }

  const handleDragMap = useCallback((event: any) => {
    const { target } = event?.originalEvent ?? {};
    const coordinates = target?.getCenter() as [number, number] | undefined;
    console.log(coordinates);

    if (coordinates) {
      dispatch(mapLatitudeChanged(coordinates[0]));
      dispatch(mapLongitudeChanged(coordinates[1]));
    }
  }, []);

  function handleMap() {
    if (mapRef.current) {
      const map = mapRef.current;
      map.events.add("actionend", handleDragMap);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setPageBlurBoolean(false);
      handleMap();
      handleCoordinates();
    }, 1000);
  }, [circleRef.current, mapRef.current]);

  return (
    <>
      <div
        className={`${
          pageBlurBoolean ? "blur pointer-events-none" : ""
        } transition ease-out`}
      >
        <YMaps>
          <Map
            defaultState={{
              center: [defaultCoordsLat, defaultCoordsLon],
              zoom: 9,
              controls: ["zoomControl"],
            }}
            state={{
              center: [mapCoords.latitude, mapCoords.longitude],
              zoom: 9,
            }}
            options={{
              minZoom: 3,
              maxZoom: 23,
            }}
            modules={["control.ZoomControl"]}
            width={"100%"}
            height={"100vh"}
            instanceRef={mapRef as any}
          >
            <Circle
              geometry={[[defaultCoordsLat, defaultCoordsLon], 12000]}
              options={{
                draggable: true,
                fillColor: "#DB709377",
                strokeColor: "#990066",
                strokeOpacity: 0.8,
                strokeWidth: 5,
              }}
              instanceRef={circleRef as any}
            />
          </Map>
        </YMaps>
      </div>
    </>
  );
}

export default GeoMap;
