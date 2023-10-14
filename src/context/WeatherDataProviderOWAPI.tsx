import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import {ICurrentlyWeatherData, IHourlyWeatherData, IweatherDataOWAPI } from "../types/weatherDataType";
import { OPEN_WEATHER_API_URL } from "../api/api";
import { CityType } from "../types/CityTypes";

interface IWeatherOWAPIDataProviderProps {
	city: CityType
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

const WeatherDataOWAPIProvider:FC<IWeatherOWAPIDataProviderProps> = ({city, children}) => {
	const {cityName, coordinates, trueCoordinates} = city
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
		let url_onecall = `${OPEN_WEATHER_API_URL}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=${process.env.REACT_APP_OW_API}`
		let url_forecast = `${OPEN_WEATHER_API_URL}forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=${process.env.REACT_APP_OW_API}`
		if (!trueCoordinates){
			url_onecall = `${OPEN_WEATHER_API_URL}onecall?q=${cityName}&exclude=hourly,daily&appid=${process.env.REACT_APP_OW_API}`
			url_forecast = `${OPEN_WEATHER_API_URL}forecast?q=${cityName}&exclude=hourly,daily&appid=${process.env.REACT_APP_OW_API}`
		}
		fetch(url_onecall).then(response => {
			response.json().then(data => {
				console.log(data)
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
		fetch(url_forecast).then(response => {
			response.json().then(data => {
				console.log(data)
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
	}, [cityName, coordinates.lat, coordinates.lon, trueCoordinates])

	return (
		<WeatherOWAPIDataContext.Provider value={{currentlyWeather: currentlyWeather, hourlyWeather: hourlyWeather}}>
			{children}
		</WeatherOWAPIDataContext.Provider>
	)
}

export {WeatherOWAPIDataContext, WeatherDataOWAPIProvider}