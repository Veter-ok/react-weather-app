import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import { IweatherData } from "../types/weatherDataType";
import { formatDate } from "../utils/FormatDate";

interface IWeatherDataProviderProps {
	children: JSX.Element
}

const WeatherDataContext = createContext<IweatherData>({
	currentlyWeather: {
		temperature: 0,
		humidity: 0,
		windSpeed: 0,
		rain: 0,
		snowfall: 0,
	},
	hourlyWeather: {
		times: [],
		temperatures: [],
		humidity: [],
		windSpeed: [],
		rain: [],
		snowfall: [],
	} || null
})

const WeatherDataProvider:FC<IWeatherDataProviderProps> = (props) => {
	const [weatherData, setWeatherData] = useState<IweatherData>({
		currentlyWeather: {
			temperature: 0,
			humidity: 0,
			windSpeed: 0,
			rain: 0,
			snowfall: 0,
		},
		hourlyWeather: null,
	})

	useEffect(() => {
		const URL = 'https://api.open-meteo.com/v1/forecast?latitude=55.78&longitude=37.56&hourly=temperature_2m,relativehumidity_2m,cloudcover_low,windspeed_10m,snowfall,rain'
		fetch(URL).then((response) => {
			response.json().then((data) => {
				const date = new Date()
				const index = data.hourly.time.indexOf(formatDate(date))
				console.log(formatDate(date))
				setWeatherData({
					currentlyWeather: {
						temperature: data.hourly.temperature_2m[index],
						humidity: data.hourly.relativehumidity_2m[index],
						windSpeed: data.hourly.windspeed_10m[index],
						rain: data.hourly.rain[index],
						snowfall: data.hourly.snowfall[index]
					},
					hourlyWeather: {
						times: data.hourly.time, 
						temperatures: data.hourly.temperature_2m,
						humidity: data.hourly.relativehumidity_2m,
						windSpeed: data.hourly.windspeed_10m,
						rain: data.hourly.rain,
						snowfall: data.hourly.snowfall
					}
				})
			})
		}).catch((error) => {
			console.log(error)
		})
	}, [])

	return (
		<div>
			<WeatherDataContext.Provider value={weatherData}>
				{props.children}
			</WeatherDataContext.Provider>
		</div>
	)
}

export {WeatherDataContext, WeatherDataProvider}