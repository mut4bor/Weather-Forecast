import { useRef, useEffect, useCallback, memo } from "react";
import { YMaps, Map, Circle, RouteEditor } from "@pbe/react-yandex-maps";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type GeoMapProps = {
  updateMapData: (array: [number, number]) => void;
};

type ChildGeoMapProps = {
  handleDragCircle: (array: [number, number]) => void;
};

type GeoObject = {
  events: {
    add: Function;
  };
  geometry: {
    getCoordinates: () => [number, number];
  };
};

export default memo(function GeoMap(props: GeoMapProps) {
  const { updateMapData } = props;
  const dispatch = useAppDispatch();

  const handleDragCircle = useCallback((event: any) => {
    const { target } = event?.originalEvent ?? {};
    const coordinates = target?.geometry?.getCoordinates() as
      | [number, number]
      | undefined;
    if (coordinates) {
      updateMapData(coordinates);
      dispatch({ type: "coords/latitude", payload: coordinates[0].toFixed(4)});
      dispatch({ type: "coords/longitude", payload: coordinates[1].toFixed(4)});
    }
  }, []);

  return (
    <>
      <ChildGeoMap handleDragCircle={handleDragCircle} />
    </>
  );
});

function ChildGeoMap(props: ChildGeoMapProps) {
  const defaultCoordsLat = useAppSelector((state) => state.coords.latitude);
  const defaultCoordsLon = useAppSelector((state) => state.coords.longitude);

  const ref = useRef<GeoObject>();
  useEffect(() => {
    setTimeout(() => {
      handleCoordinates();
    }, 1000);
  }, [ref.current]);

  function handleCoordinates() {
    if (ref.current) {
      const circle = ref.current;
      circle.events.add("dragend", props.handleDragCircle);
    }
  }

  return (
    <>
      <YMaps>
        <Map
          defaultState={{
            center: [defaultCoordsLat, defaultCoordsLon],
            zoom: 9,
            controls: ["zoomControl", "fullscreenControl"],
          }}
          modules={["control.ZoomControl", "control.FullscreenControl"]}
          width={"100%"}
          height={"100vh"}
        >
          <RouteEditor />
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