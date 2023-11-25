import React, { useState } from "react";
import { YMaps, Map, Circle, RouteEditor } from "@pbe/react-yandex-maps";


const MapA = () => {

	return (
		<>
			<YMaps>
				<Map
					defaultState={{
						center: [59.901, 30.2959],
						zoom: 10,
						controls: ["zoomControl", "fullscreenControl"],
					}}
					modules={["control.ZoomControl", "control.FullscreenControl"]}
					width={'100%'}
					height={'500px'}
				>
					 <RouteEditor />
					<Circle
						geometry={[[59.901, 30.2959], 4000]}
						options={{
							draggable: true,
							fillColor: "#DB709377",
							strokeColor: "#990066",
							strokeOpacity: 0.8,
							strokeWidth: 5,
						}}
					/>
				</Map>
			</YMaps>
		</>
	)
}
export default MapA;
