import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { YMaps, Map, Circle, RouteEditor } from "@pbe/react-yandex-maps";
//@ts-ignore
import debounce from "lodash/debounce";

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
  const updateFn = debounce(updateMapData, 300);
  const handleDragCircle = useCallback((event: any) => {
    const { target } = event?.originalEvent ?? {};
    console.log("Circle current position", target?.geometry?.getCoordinates());
    const coordinates = target?.geometry?.getCoordinates() as
      | [number, number]
      | undefined;
    if (coordinates) updateFn(coordinates);
  }, []);

  console.log("rerender");
  return (
    <>
      <ChildGeoMap handleDragCircle={handleDragCircle} />
    </>
  );
});

function ChildGeoMap(props: ChildGeoMapProps) {
  const defaultCoordsLat = 59.95338836499352;
  const defaultCoordsLon = 30.306886328124797;
  const ref = useRef<GeoObject>();
  useEffect(() => {
    setTimeout(() => {
      handleCoordinates();
    }, 1000);
  }, [ref.current]);

  function handleCoordinates() {
    if (ref.current) {
      const circle = ref.current;
      console.log("Circle default position", circle.geometry.getCoordinates());
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

function useTraceUpdate(props: any) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
      if (prev.current[k] !== v) {
        ps[k] = [prev.current[k], v];
      }
      return ps;
    }, {});
    if (Object.keys(changedProps).length > 0) {
      console.log("Changed props:", changedProps);
    }
    prev.current = props;
  });
}
