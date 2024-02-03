import FormInput from './FormInput';
import _ from 'lodash';

export default function Form() {
	return (
		<>
			<form
				className="flex flex-col"
				onSubmit={(event: React.FormEvent) => {
					event.preventDefault();
				}}
			>
				<div className="flex flex-wrap justify-between">
					<FormInput name="latitude" />
					<FormInput name="longitude" />
				</div>
			</form>
		</>
	);
}
