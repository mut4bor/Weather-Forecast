import './App.css';
import Weather from './components/Weather';
import Form from './components/Form';
import GeoMap from './components/GeoMap';
import Loading from './components/Loading';
import Settings from './components/Settings';
import ModalWindowTemplate from './components/ModalWindowTemplate';
import ModalWindow from './components/ModalWindow';

function App() {
	return (
		<>
			<ModalWindow>
				<Loading />
				<Weather />
				<Form />
				<Settings />
			</ModalWindow>
			<GeoMap />
			<ModalWindowTemplate />
		</>
	);
}

export default App;
