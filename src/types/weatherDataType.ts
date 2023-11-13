export interface IweatherData {
	hourlyWeather: IHourlyWeatherData

}

export interface IweatherDataOWAPI {
	currentlyWeather: ICurrentlyWeatherData,
}

export interface IHourlyWeatherData {
	times: Date[]
	temperatures: number[]
	humidity: number[]
	windSpeed: number[]
	cloudcover: number[]
	rain: number[]
	snowfall: number[]
	snow_depth: number[]
}

export interface ICurrentlyWeatherData {
	time: Date
	sunset: Date
	sunrise: Date
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
	times: Date[]
	temperatures_max: number[]
	temperatures_min: number[]
	windspeed: number[]
	rain_sum: number[]
	snowfall_sum: number[]
}