import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { modalValuesChanged } from '../redux/slices/settingSlice';
export default function ModalWindowTemplate() {
	return (
		<>
			<ModalPreview
				position={{
					modalFirstValue: 'top-[10px]',
					modalSecondValue: 'right-[10px]',
				}}
			/>
			<ModalPreview
				position={{
					modalFirstValue: 'top-[10px]',
					modalSecondValue: 'left-[10px]',
				}}
			/>
			<ModalPreview
				position={{
					modalFirstValue: 'bottom-[10px]',
					modalSecondValue: 'right-[10px]',
				}}
			/>
			<ModalPreview
				position={{
					modalFirstValue: 'bottom-[10px]',
					modalSecondValue: 'left-[10px]',
				}}
			/>
		</>
	);
}

type ModalPreviewProps = {
	position: {
		modalFirstValue: string;
		modalSecondValue: string;
	};
};

export function ModalPreview(props: ModalPreviewProps) {
	const dispatch = useAppDispatch();
	const settingsBoolean = useAppSelector(
		(state) => state.settings.settingsBoolean
	);

	return (
		<button
			className={`
			${props.position.modalFirstValue}
			${props.position.modalSecondValue}
			${
				settingsBoolean === false ? 'opacity-0 pointer-events-none' : ''
			} w-[500px] h-[200px] absolute rounded-lg bg-green-700/[40%] transition`}
			title={`${props.position.modalFirstValue}, ${props.position.modalSecondValue}`}
			type="button"
			onClick={() => {
				dispatch(
					modalValuesChanged({
						modalFirstValue: props.position.modalFirstValue,
						modalSecondValue: props.position.modalSecondValue,
					})
				);
			}}
		></button>
	);
}
