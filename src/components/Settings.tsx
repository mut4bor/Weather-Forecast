import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {
	settingsToggle,
	cacheBooleanToggle,
} from '../redux/slices/settingSlice';
import { SVG } from './Weather';
import _ from 'lodash';

export default function Settings() {
	const settingsBoolean = useAppSelector(
		(state) => state.settings.settingsBoolean
	);
	const cacheBoolean = useAppSelector((state) => state.settings.cacheBoolean);

	const dispatch = useAppDispatch();
	const storedSettings = localStorage.getItem('settings');
	const parsedSettings = storedSettings ? JSON.parse(storedSettings) : null;

	useEffect(() => {
		parsedSettings !== null && dispatch(cacheBooleanToggle(parsedSettings));
	}, []);

	return (
		<>
			<button
				className="absolute top-4 right-4 z-10"
				type="button"
				onClick={() => {
					dispatch(settingsToggle(!settingsBoolean));
				}}
			>
				<SVG
					href={'#settings'}
					className={'w-[25px] h-[25px]'}
					useClassName={''}
				></SVG>
			</button>
			<div
				className={`${
					settingsBoolean ? '' : 'opacity-0 pointer-events-none'
				} w-[100%] h-[100%] text-white absolute left-0 top-0 bg-[#101d29] transition p-4`}
			>
				<ul>
					<li>
						<label htmlFor="cacheToggle">Сохранять последний запрос</label>
						<input
							id="cacheToggle"
							type="checkbox"
							checked={cacheBoolean}
							onChange={() => {
								dispatch(cacheBooleanToggle(!cacheBoolean));
								localStorage.setItem('settings', JSON.stringify(!cacheBoolean));
							}}
						/>
					</li>
					<li>
						<button
							type="button"
							onClick={() => {
								localStorage.clear();
							}}
						>
							Очистить кэш
						</button>
					</li>
					<li>
						<button type="button" onClick={() => {}}>
							Положение окна
						</button>
					</li>
				</ul>
			</div>
		</>
	);
}
