import { useRef, useEffect, useCallback } from "react";
import { YMaps, Map, Circle } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { latitudeChanged, longitudeChanged } from "../redux/coordsSlice";

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
  const ref = useRef<GeoObject>();
  const defaultCoordsLat = useAppSelector((state) => state.coords.latitude);
  const defaultCoordsLon = useAppSelector((state) => state.coords.longitude);

  const handleDragCircle = useCallback((event: any) => {
    const { target } = event?.originalEvent ?? {};
    const coordinates = target?.geometry?.getCoordinates() as
      | [number, number]
      | undefined;
    if (coordinates) {
      dispatch(latitudeChanged(coordinates[0].toFixed(4)));
      dispatch(longitudeChanged(coordinates[1].toFixed(4)));
    }
  }, []);

  function handleCoordinates() {
    if (ref.current) {
      const circle = ref.current;
      circle.events.add("dragend", handleDragCircle);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleCoordinates();
    }, 1000);
  }, [ref.current]);

  return (
    <>
      <YMaps>
        <Map
          defaultState={{
            center: [defaultCoordsLat, defaultCoordsLon],
            zoom: 9,
            controls: ["zoomControl"],
          }}
          modules={["control.ZoomControl"]}
          width={"100%"}
          height={"100vh"}
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
            instanceRef={ref as any}
          />
        </Map>
      </YMaps>
    </>
  );
}

export default GeoMap;
