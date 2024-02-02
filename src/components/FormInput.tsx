import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { shouldCenter, shouldNotCenter } from '../redux/slices/mapSlice';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { parseCoordinate, roundCoordinate } from './parseCoordinate';
import { useEffect } from 'react';
import _ from 'lodash';

type FormInputProps = {
	name: string;
	placeholder: string;
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type Sign = 'plus' | 'minus';

export default function FormInput(props: FormInputProps) {
	const dispatch = useAppDispatch();

	const center = useAppSelector((state) => state.map.center);
	const coords = useAppSelector((state) => state.coords);

	const adjustCoordinate = (
		parsedCoord: number,
		changeValue: number,
		sign: Sign
	): number => {
		return sign === 'plus'
			? roundCoordinate(parsedCoord + changeValue, 10000)
			: roundCoordinate(parsedCoord - changeValue, 10000);
	};

	const keyActionMap: Record<string, Sign> = {
		ArrowUp: 'plus',
		ArrowDown: 'minus',
	};

	const dispatchShouldNotCenter = () => {
		dispatch(shouldNotCenter());
	};

	useEffect(() => {
		const debouncedDispatchShouldNotCenter = _.debounce(
			dispatchShouldNotCenter,
			300
		);
		debouncedDispatchShouldNotCenter();
		return () => {
			debouncedDispatchShouldNotCenter.cancel();
		};
	}, [center]);

	const onKeyPress: React.KeyboardEventHandler = ({ key }) => {
		const action = keyActionMap[key];
		if (!action) return;
		dispatch(shouldCenter());

		const parsedLatitude = parseCoordinate(coords.latitude);
		const parsedLongitude = parseCoordinate(coords.longitude);
		const changeValue = 0.01;

		const adjustedAndStringifiedLatitude = adjustCoordinate(
			parsedLatitude,
			changeValue,
			action
		).toString();

		const adjustedAndStringifiedLongitude = adjustCoordinate(
			parsedLongitude,
			changeValue,
			action
		).toString();

		if (props.name === 'latitude') {
			dispatch(
				coordsChanged({
					...coords,
					latitude: adjustedAndStringifiedLatitude,
				})
			);
		}
		if (props.name === 'longitude') {
			dispatch(
				coordsChanged({
					...coords,
					longitude: adjustedAndStringifiedLongitude,
				})
			);
		}
	};

	return (
		<input
			className="w-[47.5%] px-3 py-1 border rounded-md disabled:bg-white"
			autoComplete="off"
			name={props.name}
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
			onKeyDown={onKeyPress}
		/>
	);
}
