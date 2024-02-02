import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { modalPositionChanged } from '../redux/slices/settingSlice';
import { useEffect, useState } from 'react';
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

	return (
		<button
			className={`
			${!settingsBoolean ? 'opacity-0 pointer-events-none' : ''}
			w-[500px] h-[200px] absolute rounded-lg bg-green-700/[40%] transition max-[1023px]:hidden`}
			style={{
				top:
					props.position.vertical === 'top' ? modalPosition.value : undefined,
				bottom:
					props.position.vertical === 'bottom'
						? modalPosition.value
						: undefined,
				left:
					props.position.horizontal === 'left'
						? modalPosition.value
						: undefined,
				right:
					props.position.horizontal === 'right'
						? modalPosition.value
						: undefined,
			}}
			title={`${props.position.vertical}, ${props.position.horizontal}`}
			type="button"
			disabled={!settingsBoolean}
			onClick={() => {
				dispatch(
					modalPositionChanged({
						...modalPosition,
						vertical: props.position.vertical,
						horizontal: props.position.horizontal,
					})
				);
			}}
		></button>
	);
}
