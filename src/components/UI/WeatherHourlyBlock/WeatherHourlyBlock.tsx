import {FunctionComponent as FC, useContext} from "react";
import './WeatherHourlyBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherDataContext} from "../../../context/WeatherDataProvider";
import { convertStringToDate } from "../../../utils/FormatDate";
import { WeatherOWAPIDataContext } from "../../../context/WeatherDataProviderOWAPI";
import { ICurrentlyWeatherData } from "../../../types/weatherDataType";

export const WeatherHourlyBlock:FC = () => {
	const {hourlyWeather} = useContext(WeatherDataContext)
	const {currentlyWeather, setCurrentlyWeather} = useContext(WeatherOWAPIDataContext)
	const firstIndex = Number(currentlyWeather.time.slice(12, 14)) + 1
	const darkMode = useContext(DarkModeContext)

	const convertTime = (date: Date):string => `${date.getHours()}:00`

	const newCurrentlyWeanter = (index: number):ICurrentlyWeatherData => {
		return {
			time: hourlyWeather.times[index].replace('T', ', '),
			sunrise: currentlyWeather.sunrise,
			sunset: currentlyWeather.sunset,
			weather: currentlyWeather.weather,
			temperature: hourlyWeather.temperatures[index],
			humidity: hourlyWeather.humidity[index],
			windSpeed: hourlyWeather.windSpeed[index],
			cloudcover: hourlyWeather.cloudcover[index],
			rain: hourlyWeather.rain[index],
			snowfall: hourlyWeather.snowfall[index],
			snowDepth: currentlyWeather.snowDepth
		}
	}

	return (
		<div className="blocks">
			{hourlyWeather.temperatures.slice(firstIndex, firstIndex + 6).map((value, index) => 
				<div key={index} onClick={() => setCurrentlyWeather(newCurrentlyWeanter(firstIndex + index))} className={darkMode ? "hourly-block block-dark" : "hourly-block block-light"}>
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