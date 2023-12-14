import FormInput from "./FormInput";
import React from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { LAT, LON } from "../redux/actions";

type FormProps = {
  onLatChange: (number: number) => void;
  onLonChange: (number: number) => void;
  apiCall: () => void;
  updateMapData: (array: [number, number]) => void;
};

export default function Form(props: FormProps) {
  const dispatch = useAppDispatch();
  const inputLat = useAppSelector((state) => state.latitude);
  const inputLon = useAppSelector((state) => state.longitude);
  const { onLatChange, onLonChange, apiCall } = props;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const changeLatHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: LAT,
      payload: event.target.value,
    });
    onLatChange(parseCoordinate(event.target.value));
  };

  const changeLonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: LON,
      payload: event.target.value,
    });
    onLonChange(parseCoordinate(event.target.value));
  };

  return (
    <>
      <form className="flex flex-col " onSubmit={submitHandler}>
        <div className="flex flex-wrap justify-between">
          <FormInput
            labelText={"Широта"}
            id={"lat"}
            type={"number"}
            placeholder={"Введите широту"}
            value={inputLat}
            onChange={changeLatHandler}
          />
          <FormInput
            labelText={"Долгота"}
            id={"lon"}
            type={"number"}
            placeholder={"Введите долготу"}
            value={inputLon}
            onChange={changeLonHandler}
          />
        </div>
        <button
          type="button"
          className=" border px-5 py-1 mt-3 text-white font-bold rounded-md"
          onClick={() => {
            apiCall();
          }}
        >
          Подтвердить
        </button>
      </form>
    </>
  );
}

export function parseCoordinate(string: string): number {
  const result = parseFloat(string.trim());
  return Number.isNaN(result) ? 0 : result;
}
