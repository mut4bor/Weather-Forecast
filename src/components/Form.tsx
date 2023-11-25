import React, { useState } from "react";

type FormProps = {
	onLatChange: (string: string) => void;
	onLonChange: (string: string) => void;
	apiCall: () => void;
	setIsModalVisible: (boolean: boolean) => void
}

const Form = (props: FormProps) => {
	const [valueLat, setValueLat] = useState("");
  const [valueLon, setValueLon] = useState("");
	const isInputLatEmpty = valueLat.trim() === "";
  const isInputLonEmpty = valueLon.trim() === "";

	const { onLatChange, onLonChange, apiCall, setIsModalVisible } = props;

	const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  }

  const changeLatHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueLat(event.target.value);
		onLatChange(event.target.value);
  }

  const changeLonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueLon(event.target.value);
		onLonChange(event.target.value);
  }
  return (
    <>
      <form className="flex flex-col mb-2 " onSubmit={submitHandler}>
        <div className="flex flex-wrap">
          <p className=" w-full ">Введите координаты города:</p>
          <ul className=" flex flex-row w-full whitespace-nowrap overflow-auto gap-3 ">
            <li
              className=" bg-emerald-400 rounded-md px-4 py-1 text-white font-bold cursor-pointer "
              onClick={() => {
                setValueLat("59.901");
                setValueLon("30.2959");
								onLatChange("59.901");
								onLonChange("30.2959");
              }}
            >
              Санкт-Петербург
            </li>
            <li
              className=" bg-emerald-400 rounded-md px-4 py-1 text-white font-bold cursor-pointer "
              onClick={() => {
                setValueLat("59.013392");
                setValueLon("30.329159");
								onLatChange("59.013392");
								onLonChange("30.329159");
              }}
            >
              Москва
            </li>
            <li
              className=" bg-emerald-400 rounded-md px-4 py-1 text-white font-bold cursor-pointer "
              onClick={() => {
                setValueLat("56.8519");
                setValueLon("60.6122");
								onLatChange("56.8519");
								onLonChange("60.6122");
              }}
            >
              Екатеринбург
            </li>
            <li
              className=" bg-emerald-400 rounded-md px-4 py-1 text-white font-bold cursor-pointer "
              onClick={() => {
                setValueLat("55.0415");
                setValueLon("82.9346");
								onLatChange("55.0415");
								onLonChange("82.9346");
              }}
            >
              Новосибирск
            </li>
            <li
              className=" bg-emerald-400 rounded-md px-4 py-1 text-white font-bold cursor-pointer "
              onClick={() => {
                setValueLat("56.3287");
                setValueLon("44.002");
								onLatChange("56.3287");
								onLonChange("44.002");
              }}
            >
              Нижний Новгород
            </li>
          </ul>
          <div className="flex flex-col w-1/2">
            <label htmlFor="lat">Широта:</label>
            <input
              className="px-3 py-1 border"
              type="number"
              id="lat"
              placeholder="Введите широту"
              value={valueLat}
              onChange={changeLatHandler}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="lon">Долгота:</label>
            <input
              className="px-3 py-1 border"
              type="number"
              id="lon"
              placeholder="Введите долготу"
              value={valueLon}
              onChange={changeLonHandler}
            />
          </div>
        </div>
        <button
          type="button"
          className=" border px-5 py-1 mt-2 bg-emerald-400 text-white font-bold "
          onClick={() => {
            if (!isInputLatEmpty && !isInputLonEmpty) {
              apiCall();
            }
          }}
        >
          Подтвердить
        </button>
      </form>
    </>
  );
}
export default Form;
