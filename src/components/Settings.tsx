import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
	settingsToggled,
	cacheBooleanToggled,
	modalPositionChanged,
} from '../redux/slices/settingSlice';
import { SVG } from './Weather';
import _ from 'lodash';

export default function Settings() {
	const dispatch = useAppDispatch();
	const settingsBoolean = useAppSelector(
		(state) => state.settings.settingsBoolean
	);
	const cacheBoolean = useAppSelector((state) => state.settings.cacheBoolean);

	const storedSettings = localStorage.getItem('settingsBoolean');
	const parsedSettings = storedSettings ? JSON.parse(storedSettings) : null;

	const modalPosition = useAppSelector((state) => state.settings.modalPosition);

	useEffect(() => {
		parsedSettings !== null && dispatch(cacheBooleanToggled(parsedSettings));
	}, []);

	return (
		<>
			<div
				className={`${
					!settingsBoolean ? 'opacity-0 pointer-events-none' : ''
				} w-[100%] h-[100%] text-white absolute left-0 top-0 bg-[#101d29] transition p-4 flex flex-col justify-between z-[2]`}
			>
				<ul>
					<li>
						<input
							id="cacheToggle"
							className="checkbox"
							type="checkbox"
							checked={cacheBoolean}
							disabled={!settingsBoolean}
							onChange={() => {
								dispatch(cacheBooleanToggled(!cacheBoolean));
								localStorage.setItem(
									'settingsBoolean',
									JSON.stringify(!cacheBoolean)
								);
							}}
						/>
						<label htmlFor="cacheToggle">Сохранять последний запрос</label>
					</li>
					<li className="text-[18px] mt-3 lg:hidden flex flex-col">
						<p>Позиция модального окна:</p>
						<RadioVerticalPicker value="top" />
						<RadioVerticalPicker value="bottom" />
					</li>
				</ul>

				<div className="flex justify-between w-[50%] mx-auto">
					<button
						className="border px-3 py-1 rounded bg-white w-[100%] text-[#101d29]"
						type="button"
						onClick={() => {
							dispatch(settingsToggled(false));
							localStorage.setItem(
								'modalPosition',
								JSON.stringify(modalPosition)
							);
						}}
					>
						Сохранить
					</button>
				</div>
			</div>

			<button
				className="absolute top-4 right-4"
				type="button"
				title="Настройки"
				onClick={() => {
					dispatch(settingsToggled(true));
				}}
			>
				<SVG
					href={'#settings'}
					className={'w-[25px] h-[25px]'}
					useClassName={''}
				/>
			</button>
		</>
	);
}

type RadioVerticalPickerProps = {
	value: 'top' | 'bottom';
};

export function RadioVerticalPicker(props: RadioVerticalPickerProps) {
	const dispatch = useAppDispatch();
	const modalPosition = useAppSelector((state) => state.settings.modalPosition);
	const settingsBoolean = useAppSelector(
		(state) => state.settings.settingsBoolean
	);
	return (
		<>
			<input
				checked={
					props.value === 'top'
						? modalPosition.vertical === 'top'
						: modalPosition.vertical === 'bottom'
				}
				type="radio"
				name="modalVerticalPosition"
				id={`modalVertical${props.value}`}
				className="checkbox"
				disabled={!settingsBoolean}
				onChange={() => {
					dispatch(
						modalPositionChanged({
							...modalPosition,
							vertical: props.value,
						})
					);
				}}
			/>
			<label htmlFor={`modalVertical${props.value}`}>
				{modalPosition.vertical === 'top' ? 'Сверху' : 'Снизу'}
			</label>
		</>
	);
}
