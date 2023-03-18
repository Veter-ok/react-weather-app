import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import { IDailyWeather, IweatherData } from "../types/weatherDataType";
import { OPEN_METEO_API_URL } from "../api/api";
import { ResponseWeather } from "./types";

interface IWeatherDataProviderProps {
	coordinates: {lat: number, lon: number}
	children: JSX.Element
}

interface IFullWeatherData extends IweatherData {
	dailyWeather: IDailyWeather
}

const WeatherDataContext = createContext<IFullWeatherData>({
	currentlyWeather: {
		time: '',
		temperature: 0,
		humidity: 0,
		windSpeed: 0,
		cloudcover: 0,
		rain: 0,
		snowfall: 0,
		snowDepth: 0,
	},
	hourlyWeather: {
		times: [],
		temperatures: [],
		humidity: [],
		windSpeed: [],
		cloudcover: [],
		rain: [],
		snowfall: [],
	},
	dailyWeather: {
		times: [],
		temperatures_max: [],
		temperatures_min: [],
		windspeed: [],
		rain_sum: [],
		snowfall_sum: [],
	}
})

const WeatherDataProvider:FC<IWeatherDataProviderProps> = ({coordinates, children}) => {
	const [weatherData, setWeatherData] = useState<IFullWeatherData>({
		currentlyWeather: {
			time: '',
			temperature: 0,
			humidity: 0,
			windSpeed: 0,
			cloudcover: 0,
			rain: 0,
			snowfall: 0,
			snowDepth: 0
		},
		hourlyWeather: {
			times: [],
			temperatures: [],
			humidity: [],
			windSpeed: [],
			cloudcover: [],
			rain: [],
			snowfall: [],
		},
		dailyWeather: {
			times: [],
			temperatures_max: [],
			temperatures_min: [],
			windspeed: [],
			rain_sum: [],
			snowfall_sum: [],
		}
	})

	useEffect(() => {
		fetch(`${OPEN_METEO_API_URL}latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m,relativehumidity_2m,cloudcover,windspeed_10m,snowfall,rain,snow_depth&current_weather=true&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum,windspeed_10m_max&timezone=auto`)
		.then((response) => response.json())
		.then((data: ResponseWeather) => {
			const index = data.hourly.time.indexOf(data["current_weather"].time)
			setWeatherData({
				currentlyWeather: {
					time: new Date().toLocaleString("ru-RU", {timeZone: data.timezone}),
					temperature: data["current_weather"].temperature,
					humidity: data.hourly.relativehumidity_2m[index],
					cloudcover: data.hourly.cloudcover[index],
					windSpeed: data["current_weather"].windspeed,
					rain: data.hourly.rain[index],
					snowfall: data.hourly.snowfall[index],
					snowDepth: data.hourly.snow_depth[index]
				},
				hourlyWeather: {
					times: data.hourly.time, 
					temperatures: data.hourly.temperature_2m,
					humidity: data.hourly.relativehumidity_2m,
					windSpeed: data.hourly.windspeed_10m,
					cloudcover: data.hourly.cloudcover,
					rain: data.hourly.rain,
					snowfall: data.hourly.snowfall
				},
				dailyWeather: {
					times: data.daily.time,
					temperatures_max: data.daily.temperature_2m_max,
					temperatures_min: data.daily.temperature_2m_min,
					windspeed: data.daily.windspeed_10m_max,
					rain_sum: data.daily.rain_sum,
					snowfall_sum: data.daily.snowfall_sum,
				}		
			})
		})
		.catch((error) => {
			console.log(error)
		})
	}, [coordinates.lat, coordinates.lon])

	return (
		<div>
			<WeatherDataContext.Provider value={weatherData}>
				{children}
			</WeatherDataContext.Provider>
		</div>
	)
}

export {WeatherDataContext, WeatherDataProvider}