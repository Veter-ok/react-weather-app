import {FunctionComponent as FC, useContext} from "react";
import './weatherMainBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherOWAPIDataContext } from "../../../context/WeatherDataProviderOWAPI";
import { CityType } from "../../../types/CityTypes";

interface IPropsContent {
	city: CityType
}


export const WeatherMainBlock:FC<IPropsContent> = ({city}) => {
	const {currentlyWeather} = useContext(WeatherOWAPIDataContext)
	const darkMode = useContext(DarkModeContext)

	return (
		<div className={darkMode ? "block block-dark" : "block block-light"}>
			<div className="block-1">
				<div className="cityName">{city.cityName}</div>
				<div className="temperature">{currentlyWeather.temperature}°C</div>
			</div>
			<div className="block-2">
				<div className="wind">Wind: E {currentlyWeather.windSpeed}km/h</div>
				<div className="humidity">Humidity: {currentlyWeather.humidity}%</div>
				<div className="cloudcover">Cloudcover {currentlyWeather.cloudcover}%</div>
			</div>
			<div className="block-3">
			</div>
		</div>
	)
}

export default WeatherMainBlock