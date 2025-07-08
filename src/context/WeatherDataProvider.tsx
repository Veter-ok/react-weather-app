import {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import { fetchWeatherApi } from 'openmeteo';
import { ICurrentlyWeatherData, IDailyWeather, IHourlyWeatherData} from "../types/weatherDataType";

interface IWeatherDataProviderProps {
	coordinates: {lat: number, lon: number}
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

const WeatherDataContext = createContext({
	hourlyWeather: defaultHourlyWeather,
	dailyWeather: defaultDailyWeather,
	currentlyWeather: defaultCurrentlyWeather,
	time: new Date(),
	setCurrentlyWeather: (c: ICurrentlyWeatherData) => {}
})

const WeatherDataProvider:FC<IWeatherDataProviderProps> = ({coordinates, children}) => {
	const [time, setTime] = useState<Date>(new Date())
	const [currentlyWeather, setCurrentlyWeather] = useState<ICurrentlyWeatherData>(defaultCurrentlyWeather)
	const [hourlyWeather, setHourlyWeather] = useState<IHourlyWeatherData>(defaultHourlyWeather)
	const [dailyWeather, setDailyWeather] = useState<IDailyWeather>(defaultDailyWeather)

	const setNewCurrentlyWeather = (data: ICurrentlyWeatherData) => {
		if (data.time.getHours() === time.getHours()){
			getCurrentWeaher()
		}else{
			setCurrentlyWeather(data)
		}
	}

	const getHourlyWeather = async () => {
		const params = {
			"latitude": coordinates.lat,
			"longitude": coordinates.lon,
			"hourly": ["temperature_2m", "relative_humidity_2m", "wind_speed_10m", "snowfall", "rain", "snow_depth", "cloud_cover"]
		};
		const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params);
		const response = responses[0];
		const utcOffsetSeconds = response.utcOffsetSeconds();
		const hourly = response.hourly()!;
		setHourlyWeather({ 
			times: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
				(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
			),
			temperatures: Array.from(hourly.variables(0)!.valuesArray()!),
			humidity: Array.from(hourly.variables(1)!.valuesArray()!),
			windSpeed: Array.from(hourly.variables(2)!.valuesArray()!),
			snowfall: Array.from(hourly.variables(3)!.valuesArray()!),
			rain: Array.from(hourly.variables(4)!.valuesArray()!),
			snow_depth: Array.from(hourly.variables(5)!.valuesArray()!),
			cloudcover: Array.from(hourly.variables(6)!.valuesArray()!),
		})
	}

	const getDailyWeather = async () => {
		const params = {
			"latitude": coordinates.lat,
			"longitude": coordinates.lon,
			"daily": ["temperature_2m_min", "temperature_2m_max", "rain_sum", "snowfall_sum", "wind_speed_10m_max"]
		};
		const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params);
		const response = responses[0];
		const utcOffsetSeconds = response.utcOffsetSeconds();
		const daily = response.daily()!;
		setDailyWeather({ 
			times: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
			),
			temperatures_max: Array.from(daily.variables(1)!.valuesArray()!),
			temperatures_min: Array.from(daily.variables(0)!.valuesArray()!),
			windspeed: Array.from(daily.variables(4)!.valuesArray()!),
			rain_sum: Array.from(daily.variables(2)!.valuesArray()!),
			snowfall_sum: Array.from(daily.variables(3)!.valuesArray()!),
		})
	}

	const getCurrentWeaher = async () => {
		const params = {
			"latitude": coordinates.lat,
			"longitude": coordinates.lon,
			"daily": ["sunrise", "sunset"],
			"current": ["relative_humidity_2m", "temperature_2m", "rain", "snowfall", "weather_code", "wind_speed_10m", "cloud_cover", "apparent_temperature"]
		}
		const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params)
		const response = responses[0]
		const daily = response.daily()!;
		const current = response.current()!;
		setTime(new Date((Number(current.time()) + response.utcOffsetSeconds()) * 1000))
		setCurrentlyWeather({
			time: new Date((Number(current.time()) + response.utcOffsetSeconds()) * 1000),
			sunrise: new Date((Number(daily.variables(0)!.valuesInt64(0)) + response.utcOffsetSeconds()) * 1000),
			sunset: new Date((Number(daily.variables(1)!.valuesInt64(0)) + response.utcOffsetSeconds()) * 1000),
			weather: '',
			timezone: response.timezone() == null ? "Europe/Moscow" : response.timezone()!,
			snowDepth: 0,
			humidity: current.variables(0)!.value(),
			temperature: Math.round(current.variables(1)!.value()),
			rain: current.variables(2)!.value(),
			snowfall: current.variables(3)!.value(),
			windSpeed: Math.round(current.variables(5)!.value() * 100) / 100,
			cloudcover: current.variables(6)!.value(),
		})
	}

	useEffect(() => {
		getHourlyWeather()
		getDailyWeather()
		getCurrentWeaher()
	}, [coordinates.lat, coordinates.lon])

	return (
		<WeatherDataContext.Provider value={{currentlyWeather, hourlyWeather, dailyWeather, setCurrentlyWeather: setNewCurrentlyWeather, time: time}}>
			{children}
		</WeatherDataContext.Provider>
	)
}

export {WeatherDataContext, WeatherDataProvider}