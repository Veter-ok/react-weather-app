export interface IweatherData {
	currentlyWeather: ICurrentlyWeatherData,
	hourlyWeather: IHourlyWeatherData

}

export interface IweatherDataOWAPI {
	currentlyWeather: ICurrentlyWeatherData,
	hourlyWeather: IHourlyWeatherData
}

export interface IHourlyWeatherData {
	times: string[]
	temperatures: number[]
	humidity: number[]
	windSpeed: number[]
	cloudcover: number[]
	rain: number[]
	snowfall: number[]
}

export interface ICurrentlyWeatherData {
	time: string
	temperature: number
	humidity: number
	windSpeed: number
	cloudcover: number
	rain: number
	snowfall: number
	snowDepth: number
}

export interface IDailyWeather {
	times: string[]
	temperatures_max: number[]
	temperatures_min: number[]
	windspeed: number[]
	rain_sum: number[]
	snowfall_sum: number[]
}