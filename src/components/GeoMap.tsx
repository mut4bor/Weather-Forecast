import { useRef, useEffect, useCallback, useState } from 'react';
import { YMaps, Map, Circle } from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { latitudeChanged, longitudeChanged } from '../redux/slices/coordsSlice';
import { parseCoordinate } from './parseCoordinate';
import { shouldNotCenter } from '../redux/slices/mapSlice';

type GeoObject = {
	events: {
		add: Function;
	};
};

type MapObject = {
	events: {
		add: Function;
	};
	// https://yandex.com/dev/jsapi-v2-1/doc/en/v2-1/ref/reference/Map#setCenter
	setCenter: Function;
};

export default function GeoMap() {
	const dispatch = useAppDispatch();
	const circleRef = useRef<GeoObject>();
	const mapRef = useRef<MapObject>();

	const defaultCoordsLat = useAppSelector((state) =>
		parseCoordinate(state.coords.latitude)
	);
	const defaultCoordsLon = useAppSelector((state) =>
		parseCoordinate(state.coords.longitude)
	);
	const mapCoords = useAppSelector((state) => state.coords);
	const shouldCenter = useAppSelector((state) => state.map.center);
	const [pageBlurBoolean, setPageBlurBoolean] = useState(true);

	const handleCircleDrag = useCallback((event: any) => {
		const { target } = event?.originalEvent ?? {};
		const coordinates = target?.geometry?.getCoordinates() as
			| [number, number]
			| undefined;

		if (coordinates) {
			dispatch(latitudeChanged(coordinates[0].toString()));
			dispatch(longitudeChanged(coordinates[1].toString()));
		}
	}, []);

	function handleCircle() {
		if (circleRef.current) {
			const circle = circleRef.current;
			circle.events.add('dragend', handleCircleDrag);
		}
	}

	useEffect(() => {
		setTimeout(() => {
			handleCircle();
		}, 1000);
	}, []);

	useEffect(() => {
		if (mapRef.current == null) return;
		if (!shouldCenter) return;
		const map = mapRef.current;

		map.setCenter(
			[
				parseCoordinate(mapCoords.latitude),
				parseCoordinate(mapCoords.longitude),
			],
			9,
			{
				duration: 300,
			}
		);

		setTimeout(() => dispatch(shouldNotCenter()), 1000);
	}, [mapRef.current, shouldCenter]);

	useEffect(() => {
		setTimeout(() => setPageBlurBoolean(false), 1000);
	}, []);

	return (
		<>
			<div
				className={`${
					pageBlurBoolean ? 'blur pointer-events-none' : ''
				} transition ease-out`}
			>
				<YMaps>
					<Map
						defaultState={{
							center: [
								parseCoordinate(mapCoords.latitude),
								parseCoordinate(mapCoords.longitude),
							],
							zoom: 9,
							controls: ['zoomControl'],
						}}
						options={{
							minZoom: 3,
							maxZoom: 23,
						}}
						modules={['control.ZoomControl']}
						width={'100%'}
						height={'100svh'}
						instanceRef={mapRef as any}
					>
						<Circle
							geometry={[[defaultCoordsLat, defaultCoordsLon], 12000]}
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
