import { useRef, useEffect, useCallback, useState } from 'react';
import { YMaps, Map, Circle } from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { parseCoordinate } from './parseCoordinate';
import {
  centerBooleanToggle,
  zoomChanged,
  circleSizeChanged,
} from '../redux/slices/mapSlice';
import _ from 'lodash';

type GeoObject = {
  events: {
    add: Function;
  };
  geometry: {
    circle: Function;
  };
};

type MapObject = {
  events: {
    add: Function;
  };
  setCenter: Function;
  getZoom: Function;
};

export default function GeoMap() {
  const dispatch = useAppDispatch();
  const circleRef = useRef<GeoObject>();
  const mapRef = useRef<MapObject>();

  const [pageLoading, setPageLoading] = useState(true);

  const { latitude, longitude } = useAppSelector((state) => state.coords);
  const { centerBoolean, zoom } = useAppSelector((state) => state.map);
  const circleSize = useAppSelector((state) => state.map.circleSize);

  const parsedLatitude = parseCoordinate(latitude);
  const parsedLongitude = parseCoordinate(longitude);

  const handleCircleDrag = useCallback((event: any) => {
    const { target } = event?.originalEvent ?? {};
    const coordinates = target?.geometry?.getCoordinates() as
      | [number, number]
      | undefined;

    if (coordinates) {
      const roundAmount = 10000;
      const roundedLatitude =
        Math.round(coordinates[0] * roundAmount) / roundAmount;
      const roundedLongitude =
        Math.round(coordinates[1] * roundAmount) / roundAmount;
      dispatch(
        coordsChanged({
          latitude: roundedLatitude.toString(),
          longitude: roundedLongitude.toString(),
        })
      );
    }
  }, []);

  function handleCircle() {
    if (circleRef.current) {
      circleRef.current.events.add('dragend', handleCircleDrag);
    }
  }

  function handleMap() {
    if (mapRef.current) {
      mapRef.current.events.add('actionend', () => {
        if (mapRef.current) {
          dispatch(zoomChanged(mapRef.current.getZoom()));
        }
      });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      handleCircle();
      handleMap();
      setPageLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (mapRef.current == null) return;
    if (!centerBoolean) return;

    mapRef.current.setCenter([parsedLatitude, parsedLongitude], zoom, {
      duration: 300,
    });
  }, [mapRef.current, centerBoolean, latitude, longitude]);

  useEffect(() => {
    const dispatchShouldNotCenter = () => {
      dispatch(centerBooleanToggle(false));
    };
    const debouncedDispatchShouldNotCenter = _.debounce(
      dispatchShouldNotCenter,
      300
    );
    debouncedDispatchShouldNotCenter();
    return () => {
      debouncedDispatchShouldNotCenter.cancel();
    };
  }, [centerBoolean]);

  const handleCircleSize = (zoom: number) => {
    const zoomMap = {
      3: 360000,
      4: 160000,
      5: 80000,
      6: 40000,
      7: 24000,
      8: 12000,
      9: 6000,
      10: 3000,
      11: 2000,
    } as Record<number, number>;
    return zoomMap[zoom];
  };

  return (
    <>
      <div
        className={`${
          pageLoading ? 'blur pointer-events-none' : ''
        } transition ease-out`}
      >
        <YMaps>
          <Map
            defaultState={{
              center: [parsedLatitude, parsedLongitude],
              zoom: 9,
              controls: ['zoomControl'],
            }}
            options={{
              minZoom: 3,
              maxZoom: 11,
            }}
            modules={['control.ZoomControl']}
            width={'100%'}
            height={'100svh'}
            instanceRef={mapRef as any}
          >
            <Circle
              geometry={[
                [parsedLatitude, parsedLongitude],
                handleCircleSize(zoom),
              ]}
              options={{
                draggable: true,
                fillColor: '#DB709377',
                strokeColor: '#990066',
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
