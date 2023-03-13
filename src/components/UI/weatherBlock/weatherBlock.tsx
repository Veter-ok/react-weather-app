import {FunctionComponent as FC, useContext} from "react";
import './weatherBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherOWAPIDataContext } from "../../../context/WeatherDataProviderOWAPI";
import { WeatherDataContext} from "../../../context/WeatherDataProvider";
import { convertStringToDate } from "../../../utils/FormatDate";

export const WeatherBlock:FC = () => {
	//const {hourlyWeather} = useContext(WeatherOWAPIDataContext)
	const {hourlyWeather} = useContext(WeatherDataContext)
	const darkMode = useContext(DarkModeContext)

	const convertTime = (date: Date):string => `${date.getHours()}:00`

	return (
		<div className="blocks">
			{hourlyWeather.temperatures.splice(1, 6).map((value, index) => 
				<div className={darkMode ? "mini-block block-dark" : "mini-block block-light"}>
					<div className="mini-block-1">
						<div className="mini-block-date">{convertTime(convertStringToDate(hourlyWeather.times[index]))}</div>
						<div className="mini-block-temperature">{hourlyWeather.temperatures[index]}°C</div>
					</div>
					<div className="mini-block-2">
						<div className="wind">Wind: E {hourlyWeather.windSpeed[index]}km/h</div>
						<div className="Humidity">Humidity: {hourlyWeather.humidity[index]}%</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default WeatherBlock