import loading from '../icons/loading.svg';
import { useAppSelector } from '../redux/hooks';

export default function Loading() {
	const loadingState = useAppSelector((state) => state.weather.loading);
	return (
		<>
			<div
				className={`${
					loadingState == 'fulfilled' && 'opacity-0'
				} w-[100%] h-[100%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex justify-center items-center bg-[#000]/50 z-[1] transition duration-300 delay-150 pointer-events-none`}
			>
				<img src={loading} alt="loading" className="w-[50px]" />
			</div>
		</>
	);
}
