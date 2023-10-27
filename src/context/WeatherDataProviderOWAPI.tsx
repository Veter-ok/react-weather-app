import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import {ICurrentlyWeatherData } from "../types/weatherDataType";
import { OPEN_WEATHER_API_URL } from "../api/api";
import { CityType } from "../types/CityTypes";

interface IWeatherOWAPIDataProviderProps {
	city: CityType
	children: JSX.Element
}

const WeatherOWAPIDataContext = createContext({
	time: '',
	currentlyWeather: {
		time: '',
		sunrise: '',
		sunset: '',
		weather: '',
		temperature: 0,
		humidity: 0,
		windSpeed: 0,
		cloudcover: 0,
		rain: 0,
		snowfall: 0,
		snowDepth: 0
	},
	setCurrentlyWeather(c: ICurrentlyWeatherData){}
})

const WeatherDataOWAPIProvider:FC<IWeatherOWAPIDataProviderProps> = ({city, children}) => {
	const {coordinates} = city
	const [currentlyTime, setCurrentlyTime] = useState('')
	const [currentlyWeather, setCurrentlyWeather] = useState<ICurrentlyWeatherData>({
			time: '',
			sunset: '',
			sunrise: '',
			weather: '',
			temperature: 0,
			humidity: 0,
			windSpeed: 0,
			cloudcover: 0,
			rain: 0,
			snowfall: 0,
			snowDepth: 0
	})

	const setNewCurrentlyWeather = (data: ICurrentlyWeatherData) => {
		if (Number(data.time.slice(12, 14)) === Number(currentlyTime.slice(12, 14))){
			fetchWeather()
		}else{
			setCurrentlyWeather(data)
		}
	}

	const fetchWeather = async () => {
		await fetch(`${OPEN_WEATHER_API_URL}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=${process.env.REACT_APP_OW_API}`).then(response => {
			response.json().then(data => {
				setCurrentlyTime(new Date().toLocaleString("ru-RU", {timeZone: data.timezone}))
				setCurrentlyWeather({
					time: new Date().toLocaleString("ru-RU", {timeZone: data.timezone}),
					sunrise: new Date((data.current.sunrise + data.timezone_offset) * 1000).toISOString().slice(11, 19),
					sunset: new Date((data.current.sunset + data.timezone_offset) * 1000).toISOString().slice(11, 19),
					weather: data.current.weather[0].description,
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
	}

	useEffect(() => {
		fetch(`${OPEN_WEATHER_API_URL}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=${process.env.REACT_APP_OW_API}`).then(response => {
			response.json().then(data => {
				setCurrentlyTime(new Date().toLocaleString("ru-RU", {timeZone: data.timezone}))
				setCurrentlyWeather({
					time: new Date().toLocaleString("ru-RU", {timeZone: data.timezone}),
					sunrise: new Date((data.current.sunrise + data.timezone_offset) * 1000).toISOString().slice(11, 19),
					sunset: new Date((data.current.sunset + data.timezone_offset) * 1000).toISOString().slice(11, 19),
					weather: data.current.weather[0].description,
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
	}, [coordinates.lat, coordinates.lon])

	return (
		<WeatherOWAPIDataContext.Provider value={{time: currentlyTime, currentlyWeather: currentlyWeather, setCurrentlyWeather: setNewCurrentlyWeather}}>
			{children}
		</WeatherOWAPIDataContext.Provider>
	)
}

export {WeatherOWAPIDataContext, WeatherDataOWAPIProvider}