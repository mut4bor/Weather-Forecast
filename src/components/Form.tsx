import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { shouldCenter, shouldNotCenter } from '../redux/slices/mapSlice';
import { parseCoordinate, roundCoordinate } from './parseCoordinate';
import { useEffect } from 'react';
import _ from 'lodash';

const textInputRegexp = /^[0-9.]*$/;

export default function Form() {
	const dispatch = useAppDispatch();
	const coords = useAppSelector((state) => state.coords);

	return (
		<>
			<form
				className="flex flex-col"
				onSubmit={(event: React.FormEvent) => {
					event.preventDefault();
				}}
			>
				<div className="flex flex-wrap justify-between">
					<FormInput
						name="latitude"
						placeholder="Введите широту"
						value={coords.latitude ?? ''}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value: fieldValue } = event.target;
							if (!fieldValue) {
								dispatch(
									coordsChanged({
										...coords,
										latitude: fieldValue,
									})
								);
								return;
							}
							if (!textInputRegexp.test(fieldValue)) return;
							const parsedValue = parseCoordinate(event.target.value);
							if (parsedValue <= 90) {
								dispatch(
									coordsChanged({
										...coords,
										latitude: fieldValue,
									})
								);
							}
						}}
					/>
					<FormInput
						name="longitude"
						placeholder="Введите долготу"
						value={coords.longitude ?? ''}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value: fieldValue } = event.target;
							if (!fieldValue) {
								dispatch(
									coordsChanged({
										...coords,
										longitude: fieldValue,
									})
								);
								return;
							}
							if (!textInputRegexp.test(fieldValue)) return;
							const parsedValue = parseCoordinate(fieldValue);
							if (parsedValue <= 180) {
								dispatch(
									coordsChanged({
										...coords,
										longitude: fieldValue,
									})
								);
							}
						}}
					/>
				</div>
			</form>
		</>
	);
}

type FormInputProps = {
	name: string;
	placeholder: string;
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

type Sign = 'plus' | 'minus';

export function FormInput(props: FormInputProps) {
	const dispatch = useAppDispatch();

	const center = useAppSelector((state) => state.map.center);
	const coords = useAppSelector((state) => state.coords);
	const { latitude, longitude } = useAppSelector((state) => state.coords);
	const parsedLatitude = parseCoordinate(latitude);
	const parsedLongitude = parseCoordinate(longitude);
	const changeValue = 0.01;

	const adjustCoordinate = (
		parsedCoord: number,
		changeValue: number,
		sign: Sign
	): number => {
		if (sign === 'plus') {
			return roundCoordinate(parsedCoord + changeValue, 10000);
		}
		return roundCoordinate(parsedCoord - changeValue, 10000);
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
		dispatch(shouldCenter());
		const action = keyActionMap[key];
		if (!action) return;

		if (props.name === 'latitude') {
			dispatch(
				coordsChanged({
					...coords,
					latitude: adjustCoordinate(
						parsedLatitude,
						changeValue,
						action
					).toString(),
				})
			);
		}
		if (props.name === 'longitude') {
			dispatch(
				coordsChanged({
					...coords,
					longitude: adjustCoordinate(
						parsedLongitude,
						changeValue,
						action
					).toString(),
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
