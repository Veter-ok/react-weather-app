export interface IweatherData {
	currentlyWeather: ICurrentlyWeatherData,
	hourlyWeather: IHourlyWeatherData | null

}

export interface IweatherDataOWAPI {
	currentlyWeather: ICurrentlyWeatherData,
	hourlyWeather: IHourlyWeatherData | null
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