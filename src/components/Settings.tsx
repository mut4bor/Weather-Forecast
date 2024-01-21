import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
	settingsToggled,
	cacheBooleanToggled,
} from '../redux/slices/settingSlice';
import { SVG } from './Weather';
import _ from 'lodash';

export default function Settings() {
	const settingsBoolean = useAppSelector(
		(state) => state.settings.settingsBoolean
	);
	const cacheBoolean = useAppSelector((state) => state.settings.cacheBoolean);

	const dispatch = useAppDispatch();
	const storedSettings = localStorage.getItem('settingsBoolean');
	const parsedSettings = storedSettings ? JSON.parse(storedSettings) : null;

	const modalValues = useAppSelector((state) => state.settings.modalValues);

	useEffect(() => {
		parsedSettings !== null && dispatch(cacheBooleanToggled(parsedSettings));
	}, []);

	return (
		<>
			<div
				className={`${
					!settingsBoolean && 'opacity-0 pointer-events-none'
				} w-[100%] h-[100%] text-white absolute left-0 top-0 bg-[#101d29] transition p-4 flex flex-col justify-between z-[2]`}
			>
				<ul>
					<li>
						<input
							id="cacheToggle"
							className="checkbox"
							type="checkbox"
							checked={cacheBoolean}
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
				</ul>
				<div className="flex justify-between w-[50%] mx-auto">
					<button
						className="border px-3 py-1 rounded bg-white w-[100%] text-[#101d29]"
						onClick={() => {
							dispatch(settingsToggled(false));
							localStorage.setItem(
								'modalPosition',
								JSON.stringify(modalValues)
							);
						}}
					>
						Сохранить
					</button>
				</div>
			</div>
		</>
	);
}

export function SettingsButton() {
	const dispatch = useAppDispatch();

	return (
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
	);
}
