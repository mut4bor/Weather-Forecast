import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';
import { modalPositionChanged } from '../redux/slices/settingSlice';

export default function ModalWindow(props: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const modalPosition = useAppSelector((state) => state.settings.modalPosition);
  const { vertical, horizontal } = modalPosition;

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
				${vertical === 'top' ? `top-[10px]` : `bottom-[10px]`}
				${horizontal === 'left' ? `left-[10px]` : `right-[10px]`}
				lg:w-[500px] max-[1023px]:w-[calc(100%-20px)] min-h-[200px] absolute flex flex-col flex-wrap p-6 gap-2 z-50 bg-[#101d29] overflow-hidden rounded-lg`}
      >
        {props.children}
      </div>
    </>
  );
}
