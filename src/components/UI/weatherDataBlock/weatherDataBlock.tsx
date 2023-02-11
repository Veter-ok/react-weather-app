import React, {FunctionComponent as FC, useContext, useEffect, useState} from "react";
import './weatherDataBlock.css'
import { WeatherDataContext } from "../../../App";


const WeatherDataBlock:FC = () => {
	const [indexOfDate, setIndexOfDate] = useState(0)
	const {times, temperatures, humidity, windSpeed} = useContext(WeatherDataContext)
	const date = new Date()
	const formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1 < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth() + 1}-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
	const formattedTime = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:00`

	useEffect(() => {
		const currentlyDate = `${formattedDate}T${formattedTime}`
		setIndexOfDate(times.indexOf(currentlyDate))
	}, [formattedDate, formattedTime, times])

	return (
		<div className="block">
			{temperatures.length !== 0 ? 
				<>
					<div className="temperature">{temperatures[indexOfDate]}°C</div>
					<div className="block-1">
						<div className="wind">Wind: E {windSpeed[indexOfDate]}km/h</div>
						<div className="Humidity">Humidity: {humidity[indexOfDate]}%</div>
					</div>
					<div className="block-2">
						<div className="day-1">Tue <strong> 21°/9°</strong></div>
						<div className="day-2">Wed <strong> 23°/10°</strong></div>
					</div>
				</>
				:
				<></>
			}
		</div>
	)
}

export default WeatherDataBlock