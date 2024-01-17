import { useRef, useEffect, useCallback, useState, useMemo, memo } from "react";
import { YMaps, Map, Circle } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { latitudeChanged, longitudeChanged } from "../redux/slices/coordsSlice";
import { mapLatitudeChanged, mapLongitudeChanged } from "../redux/slices/mapSlice";

type GeoObject = {
  events: {
    add: Function;
  };
};

export default function GeoMap() {
  const dispatch = useAppDispatch();
  const circleRef = useRef<GeoObject>();
  const mapRef = useRef<GeoObject>();

  const defaultCoordsLat = useAppSelector((state) => state.coords.latitude);
  const defaultCoordsLon = useAppSelector((state) => state.coords.longitude);
  const mapCoords = useAppSelector((state) => state.map);
  const [pageBlurBoolean, setPageBlurBoolean] = useState(true);

  const handleCircleDrag = useCallback((event: any) => {
    const { target } = event?.originalEvent ?? {};
    const coordinates = target?.geometry?.getCoordinates() as
      | [number, number]
      | undefined;

    if (coordinates) {
      dispatch(latitudeChanged(coordinates[0]));
      dispatch(longitudeChanged(coordinates[1]));
    }
  }, []);

  function handleCircle() {
    if (circleRef.current) {
      const circle = circleRef.current;
      circle.events.add("dragend", handleCircleDrag);
    }
  }

  const handleMapDrag = useCallback((event: any) => {
    const { target } = event?.originalEvent ?? {};
    const center = target?.getCenter() as [number, number] | undefined;
    if (center) {
      dispatch(mapLatitudeChanged(center[0]));
      dispatch(mapLongitudeChanged(center[1]));
    }
		console.log("boundschange");
  }, []);

  function handleMap() {
    if (mapRef.current) {
      const map = mapRef.current;
      map.events.add("boundschange", handleMapDrag);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      handleCircle();
      handleMap();
    }, 1000);
  }, [circleRef.current, mapRef.current]);

  useEffect(() => {
    setTimeout(() => setPageBlurBoolean(false), 1000);
  }, []);

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
              center: [mapCoords.latitude, mapCoords.longitude],
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
            height={"100svh"}
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
