import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { coordsChanged } from '../redux/slices/coordsSlice';
import { parseCoordinate } from './parseCoordinate';
import FormInput from './FormInput';
import _ from 'lodash';

export default function Form() {
	const dispatch = useAppDispatch();
	const coords = useAppSelector((state) => state.coords);
	const textInputRegexp = /^[0-9.]*$/;
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
