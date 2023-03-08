import React, {FunctionComponent as FC, useContext} from "react";
import './weatherDataBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherDataContext } from "../../../context/WeatherDataProvider";
import { WeatherOWAPIDataContext } from "../../../context/WeatherDataProviderOWAPI";


const WeatherDataBlock:FC = () => {
	const {currentlyWeather} = useContext(WeatherDataContext)
	// const {currentlyWeather} = useContext(WeatherOWAPIDataContext)
	const darkMode = useContext(DarkModeContext)
	console.log(currentlyWeather)

	return (
		<div className={darkMode ? "block block-dark" : "block block-light"}>
			<div className="temperature">{currentlyWeather.temperature}°C</div>
			<div className="block-1">
				<div className="wind">Wind: E {currentlyWeather.windSpeed}km/h</div>
				<div className="Humidity">Humidity: {currentlyWeather.humidity}%</div>
			</div>
			<div className="block-2">
				<div className="day-1">Tue <strong> 21°/9°</strong></div>
				<div className="day-2">Wed <strong> 23°/10°</strong></div>
			</div>
		</div>
	)
}

export default WeatherDataBlock