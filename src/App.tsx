import './App.css';
import ModalWindow from './components/ModalWindow';
import Loading from './components/Loading';
import Weather from './components/Weather';
import Form from './components/Form';
import Settings from './components/Settings';
import GeoMap from './components/GeoMap';
import ModalWindowTemplate from './components/ModalWindowTemplate';

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
