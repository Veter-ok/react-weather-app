import {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import { ICurrentlyWeatherData, IDailyWeather, IHourlyWeatherData, IweatherData } from "../types/weatherDataType";
import { OPEN_METEO_API_URL } from "../api/api";
import { ResponseWeather } from "./types";

interface IWeatherDataProviderProps {
	coordinates: {lat: number, lon: number}
	children: JSX.Element
}

interface IFullWeatherData extends IweatherData {
	hourlyWeather: IHourlyWeatherData
	dailyWeather: IDailyWeather
	currentlyWeather: ICurrentlyWeatherData
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

const defaultHourlyWeather:IHourlyWeatherData = {
	times: [],
	temperatures: [],
	humidity: [],
	windSpeed: [],
	cloudcover: [],
	rain: [],
	snowfall: [],
	snow_depth: []
}

const defaultDailyWeather:IDailyWeather = {
	times: [],
	temperatures_max: [],
	temperatures_min: [],
	windspeed: [],
	rain_sum: [],
	snowfall_sum: [],
}

const WeatherDataContext = createContext<IFullWeatherData>({
	hourlyWeather: defaultHourlyWeather,
	dailyWeather: defaultDailyWeather,
	currentlyWeather: defaultCurrentlyWeather
})

const WeatherDataProvider:FC<IWeatherDataProviderProps> = ({coordinates, children}) => {
	const [currentlyWeather, setCurrentlyWeather] = useState<ICurrentlyWeatherData>(defaultCurrentlyWeather)
	const [hourlyWeather, setHourlyWeather] = useState<IHourlyWeatherData>(defaultHourlyWeather)
	const [dailyWeather, setDailyWeather] = useState<IDailyWeather>(defaultDailyWeather)

	const convertStringsToDate = (data: string[]) => {
		const new_array:Date[] = []
		data.forEach((date) => {
			new_array.push(new Date(date))
		})
		return new_array
	}

	useEffect(() => {
		fetch(`${OPEN_METEO_API_URL}latitude=${coordinates.lat}&longitude=${coordinates.lon}&current=temperature_2m&hourly=temperature_2m,relativehumidity_2m,cloudcover,windspeed_10m,snowfall,rain,snow_depth&daily=temperature_2m_max,temperature_2m_min,rain_sum,snowfall_sum,windspeed_10m_max&timezone=auto`)
		.then((response) => response.json())
		.then((data: ResponseWeather) => {
			setHourlyWeather({
				times: convertStringsToDate(data.hourly.time), 
				temperatures: data.hourly.temperature_2m,
				humidity: data.hourly.relativehumidity_2m,
				windSpeed: data.hourly.windspeed_10m,
				cloudcover: data.hourly.cloudcover,
				rain: data.hourly.rain,
				snowfall: data.hourly.snowfall,
				snow_depth: data.hourly.snow_depth
			})
			setDailyWeather({
				times: convertStringsToDate(data.daily.time),
				temperatures_max: data.daily.temperature_2m_max,
				temperatures_min: data.daily.temperature_2m_min,
				windspeed: data.daily.windspeed_10m_max,
				rain_sum: data.daily.rain_sum,
				snowfall_sum: data.daily.snowfall_sum,
			})
			setCurrentlyWeather(defaultCurrentlyWeather)
		})
		.catch((error) => {
			console.log(error)
		})
	}, [coordinates.lat, coordinates.lon])

	return (
		<WeatherDataContext.Provider value={{currentlyWeather, hourlyWeather, dailyWeather}}>
			{children}
		</WeatherDataContext.Provider>
	)
}

export {WeatherDataContext, WeatherDataProvider}