import React, {FunctionComponent as FC, useContext, useEffect, useState} from "react";
import './weatherDataBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherDataContext } from "../../../context/WeatherDataProvider";
import { formatDate } from "../../../utils/FormatDate";


const WeatherDataBlock:FC = () => {
	const [indexOfDate, setIndexOfDate] = useState(0)
	const {times, temperatures, humidity, windSpeed} = useContext(WeatherDataContext)
	const darkMode = useContext(DarkModeContext)
	const date = new Date()
	const formattedDate = formatDate(date)

	useEffect(() => {
		setIndexOfDate(times.indexOf(formattedDate))
	}, [formattedDate, times])

	return (
		<div className={darkMode ? "block block-dark" : "block block-light"}>
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