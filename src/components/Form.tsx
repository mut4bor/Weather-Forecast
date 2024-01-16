import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { latitudeChanged, longitudeChanged } from "../redux/coordsSlice";
import {shouldCenter} from '../redux/mapSlice';
import { parseCoordinate } from "./parseCoordinate";

const textInputRegexp = /^[0-9.]*$/;

export default function Form() {
  const dispatch = useAppDispatch();
  const { latitude, longitude } = useAppSelector((state) => state.coords);

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
            labelText="Широта"
            id="lat"
            placeholder="Введите широту"
            value={latitude ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { value: fieldValue } = event.target
              if (!fieldValue) {
                dispatch(latitudeChanged(fieldValue));
                return;
              }
              if (!textInputRegexp.test(fieldValue)) return
              const value = parseCoordinate(event.target.value);
              if (value <= 90) {
                dispatch(latitudeChanged(fieldValue));
                dispatch(shouldCenter())
              }
            }}
          />
          <FormInput
            labelText="Долгота"
            id="lon"
            placeholder="Введите долготу"
            value={longitude ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const {value: fieldValue} = event.target
              if (!fieldValue) {
                dispatch(longitudeChanged(fieldValue));
                return;
              }
              // Here we are checking that string in the input value have only digits or '.' sign as decimal point.
              if (!textInputRegexp.test(fieldValue)) return
              const value = parseCoordinate(fieldValue);
							if (value <= 180) {
                dispatch(longitudeChanged(fieldValue));
                dispatch(shouldCenter())
							}
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
  placeholder: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function FormInput(props: FormInputProps) {
  const { labelText, id, placeholder, value, onChange } = props;
  return (
    <div className="flex flex-col w-[47.5%]">
      <label className=" text-white " htmlFor={id}>
        {labelText}
      </label>
      <input
        className="px-3 py-1 border rounded-md"
				autoComplete="off"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyUp={({key}) => {
          if (key === 'ArrowUp' || key === 'ArrowDown' ) {
            // You know what to do here 😉
            console.log('%c the key code -->', 'background: tomato; color: white; display: block;', key);
          }
        }}
      />
    </div>
  );
}
