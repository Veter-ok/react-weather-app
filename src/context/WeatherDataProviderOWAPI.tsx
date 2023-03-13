import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import {IweatherDataOWAPI } from "../types/weatherDataType";
import { OPEN_WEATHER_API_URL } from "../api/api";

interface IWeatherOWAPIDataProviderProps {
	coordinates: {lat: number, lon: number}
	children: JSX.Element
}

const WeatherOWAPIDataContext = createContext<IweatherDataOWAPI>({
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
	} || null
})

const WeatherDataOWAPIProvider:FC<IWeatherOWAPIDataProviderProps> = ({coordinates, children}) => {
	const [weatherData, setWeatherData] = useState({
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
		}
	})

	useEffect(() => {
		const URL = `${OPEN_WEATHER_API_URL}lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=347a140363f071901c55aed50511ccf7`
		fetch(URL).then(response => {
			response.json().then(data => {
				console.log(data)
				setWeatherData({
					currentlyWeather: {
						time: new Date().toLocaleString("ru-RU", {timeZone: data.timezone}),
						temperature: Math.round(data.current.temp - 273.15),
						humidity: data.current.humidity,
						windSpeed: data.current.wind_speed,
						cloudcover: data.current.clouds,
						rain: 0,
						snowfall: data.current.snow === undefined ? 0 : data.current.snow["1h"],
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
					}
				})
			})
		})
	}, [coordinates.lat, coordinates.lon])

	return (
		<WeatherOWAPIDataContext.Provider value={weatherData}>
			{children}
		</WeatherOWAPIDataContext.Provider>
	)
}

export {WeatherOWAPIDataContext, WeatherDataOWAPIProvider}