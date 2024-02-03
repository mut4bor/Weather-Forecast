import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { modalPositionChanged } from '../redux/slices/settingSlice';

type ModalWindowProps = {
	children: React.ReactNode;
};

export default function ModalWindow(props: ModalWindowProps) {
	const dispatch = useAppDispatch();
	const modalPosition = useAppSelector((state) => state.settings.modalPosition);
	const { vertical, horizontal, value } = modalPosition;

	const storedModalPosition = localStorage.getItem('modalPosition');
	const parsedModalPosition = storedModalPosition
		? JSON.parse(storedModalPosition)
		: null;

	useEffect(() => {
		if (parsedModalPosition !== null) {
			dispatch(
				modalPositionChanged({
					...modalPosition,
					vertical: parsedModalPosition.vertical,
					horizontal: parsedModalPosition.horizontal,
				})
			);
		}
	}, []);

	return (
		<>
			<div
				id="modalWindow"
				className={`
				${vertical === 'top' ? `top-[${value}]` : `bottom-[${value}]`}
				${horizontal === 'left' ? `left-[${value}]` : `right-[${value}]`}
				lg:w-[500px] max-[1023px]:w-[calc(100%-20px)] min-h-[200px] absolute flex flex-col flex-wrap p-6 justify-between z-50 bg-[#101d29] overflow-hidden rounded-lg`}
			>
				{props.children}
			</div>
		</>
	);
}
