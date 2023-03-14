import {FunctionComponent as FC, useContext} from "react";
import './weatherBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherOWAPIDataContext } from "../../../context/WeatherDataProviderOWAPI";
import { WeatherDataContext} from "../../../context/WeatherDataProvider";
import { convertStringToDate } from "../../../utils/FormatDate";

export const WeatherHourlyBlock:FC = () => {
	//const {hourlyWeather} = useContext(WeatherOWAPIDataContext)
	const {currentlyWeather, hourlyWeather} = useContext(WeatherDataContext)
	const firstIndex = currentlyWeather.time ? Number(currentlyWeather.time.split(", ")[1].split(":")[0]) + 1 : 0
	const darkMode = useContext(DarkModeContext)

	const convertTime = (date: Date):string => `${date.getHours()}:00`

	console.log(hourlyWeather.temperatures.length, hourlyWeather.temperatures.slice(firstIndex, firstIndex + 1).length)

	return (
		<div className="blocks">
			{hourlyWeather.temperatures.slice(firstIndex, firstIndex + 6).map((value, index) => 
				<div key={index} className={darkMode ? "mini-block block-dark" : "mini-block block-light"}>
					<div className="mini-block-1">
						<div className="mini-block-date">{convertTime(convertStringToDate(hourlyWeather.times[firstIndex + index]))}</div>
						<div className="mini-block-temperature">{hourlyWeather.temperatures[firstIndex + index]}°C</div>
					</div>
					<div className="mini-block-2">
						<div className="wind">Wind: E {hourlyWeather.windSpeed[firstIndex + index]}km/h</div>
						<div className="Humidity">Humidity: {hourlyWeather.humidity[firstIndex + index]}%</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default WeatherHourlyBlock