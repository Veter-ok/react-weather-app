import {createContext, FunctionComponent as FC, useEffect, useState} from "react"; 
import { fetchWeatherApi } from 'openmeteo';
import { ICurrentlyWeatherData, IDailyWeather, IHourlyWeatherData} from "../types/weatherDataType";
import { convertStringOWAPIToDate } from "../utils/FormatDate";

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
	const codeToWeahter = {
		0:  "Clear sky",             1:  "Mainly clear",         2:  "Partly cloudy",       3:  "Overcast",
		45: "Fog",                   48: "Depositing rime fog",  51: "Drizzle",             53: "Drizzle",
		56: "Freezing Drizzle",      57: "Freezing Drizzle",     61: "Slight rain",         63: "Moderate rain",
		65: "Heavy rain",            66: "Light Freezing Rain",  67: "Heavy Freezing Rain", 71: "Slight snow fall",
		73: "Moderate snow fall",    75: "Heavy snow fall",      77: "Snow grains",         80: "Slight rain showers",
		81: "Moderate rain showers", 82: "Violent rain showers", 85: "Slight snow showers", 86: "Heavy snow showers",
		95: "Slight Thunderstorm: Slight or moderate", 96: "Thunderstorm with slight hail", 99: "Thunderstorm with heavy hail"

	}

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
			"current": ["relative_humidity_2m", "temperature_2m", "rain", "snowfall", "weather_code", "wind_speed_10m", "cloud_cover", "apparent_temperature"],
			"timezone": "auto"
		}
		const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params)
		const response = responses[0]
		const daily = response.daily()!;
		const current = response.current()!;
		const sunrise = new Date(Number(daily.variables(0)!.valuesInt64(0)) * 1000)
		const sunset = new Date(Number(daily.variables(1)!.valuesInt64(0)) * 1000)
		const timezone = response.timezone()! == null ? currentlyWeather.timezone : response.timezone()!
		setTime(convertStringOWAPIToDate(new Date().toLocaleString("ru-RU", {timeZone: timezone})))
		setCurrentlyWeather({
			time: convertStringOWAPIToDate(new Date().toLocaleString("ru-RU", {timeZone: timezone})),
			sunrise: convertStringOWAPIToDate(sunrise.toLocaleString("ru-RU", {timeZone: timezone})),
			sunset: convertStringOWAPIToDate(sunset.toLocaleString("ru-RU", {timeZone: timezone})),
			weather: codeToWeahter[current.variables(4)!.value() as keyof typeof codeToWeahter],
			timezone: timezone,
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