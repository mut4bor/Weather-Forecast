import { useRef, useEffect, useCallback, useState } from 'react';
import { YMaps, Map, Circle } from '@pbe/react-yandex-maps';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { parseCoordinate } from './parseCoordinate';
import { centerBooleanToggle, zoomChanged } from '../redux/slices/mapSlice';
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
	const [circleSize, setCircleSize] = useState(12000);

	const { latitude, longitude } = useAppSelector((state) => state.coords);
	const { centerBoolean, zoom } = useAppSelector((state) => state.map);

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

	useEffect(() => {
		setTimeout(() => {
			handleCircle();
			setPageLoading(false);
		}, 1000);
	}, []);

	useEffect(() => {
		if (mapRef.current == null) return;
		if (!centerBoolean) return;

		mapRef.current.setCenter([parsedLatitude, parsedLongitude], zoom, {
			duration: 300,
		});
		getCircleSize();
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

	//! андрей, приветик, сюда не смотри пока, еще не доделал
	const getCircleSize = () => {
		switch (zoom) {
			case 3:
				setCircleSize(360000);
				break;
			case 4:
				setCircleSize(240000);
				break;
			case 5:
				setCircleSize(80000);
				break;
			case 6:
				setCircleSize(40000);
				break;
			case 7:
				setCircleSize(24000);
				break;
			case 8:
				setCircleSize(12000);
				break;
			case 9:
				setCircleSize(6000);
				break;
			case 10:
				setCircleSize(3000);
				break;
			case 11:
				setCircleSize(3000);
				break;

			default:
				setCircleSize(6000);
				break;
		}
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
							zoom: zoom,
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
							geometry={[[parsedLatitude, parsedLongitude], 80000]}
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
