import React, {FunctionComponent as FC, useState} from "react";
import './weatherDataBlock.css'

const WeatherDataBlock:FC = () => {
	const [temperature, setTemperature] = useState(12)
	const [humidity, setHumidity] = useState(87)


	return (
		<div className="block">
			<div className="temperature">{temperature}°</div>
			<div className="block-1">
				<div className="wind">Wind: E 7km/h</div>
				<div className="Humidity">Humidity: {humidity}%</div>
			</div>
			<div className="block-2">
				<div className="day-1">Tue  <strong> 21°/9°</strong></div>
				<div className="day-2">Wed  <strong> 23°/10°</strong></div>
			</div>
		</div>
	)
}

export default WeatherDataBlock