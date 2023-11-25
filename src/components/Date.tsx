import React, { useState, useEffect } from "react";

function TodayDate() {

  function getDate() {
    const today = new Date();
    const monthNames = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];
    const month = monthNames[today.getMonth()];
    const date = today.getDate();
    const hour = today.getHours();
		const minutes = today.getMinutes();
		const seconds = today.getSeconds();
    return `${date} ${month}, ${hour}:${minutes}`;
  }

  const [currentDate, setCurrentDate] = useState(getDate());

  useEffect(() => {
    const interval = setInterval(() => setCurrentDate(getDate()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="text-white">{currentDate}</div>;
}

export default TodayDate;
