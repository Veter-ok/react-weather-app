import {FunctionComponent as FC, useContext} from "react";
import './WeatherDailyBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherDataContext} from "../../../context/WeatherDataProvider";

const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Nov", "Dec"]

export const WeatherDailyBlock:FC = () => {
	const {dailyWeather} = useContext(WeatherDataContext)
	const darkMode = useContext(DarkModeContext)

	return (
		<div className="blocks">
			{dailyWeather.temperatures_max.slice(0, 6).map((value, index) => 
				<div key={index} className={darkMode ? "daily-block block-dark" : "daily-block block-light"}>
					<div className="daily-block-1">
						<div className="daily-block-date">{dailyWeather.times[index].getDate()} {month[dailyWeather.times[index].getMonth()]}</div>
						<div className="daily-block-temperature">from {Math.round(dailyWeather.temperatures_min[index])} to {Math.round(dailyWeather.temperatures_max[index])}°C</div>
					</div>
					<div className="daily-block-2">
						<div className="wind">Wind: E {Math.round(dailyWeather.windspeed[index] * 100) / 100}km/h</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default WeatherDailyBlock