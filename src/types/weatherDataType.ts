export interface IweatherData {
	hourlyWeather: IHourlyWeatherData

}

export interface IweatherDataOWAPI {
	currentlyWeather: ICurrentlyWeatherData,
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
	sunset: string
	sunrise: string
	weather: string
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