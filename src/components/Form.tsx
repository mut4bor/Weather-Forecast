import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { shouldCenter } from '../redux/slices/mapSlice';
import { parseCoordinate } from './parseCoordinate';

const textInputRegexp = /^[0-9.]*$/;

export default function Form() {
	const dispatch = useAppDispatch();
	const { latitude, longitude } = useAppSelector((state) => state.coords);

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
						id="lat"
						placeholder="Введите широту"
						value={latitude ?? ''}
						coordinate={latitude}
						onArrowUp={() => {}}
						onArrowDown={() => {}}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value: fieldValue } = event.target;
							if (!fieldValue) {
								dispatch(
									coordsChanged({
										latitude: fieldValue,
										longitude: longitude,
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
										longitude: longitude,
									})
								);
								dispatch(shouldCenter());
							}
						}}
					/>
					<FormInput
						labelText=""
						id="lon"
						placeholder="Введите долготу"
						value={longitude ?? ''}
						coordinate={longitude}
						onArrowUp={() => {}}
						onArrowDown={() => {}}
						onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							const { value: fieldValue } = event.target;
							if (!fieldValue) {
								dispatch(
									coordsChanged({
										latitude: latitude,
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
										latitude: latitude,
										longitude: fieldValue,
									})
								);
								dispatch(shouldCenter());
							}
						}}
						//! fix inputs
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
	onArrowUp: () => void;
	onArrowDown: () => void;
	coordinate: string;
};

export function FormInput(props: FormInputProps) {
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
				onKeyUp={({ key }) => {
					if (key === 'ArrowUp') {
						// You know what to do here 😉
						console.log(
							'%c the key code -->',
							'background: tomato; color: white; display: block;',
							key
						);
					}
					if (key === 'ArrowDown') {
						// You know what to do here 😉
						console.log(
							'%c the key code -->',
							'background: tomato; color: white; display: block;',
							key
						);
					}
				}}
			/>
		</div>
	);
}
