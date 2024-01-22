import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { shouldCenter } from '../redux/slices/mapSlice';
import { parseCoordinate, roundCoordinate } from './parseCoordinate';
import { store } from '../redux/store';

const textInputRegexp = /^[0-9.]*$/;

export default function Form() {
	const dispatch = useAppDispatch();
	const coords = useAppSelector((state) => state.coords);
	const latitude = useAppSelector((state) => state.coords.latitude);

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
						labelText=""
						id="latitude"
						dispatchType="latitude"
						placeholder="Введите широту"
						value={latitude ?? ''}
						coordinate={latitude}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value: fieldValue } = event.target;
							if (!fieldValue) {
								dispatch(
									coordsChanged({
										latitude: fieldValue,
										longitude: store.getState().coords.longitude,
									})
								);
								return;
							}
							if (!textInputRegexp.test(fieldValue)) return;
							const value = parseCoordinate(event.target.value);
							if (value <= 90) {
								dispatch(
									coordsChanged({
										latitude: fieldValue,
										longitude: coords.longitude,
									})
								);
								dispatch(shouldCenter());
							}
						}}
					/>
					<FormInput
						labelText=""
						id="longitude"
						dispatchType="longitude"
						placeholder="Введите долготу"
						value={coords.longitude ?? ''}
						coordinate={coords.longitude}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value: fieldValue } = event.target;
							if (!fieldValue) {
								dispatch(
									coordsChanged({
										latitude: store.getState().coords.latitude,
										longitude: fieldValue,
									})
								);
								return;
							}
							// Here we are checking that string in the input value have only digits or '.' sign as decimal point.
							if (!textInputRegexp.test(fieldValue)) return;
							const value = parseCoordinate(fieldValue);
							if (value <= 180) {
								dispatch(
									coordsChanged({
										latitude: store.getState().coords.latitude,
										longitude: fieldValue,
									})
								);
								dispatch(shouldCenter());
							}
						}}
					/>
				</div>
			</form>
		</>
	);
}

type FormInputProps = {
	labelText: string;
	id: string;
	placeholder: string;
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	coordinate: string;
	dispatchType: string;
};

type Sign = 'plus' | 'minus'

export function FormInput(props: FormInputProps) {
	const dispatch = useAppDispatch();
	const coords = useAppSelector((state) => state.coords);
	const parsedLatitude = parseCoordinate(coords.latitude);
	const parsedLongitude = parseCoordinate(coords.longitude);
	const changeValue = 0.01;

	const getParsedAndRoundedCoord = (
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
    'ArrowUp': 'plus',
    'ArrowDown': 'minus'
  }

  const onKeyPress :React.KeyboardEventHandler = ({ key }) => {
    const action = keyActionMap[key];
    if (!action) return;

    if (props.dispatchType == 'latitude') {
      dispatch(
        coordsChanged({
          latitude: getParsedAndRoundedCoord(
            parsedLatitude,
            changeValue,
            action
          ).toString(),
          longitude: coords.longitude,
        })
      );
    }
    if (props.dispatchType == 'longitude') {
      dispatch(
        coordsChanged({
          latitude: coords.latitude,
          longitude: getParsedAndRoundedCoord(
            parsedLongitude,
            changeValue,
            action
          ).toString(),
        })
      );
    }

  }

	return (
		<div className="flex flex-col w-[47.5%]">
			<label className=" text-white " htmlFor={props.id}>
				{props.labelText}
			</label>
			<input
				className="px-3 py-1 border rounded-md disabled:bg-white"
				autoComplete="off"
				id={props.id}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
        onKeyUp={onKeyPress}
			/>
		</div>
	);
}
