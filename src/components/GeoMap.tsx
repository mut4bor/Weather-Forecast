import { useRef, useEffect, useCallback, useState } from 'react';
import { YMaps, Map, Circle } from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { parseCoordinate } from './parseCoordinate';
import { shouldNotCenter, zoomChanged } from '../redux/slices/mapSlice';
import _ from 'lodash';
type GeoObject = {
	events: {
		add: Function;
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

	const { latitude, longitude } = useAppSelector((state) => state.coords);

	const parsedLatitude = parseCoordinate(latitude);
	const parsedLongitude = parseCoordinate(longitude);
	const { centerBoolean, zoom } = useAppSelector((state) => state.map);
	const [pageLoading, setPageLoading] = useState(true);

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
			const circle = circleRef.current;
			circle.events.add('dragend', handleCircleDrag);
		}
	}

	useEffect(() => {
		setTimeout(() => {
			handleCircle();
			setPageLoading(false);
		}, 1000);
	}, []);

	useEffect(() => {
		if (mapRef.current == null) return;
		if (!centerBoolean) return;

		const mapZoom = mapRef.current.getZoom() as number;

		dispatch(zoomChanged(mapZoom));

		mapRef.current.setCenter([parsedLatitude, parsedLongitude], zoom, {
			duration: 300,
		});
	}, [mapRef.current, centerBoolean, latitude, longitude]);

	useEffect(() => {
		const dispatchShouldNotCenter = () => {
			dispatch(shouldNotCenter());
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
							zoom: zoom,
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
							geometry={[[parsedLatitude, parsedLongitude], 12000]}
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
