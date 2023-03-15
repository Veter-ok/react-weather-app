import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import {ICurrentlyWeatherData, IHourlyWeatherData, IweatherDataOWAPI } from "../types/weatherDataType";
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
	}
})

const WeatherDataOWAPIProvider:FC<IWeatherOWAPIDataProviderProps> = ({coordinates, children}) => {
	const [currentlyWeather, setCurrentlyWeather] = useState<ICurrentlyWeatherData>({
			time: '',
			temperature: 0,
			humidity: 0,
			windSpeed: 0,
			cloudcover: 0,
			rain: 0,
			snowfall: 0,
			snowDepth: 0
	})
	const [hourlyWeather, setHourlyWeather] = useState<IHourlyWeatherData>({
		times: [],
		temperatures: [],
		humidity: [],
		windSpeed: [],
		cloudcover: [],
		rain: [],
		snowfall: [],
	})

	useEffect(() => {
		fetch(`${OPEN_WEATHER_API_URL}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=347a140363f071901c55aed50511ccf7`).then(response => {
			response.json().then(data => {
				setCurrentlyWeather({
					time: new Date().toLocaleString("ru-RU", {timeZone: data.timezone}),
					temperature: Math.round(data.current.temp - 273.15),
					humidity: data.current.humidity,
					windSpeed: data.current.wind_speed,
					cloudcover: data.current.clouds,
					rain: 0,
					snowfall: data.current.snow === undefined ? 0 : data.current.snow["1h"],
					snowDepth: 0
				})
			})
		})
		fetch(`${OPEN_WEATHER_API_URL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=347a140363f071901c55aed50511ccf7`).then(response => {
			response.json().then(data => {
				const newData:IHourlyWeatherData = {times: [], temperatures: [], humidity: [], windSpeed: [], cloudcover: [], rain: [], snowfall: []}
				data.list.forEach((day: any) => {
					newData.times.push(day.dt_txt)
					newData.temperatures.push(Math.round(day.main.temp - 273.15))
					newData.humidity.push(day.main.humidity)
					newData.windSpeed.push(day.wind.speed)
					newData.cloudcover.push(day.clouds.all)
					newData.snowfall.push(day.snow !== undefined ? day.snow["3h"] : 0)
					newData.rain.push(0)
				});
				setHourlyWeather(newData)
			})
		})
	}, [coordinates.lat, coordinates.lon])

	return (
		<WeatherOWAPIDataContext.Provider value={{currentlyWeather: currentlyWeather, hourlyWeather: hourlyWeather}}>
			{children}
		</WeatherOWAPIDataContext.Provider>
	)
}

export {WeatherOWAPIDataContext, WeatherDataOWAPIProvider}