import { useAppDispatch, useAppSelector } from "../reduxfiles/hooks";
import { latitudeChanged, longitudeChanged } from "../reduxfiles/coordsSlice";
import { fetchData } from "../reduxfiles/weatherSlice";
import { useEffect } from "react";
export default function Form() {
  const dispatch = useAppDispatch();
  const coords = useAppSelector((state) => state.coords);

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
            type={"number"}
            placeholder={"Введите широту"}
            value={coords.latitude}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseCoordinate(event.target.value);
              dispatch(latitudeChanged(value));
            }}
          />
          <FormInput
            labelText={"Долгота"}
            id={"lon"}
            type={"number"}
            placeholder={"Введите долготу"}
            value={coords.longitude}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseCoordinate(event.target.value);
              dispatch(longitudeChanged(value));
            }}
          />
        </div>
        <button
          type="submit"
          className=" border px-5 py-1 mt-3 text-white font-bold rounded-md"
          onClick={() => {
            dispatch(
              fetchData({
                latitude: coords.latitude,
                longitude: coords.longitude,
              })
            );
          }}
        >
          Подтвердить
        </button>
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
