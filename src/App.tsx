import "./App.css";
import Weather from "./components/Weather";
import Form from "./components/Form";
import GeoMap from "./components/GeoMap";

function App() {
  return (
    <>
      <div className=" p-6 flex flex-col flex-wrap absolute z-50 bg-[#101d29] rounded-lg right-[10px] top-[10px]">
        <Weather />
        <Form />
      </div>
      <GeoMap />
    </>
  );
}

export default App;
