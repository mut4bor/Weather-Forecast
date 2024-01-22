import { useRef, useEffect, useCallback, useState } from 'react';
import { YMaps, Map, Circle } from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { parseCoordinate } from './parseCoordinate';
import { shouldNotCenter } from '../redux/slices/mapSlice';
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
};

export default function GeoMap() {
	const dispatch = useAppDispatch();
	const circleRef = useRef<GeoObject>();
	const mapRef = useRef<MapObject>();

	const coords = useAppSelector((state) => state.coords);
	
	const latitude = parseCoordinate(coords.latitude);
	const longitude = parseCoordinate(coords.longitude);
	const shouldCenter = useAppSelector((state) => state.map.center);
	const [pageLoading, setPageLoading] = useState(true);

	const handleCircleDrag = useCallback((event: any) => {
		const { target } = event?.originalEvent ?? {};
		const coordinates = target?.geometry?.getCoordinates() as
			| [number, number]
			| undefined;

		if (coordinates) {
			const roundAmount = 10000;
			const latitude = Math.round(coordinates[0] * roundAmount) / roundAmount;
			const longitude = Math.round(coordinates[1] * roundAmount) / roundAmount;
			dispatch(
				coordsChanged({
					latitude: latitude.toString(),
					longitude: longitude.toString(),
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
		}, 1000);
	}, []);

	useEffect(() => {
		if (mapRef.current == null) return;
		if (!shouldCenter) return;
		const map = mapRef.current;

		map.setCenter([latitude, longitude], 9, {
			duration: 300,
		});

		setTimeout(() => dispatch(shouldNotCenter()), 1000);
	}, [mapRef.current, shouldCenter]);

	useEffect(() => {
		setTimeout(() => setPageLoading(false), 1000);
	}, []);

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
							center: [latitude, longitude],
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
							geometry={[[latitude, longitude], 12000]}
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
