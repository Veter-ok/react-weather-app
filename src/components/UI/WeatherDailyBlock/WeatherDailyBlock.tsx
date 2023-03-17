import {FunctionComponent as FC, useContext} from "react";
import './WeatherDailyBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherDataContext} from "../../../context/WeatherDataProvider";

export const WeatherDailyBlock:FC = () => {
	const {dailyWeather} = useContext(WeatherDataContext)
	const darkMode = useContext(DarkModeContext)

	console.log(dailyWeather)

	return (
		<div className="blocks">
			{dailyWeather.temperatures_max.slice(0, 6).map((value, index) => 
				<div key={index} className={darkMode ? "daily-block block-dark" : "daily-block block-light"}>
					<div className="daily-block-1">
						<div className="daily-block-date">{dailyWeather.times[index].split("-")[2]}.{dailyWeather.times[index].split("-")[1]}</div>
						<div className="daily-block-temperature">from {Math.round(dailyWeather.temperatures_min[index])} to {Math.round(dailyWeather.temperatures_max[index])}°C</div>
					</div>
					<div className="daily-block-2">
						<div className="wind">Wind: E {dailyWeather.windspeed[index]}km/h</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default WeatherDailyBlock