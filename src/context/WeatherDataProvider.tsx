import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import { IweatherData } from "../types/weatherDataType";
import { formatDate } from "../utils/FormatDate";

interface IWeatherDataProviderProps {
	coordinates: {lat: number, lon: number}
	children: JSX.Element
}

const WeatherDataContext = createContext<IweatherData>({
	currentlyWeather: {
		temperature: 0,
		humidity: 0,
		windSpeed: 0,
		cloudcover: 0,
		rain: 0,
		snowfall: 0,
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
			temperature: 0,
			humidity: 0,
			windSpeed: 0,
			cloudcover: 0,
			rain: 0,
			snowfall: 0,
		},
		hourlyWeather: null,
	})

	useEffect(() => {
		const URL = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.lon}&hourly=temperature_2m,relativehumidity_2m,cloudcover,windspeed_10m,snowfall,rain`
		fetch(URL).then((response) => {
			response.json().then((data) => {
				const date = new Date()
				const index = data.hourly.time.indexOf(formatDate(date))
				setWeatherData({
					currentlyWeather: {
						temperature: data.hourly.temperature_2m[index],
						humidity: data.hourly.relativehumidity_2m[index],
						cloudcover: data.hourly.cloudcover[index],
						windSpeed: data.hourly.windspeed_10m[index],
						rain: data.hourly.rain[index],
						snowfall: data.hourly.snowfall[index]
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
	}, [])

	return (
		<div>
			<WeatherDataContext.Provider value={weatherData}>
				{children}
			</WeatherDataContext.Provider>
		</div>
	)
}

export {WeatherDataContext, WeatherDataProvider}