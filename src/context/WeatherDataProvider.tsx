import React, {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import { IweatherData } from "../types/weatherDataType";

interface IWeatherDataProviderProps {
	children: JSX.Element
}

const WeatherDataContext = createContext<IweatherData>({
	times: [],
	temperatures: [],
	humidity: [],
	windSpeed: [],
	rain: [],
	snowfall: [],
})

const WeatherDataProvider:FC<IWeatherDataProviderProps> = (props) => {
	const [weatherData, setWeatherData] = useState({
		times: [],
		temperatures: [],
		humidity: [],
		windSpeed: [],
		rain: [],
		snowfall: []
	})
  
	useEffect(() => {
		const URL = 'https://api.open-meteo.com/v1/forecast?latitude=55.78&longitude=37.56&hourly=temperature_2m,relativehumidity_2m,cloudcover_low,windspeed_10m,snowfall,rain'
		fetch(URL).then((response) => {
			response.json().then((data) => {
				const currentlyWeatherData = {
					times: data.hourly.time, 
					temperatures: data.hourly.temperature_2m,
					humidity: data.hourly.relativehumidity_2m,
					windSpeed: data.hourly.windspeed_10m,
					rain: data.hourly.rain,
					snowfall: data.hourly.snowfall
				}
				setWeatherData(currentlyWeatherData)
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