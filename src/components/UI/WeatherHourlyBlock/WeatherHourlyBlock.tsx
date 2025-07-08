import {FunctionComponent as FC, useContext} from "react";
import './WeatherHourlyBlock.css'
import { DarkModeContext } from "../../../context/DarkModeProvider";
import { WeatherDataContext } from "../../../context/WeatherDataProvider";
import { ICurrentlyWeatherData } from "../../../types/weatherDataType";
import { convertDateToTime } from "../../../utils/FormatDate";

export const WeatherHourlyBlock:FC = () => {
	const {currentlyWeather, hourlyWeather, setCurrentlyWeather, time} = useContext(WeatherDataContext)
	const firstIndex = time.getHours() - 3
	const darkMode = useContext(DarkModeContext)

	const newCurrentlyWeanter = (index: number):ICurrentlyWeatherData => {
		return {
			time: hourlyWeather.times[index],
			timezone: currentlyWeather.timezone,
			sunrise: currentlyWeather.sunrise,
			sunset: currentlyWeather.sunset,
			weather: currentlyWeather.weather,
			temperature: Math.round(hourlyWeather.temperatures[index]),
			humidity: hourlyWeather.humidity[index],
			windSpeed: Math.round(hourlyWeather.windSpeed[index]),
			cloudcover: hourlyWeather.cloudcover[index],
			rain: hourlyWeather.rain[index],
			snowfall: hourlyWeather.snowfall[index],
			snowDepth: hourlyWeather.snow_depth[index]
		}
	}

	return (
		<div className="blocks">
			{hourlyWeather.temperatures.slice(firstIndex, firstIndex + 6).map((value, index) => 
				<div key={index} onClick={() => setCurrentlyWeather(newCurrentlyWeanter(firstIndex + index))} className={darkMode ? "hourly-block block-dark" : "hourly-block block-light"}>
					<div className="hourly-block-1">
						<div className="hourly-block-date">{convertDateToTime(hourlyWeather.times[firstIndex + index])}</div>
						<div className="hourly-block-temperature">{Math.round(hourlyWeather.temperatures[firstIndex + index])}°C</div>
					</div>
					<div className="hourly-block-2">
						<div className="wind">Wind: E {Math.round(hourlyWeather.windSpeed[firstIndex + index] * 100) / 100}km/h</div>
						<div className="Humidity">Humidity: {hourlyWeather.humidity[firstIndex + index]}%</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default WeatherHourlyBlock