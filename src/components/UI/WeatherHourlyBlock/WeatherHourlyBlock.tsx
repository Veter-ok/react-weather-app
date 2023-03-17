import {FunctionComponent as FC, useContext} from "react";
import './WeatherHourlyBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherDataContext} from "../../../context/WeatherDataProvider";
import { convertStringToDate } from "../../../utils/FormatDate";

export const WeatherHourlyBlock:FC = () => {
	const {currentlyWeather, hourlyWeather} = useContext(WeatherDataContext)
	const firstIndex = currentlyWeather.time ? Number(currentlyWeather.time.split(", ")[1].split(":")[0]) + 1 : 0
	const darkMode = useContext(DarkModeContext)

	const convertTime = (date: Date):string => `${date.getHours()}:00`

	return (
		<div className="blocks">
			{hourlyWeather.temperatures.slice(firstIndex, firstIndex + 6).map((value, index) => 
				<div key={index} className={darkMode ? "hourly-block block-dark" : "hourly-block block-light"}>
					<div className="hourly-block-1">
						<div className="hourly-block-date">{convertTime(convertStringToDate(hourlyWeather.times[firstIndex + index]))}</div>
						<div className="hourly-block-temperature">{Math.round(hourlyWeather.temperatures[firstIndex + index])}°C</div>
					</div>
					<div className="hourly-block-2">
						<div className="wind">Wind: E {hourlyWeather.windSpeed[firstIndex + index]}km/h</div>
						<div className="Humidity">Humidity: {hourlyWeather.humidity[firstIndex + index]}%</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default WeatherHourlyBlock