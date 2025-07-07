import {FunctionComponent as FC, useContext} from "react";
import './weatherMainBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import {WeatherDataContext} from '../../../context/WeatherDataProvider'
import { CityType } from "../../../types/CityTypes";
import { convertDateToTime } from "../../../utils/FormatDate";

interface IPropsContent {
	city: CityType
}


export const WeatherMainBlock:FC<IPropsContent> = ({city}) => {
	const {currentlyWeather} = useContext(WeatherDataContext)
	const darkMode = useContext(DarkModeContext)

	return (
		<div className={darkMode ? "block block-dark" : "block main-block-light"}>
			<div className="block-1">
				<div className="cityName">{city.cityName}</div>
				<div className="temperature">{currentlyWeather.temperature}°C</div>
				<div className="weather">{currentlyWeather.weather}</div>
			</div>
			<div className="block-2">
				<div className="wind">Wind: E {currentlyWeather.windSpeed}km/h</div>
				<div className="humidity">Humidity: {currentlyWeather.humidity}%</div>
				<div className="cloudcover">Cloudcover {currentlyWeather.cloudcover}%</div>
			</div>
			<div className="block-3">
				<div className="sunrise-block">Sunrise: {convertDateToTime(currentlyWeather.sunrise)}</div>
				<div className="sunset-block">Sunset: {convertDateToTime(currentlyWeather.sunset)}</div>
			</div>
		</div>
	)
}

export default WeatherMainBlock