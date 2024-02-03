import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { shouldCenter, shouldNotCenter } from '../redux/slices/mapSlice';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { parseCoordinate, roundCoordinate } from './parseCoordinate';
import { useEffect } from 'react';
import _ from 'lodash';

type FormInputProps = {
	name: 'latitude' | 'longitude';
};

type Sign = 'plus' | 'minus';

const textInputRegexp = /^[0-9.]*$/;

const keyActionMap: Record<string, Sign> = {
	ArrowUp: 'plus',
	ArrowDown: 'minus',
};

export default function FormInput(props: FormInputProps) {
	const dispatch = useAppDispatch();

	const center = useAppSelector((state) => state.map.center);
	const coords = useAppSelector((state) => state.coords);

	useEffect(() => {
		const dispatchShouldNotCenter = (): void => {
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
	}, [center]);

	const onKeyPress: React.KeyboardEventHandler = (event): void => {
		const { key } = event;
		
		dispatch(shouldCenter());
		const action = keyActionMap[key];
		if (!action) return;
		if (key === 'ArrowUp') {
			event.preventDefault();
		}

		const adjustCoordinate = (coord: string): string => {
			return action === 'plus'
				? roundCoordinate(parseCoordinate(coord) + 0.01, 10000).toString()
				: roundCoordinate(parseCoordinate(coord) - 0.01, 10000).toString();
		};

		if (props.name === 'latitude') {
			dispatch(
				coordsChanged({
					...coords,
					latitude: adjustCoordinate(coords.latitude),
				})
			);
			return;
		}
		if (props.name === 'longitude') {
			dispatch(
				coordsChanged({
					...coords,
					longitude: adjustCoordinate(coords.longitude),
				})
			);
			return;
		}
	};

	return (
		<input
			className="w-[47.5%] px-3 py-1 border rounded-md disabled:bg-white"
			autoComplete="off"
			name={props.name}
			placeholder={`Введите ${
				props.name === 'latitude' ? 'широту' : 'долготу'
			}`}
			value={props.name === 'latitude' ? coords.latitude : coords.longitude}
			onKeyDown={onKeyPress}
			onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
				const { value: fieldValue } = event.target;

				if (!fieldValue) {
					if (props.name === 'latitude') {
						dispatch(
							coordsChanged({
								...coords,
								latitude: fieldValue,
							})
						);
						return;
					}
					if (props.name === 'longitude') {
						dispatch(
							coordsChanged({
								...coords,
								longitude: fieldValue,
							})
						);
						return;
					}
				}

				if (!textInputRegexp.test(fieldValue)) return;

				const parsedValue = parseCoordinate(event.target.value);

				if (parsedValue <= (props.name === 'latitude' ? 90 : 180)) {
					if (props.name === 'latitude') {
						dispatch(
							coordsChanged({
								...coords,
								latitude: fieldValue,
							})
						);
						return;
					}
					if (props.name === 'longitude') {
						dispatch(
							coordsChanged({
								...coords,
								longitude: fieldValue,
							})
						);
						return;
					}
				}
			}}
		/>
	);
}