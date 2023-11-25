import React, { useState } from "react";


export function ModalWindow() {
	
	const [valueLat, setvalueLat] = useState('');
	const [valueLon, setvalueLon] = useState('');
	const [Modal, setModal] = useState(true);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault()
	}

	const changeLatHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setvalueLat(event.target.value)
	}
	const changeLonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setvalueLon(event.target.value)
	}

	return (
		<>

			{Modal ? (
        <>
				<div className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"></div>
				<div className="fixed w-[500px] top-5 left-1/2 -translate-x-1/2 bg-white p-4">
				<form 
				className="flex flex-col mb-2"
				onSubmit={submitHandler}
				>
					<div className="flex flex-wrap">
						<p className=" w-full ">Введите координаты города:</p>
						<div className="flex flex-col w-1/2">
							<label htmlFor="city">Широта:</label>
							<input 
							className="px-5 py-1 border" 
							type="text" 
							id="city" 
							placeholder="Введите название города" 
							value={valueLat}
							onChange={changeLatHandler}
							/>
						</div>
						<div className="flex flex-col w-1/2">
							<label htmlFor="city">Долгота:</label>
							<input 
							className="px-5 py-1 border" 
							type="text" 
							id="city" 
							placeholder="Введите название города" 
							value={valueLon}
							onChange={changeLonHandler}
							/>
						</div>
						
					</div>
					<button 
					type="submit" 
					className="border px-5 py-1 mt-2"
					onClick={() => {
						console.log(valueLon)
						setModal(prev => !prev)
						
					}}
					>Enter</button>
				</form>
				</div>
        </>
      ) : (
        () => {}
      )}
		</>
	)

}