import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { latitudeChanged, longitudeChanged, fetchData } from "../redux/slices";

type FormProps = {
  onLatChange: (number: number) => void;
  onLonChange: (number: number) => void;
};

export default function Form(props: FormProps) {
  const dispatch = useAppDispatch();
  const inputLat = useAppSelector((state) => state.coords.latitude);
  const inputLon = useAppSelector((state) => state.coords.longitude);
  const { onLatChange, onLonChange } = props;

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const changeLatHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseCoordinate(event.target.value);
    dispatch(latitudeChanged(value));
    onLatChange(value);
  };

  const changeLonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseCoordinate(event.target.value);
    dispatch(longitudeChanged(value));
    onLonChange(value);
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={submitHandler}>
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
          type="submit"
          className=" border px-5 py-1 mt-3 text-white font-bold rounded-md"
          onClick={() => dispatch(fetchData())}
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
