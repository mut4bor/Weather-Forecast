import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { latitudeChanged, longitudeChanged } from "../redux/coordsSlice";
import { useState } from "react";

export default function Form() {
  const dispatch = useAppDispatch();
  const coords = useAppSelector((state) => state.coords);
	const [inputLat, setInputLat] = useState(coords.latitude.toString())
	const [inputLon, setInputLon] = useState(coords.longitude.toString())


  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
        }}
      >
        <div className="flex flex-wrap justify-between">
          <FormInput
            labelText={"Широта"}
            id={"lat"}
            type={"text"}
            placeholder={"Введите широту"}
            value={inputLat}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setInputLat(event.target.value)
              const value = parseCoordinate(event.target.value);
              dispatch(latitudeChanged(value));
            }}
          />
          <FormInput
            labelText={"Долгота"}
            id={"lon"}
            type={"text"}
            placeholder={"Введите долготу"}
            value={inputLon}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
							setInputLon(event.target.value)
              const value = parseCoordinate(event.target.value);
              dispatch(longitudeChanged(value));
            }}
          />
        </div>
      </form>
    </>
  );
}

type FormInputProps = {
  labelText: string;
  id: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormInput(props: FormInputProps) {
  const { labelText, id, type, placeholder, value, onChange } = props;
  return (
    <div className="flex flex-col w-[47.5%]">
      <label className=" text-white " htmlFor={id}>
        {labelText}
      </label>
      <input
        className="px-3 py-1 border rounded-md"
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export function parseCoordinate(string: string): number {
  const result = parseFloat(string.trim());
  return Number.isNaN(result) ? 0 : result;
}
