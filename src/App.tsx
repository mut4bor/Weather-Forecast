import './App.css';
import Weather from './components/Weather';
import Form from './components/Form';
import GeoMap from './components/GeoMap';
import Loading from './components/Loading';
import Settings from './components/Settings';

function App() {
	return (
		<>
			<div className=" h-[200px] p-6 flex flex-col flex-wrap absolute z-50 bg-[#101d29] justify-between rounded-lg right-[10px] top-[10px] overflow-hidden">
				<Loading />
				<Weather />
				<Form />
				<Settings />
			</div>
			<GeoMap />
		</>
	);
}

export default App;
