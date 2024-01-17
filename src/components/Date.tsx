import { useState, useEffect } from 'react';

function TodayDate() {
	function getDate() {
		const today = new Date();
		const hour =
			today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
		const minutes =
			today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
		return `Сейчас ${hour}:${minutes}`;
	}

	const [currentDate, setCurrentDate] = useState(getDate());

	useEffect(() => {
		const interval = setInterval(() => setCurrentDate(getDate()), 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return <span className="text-white">{currentDate}</span>;
}

export default TodayDate;
