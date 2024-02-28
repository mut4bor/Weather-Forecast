import FormInput from './FormInput';

export default function Form() {
  return (
    <>
      <form
        className="flex flex-row justify-between mt-auto"
        onSubmit={(event: React.FormEvent) => {
          event.preventDefault();
        }}
      >
        <FormInput name="latitude" />
        <FormInput name="longitude" />
      </form>
    </>
  );
}
