import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { latitudeChanged, longitudeChanged } from "../redux/coordsSlice";
import { inputLatitudeChanged, inputLongitudeChanged } from "../redux/mapSlice";
import { parseCoordinate } from "./parseCoordinate";

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
            placeholder={"Введите широту"}
            value={coords.latitude}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseCoordinate(event.target.value);
              if (value <= 90) {
                dispatch(latitudeChanged(value));
                dispatch(inputLatitudeChanged(value));
              }
            }}
          />
          <FormInput
            labelText={"Долгота"}
            id={"lon"}
            placeholder={"Введите долготу"}
            value={coords.longitude !== 0 ? coords.longitude : ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = parseCoordinate(event.target.value);
							if (value <= 180) {
								dispatch(longitudeChanged(value));
								dispatch(inputLongitudeChanged(value));
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
        type="number"
				autoComplete="off"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
