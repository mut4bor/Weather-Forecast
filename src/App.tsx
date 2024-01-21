import './App.css';
import Weather from './components/Weather';
import Form from './components/Form';
import GeoMap from './components/GeoMap';
import Loading from './components/Loading';
import Settings from './components/Settings';
import { SettingsButton } from './components/Settings';
import ModalWindowTemplate from './components/ModalWindowTemplate';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { useEffect } from 'react';
import { modalValuesChanged } from './redux/slices/settingSlice';

function App() {
	const dispatch = useAppDispatch();
	const modalPosition = useAppSelector((state) => state.settings.modalValues);

	const storedModalPosition = localStorage.getItem('modalPosition');
	const parsedModalPosition = storedModalPosition
		? JSON.parse(storedModalPosition)
		: null;
	useEffect(() => {
		if (parsedModalPosition !== null) {
			console.log(parsedModalPosition);
			dispatch(
				modalValuesChanged({
					modalFirstValue: parsedModalPosition.modalFirstValue,
					modalSecondValue: parsedModalPosition.modalSecondValue,
				})
			);
		}
	}, []);

	return (
		<>
			<div
				className={`absolute ${modalPosition.modalFirstValue} ${modalPosition.modalSecondValue} flex flex-col flex-wrap p-6 justify-between z-50 bg-[#101d29] overflow-hidden w-[500px] h-[200px] rounded-lg`}
			>
				<Loading />
				<Weather />
				<Form />
				<Settings />
				<SettingsButton />
			</div>
			<GeoMap />
			<ModalWindowTemplate />
		</>
	);
}

export default App;
