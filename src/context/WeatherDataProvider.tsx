import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import { IweatherData } from "../types/weatherDataType";
import { OPEN_METEO_API_URL } from "../api/api";

interface IWeatherDataProviderProps {
	coordinates: {lat: number, lon: number}
	children: JSX.Element
}

const WeatherDataContext = createContext<IweatherData>({
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
	} || null
})

const WeatherDataProvider:FC<IWeatherDataProviderProps> = ({coordinates, children}) => {
	const [weatherData, setWeatherData] = useState<IweatherData>({
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
	})

	useEffect(() => {
		const URL = `${OPEN_METEO_API_URL}latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m,relativehumidity_2m,cloudcover,windspeed_10m,snowfall,rain,snow_depth&current_weather=true&timezone=auto`
		fetch(URL).then((response) => {
			response.json().then((data) => {
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
					}
				})
			})
		}).catch((error) => {
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