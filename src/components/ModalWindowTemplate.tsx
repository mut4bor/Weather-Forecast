import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { modalPositionChanged } from '../redux/slices/settingSlice';
import _ from 'lodash';
export default function ModalWindowTemplate() {
	return (
		<>
			<ModalPreview
				position={{
					vertical: 'top',
					horizontal: 'right',
				}}
			/>
			<ModalPreview
				position={{
					vertical: 'top',
					horizontal: 'left',
				}}
			/>
			<ModalPreview
				position={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
			/>
			<ModalPreview
				position={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
			/>
		</>
	);
}

type ModalPreviewProps = {
	position: {
		vertical: string;
		horizontal: string;
	};
};

export function ModalPreview(props: ModalPreviewProps) {
	const dispatch = useAppDispatch();
	const settingsBoolean = useAppSelector(
		(state) => state.settings.settingsBoolean
	);

	const modalPosition = useAppSelector((state) => state.settings.modalPosition);

	const { vertical, horizontal } = props.position;

	return (
		<button
			className={`
			${!settingsBoolean ? 'opacity-0 pointer-events-none' : ''}
			${vertical === 'top' ? `top-[10px]` : `bottom-[10px]`}
			${horizontal === 'left' ? `left-[10px]` : `right-[10px]`}
			w-[500px] h-[200px] absolute rounded-lg bg-green-700/[40%] transition max-[1023px]:hidden`}
			title={`${vertical === 'top' ? 'Сверху' : 'Снизу'}, ${
				horizontal === 'left' ? 'слева' : 'справа'
			}`}
			type="button"
			disabled={!settingsBoolean}
			onClick={() => {
				dispatch(
					modalPositionChanged({
						...modalPosition,
						vertical: vertical,
						horizontal: horizontal,
					})
				);
			}}
		></button>
	);
}
