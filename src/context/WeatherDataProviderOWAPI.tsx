import React, {createContext, FunctionComponent as FC, useCallback, useEffect, useState} from "react"; 
import {ICurrentlyWeatherData } from "../types/weatherDataType";
import { OPEN_WEATHER_API_URL } from "../api/api";
import { CityType } from "../types/CityTypes";

interface IWeatherOWAPIDataProviderProps {
	city: CityType
	children: JSX.Element
}

const defaultCurrentlyWeather:ICurrentlyWeatherData = {
	time: new Date(),
	timezone: "Europe/Moscow",
	sunrise: new Date(),
	sunset: new Date(),
	weather: '',
	temperature: 0,
	humidity: 0,
	windSpeed: 0,
	cloudcover: 0,
	rain: 0,
	snowfall: 0,
	snowDepth: 0
}

const WeatherOWAPIDataContext = createContext({
	time: new Date(),
	currentlyWeather: defaultCurrentlyWeather,
	setCurrentlyWeather: (c: ICurrentlyWeatherData) => {},
})

const WeatherDataOWAPIProvider:FC<IWeatherOWAPIDataProviderProps> = ({city, children}) => {
	const {coordinates} = city
	const [currentlyTime, setCurrentlyTime] = useState(new Date())
	const [currentlyWeather, setCurrentlyWeather] = useState(defaultCurrentlyWeather)

	const setNewCurrentlyWeather = (data: ICurrentlyWeatherData) => {
		if (data.time.getHours() === currentlyTime.getHours()){
			fetchWeather()
		}else{
			setCurrentlyWeather(data)
		}
	}

	const fetchWeather = useCallback(async () => {
		await fetch(`${OPEN_WEATHER_API_URL}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=hourly,daily&appid=${process.env.REACT_APP_OW_API}`)
			.then(response => {
				response.json().then(data => {
					const date = new Date()
					date.setHours(date.getHours() + data.timezone_offset / 3600 + date.getTimezoneOffset() / 60) 
					setCurrentlyTime(date)
					const localOffset = new Date().getTimezoneOffset() * 60
					setCurrentlyWeather({
						time: date,
						timezone: data.timezone,
						sunrise: new Date((data.current.sunrise + data.timezone_offset + localOffset) * 1000),
						sunset: new Date((data.current.sunset + data.timezone_offset + localOffset) * 1000),
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
			.catch((error) => console.log(error))
	}, [coordinates.lat, coordinates.lon])

	useEffect(() => {
		fetchWeather()
	}, [fetchWeather])

	return (
		<WeatherOWAPIDataContext.Provider value={{time: currentlyTime, currentlyWeather: currentlyWeather, setCurrentlyWeather: setNewCurrentlyWeather}}>
			{children}
		</WeatherOWAPIDataContext.Provider>
	)
}

export {WeatherOWAPIDataContext, WeatherDataOWAPIProvider}