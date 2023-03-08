import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import {IweatherDataOWAPI } from "../types/weatherDataType";

interface IWeatherOWAPIDataProviderProps {
	children: JSX.Element
}

const WeatherOWAPIDataContext = createContext<IweatherDataOWAPI>({
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

const WeatherDataOWAPIProvider:FC<IWeatherOWAPIDataProviderProps> = (props) => {
	const [weatherData, setWeatherData] = useState({
		currentlyWeather: {
			temperature: 0,
			humidity: 0,
			windSpeed: 0,
			rain: 0,
			snowfall: 0,
		},
		hourlyWeather: null
	})

	useEffect(() => {
		const URL = 'https://api.openweathermap.org/data/2.5/onecall?lat=55.78&lon=37.56&exclude=hourly,daily&appid=347a140363f071901c55aed50511ccf7'
		fetch(URL).then(response => {
			response.json().then(data => {
				const currentlyWeatherData = {
					temperature: Math.round(data.current.temp - 273.15),
					humidity: data.current.humidity,
					windSpeed: data.current.wind_speed,
					rain: 0,
					snowfall: data.current.snow === undefined ? 0 : data.current.snow["1h"]
				}
				setWeatherData({
					currentlyWeather: currentlyWeatherData,
					hourlyWeather: null
				})
				console.log(currentlyWeatherData)
			})
		})
	}, [])

	console.log(weatherData)

	return (
		<WeatherOWAPIDataContext.Provider value={weatherData}>
			{props.children}
		</WeatherOWAPIDataContext.Provider>
	)
}

export {WeatherOWAPIDataContext, WeatherDataOWAPIProvider}