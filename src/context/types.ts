export interface ResponseWeather {
	latitude: number
	longitude: number
	generationtime_ms: number
	utc_offset_seconds: number
	timezone: string
	timezone_abbreviation: string
	elevation: number
	current_weather: {
		temperature: number
		windspeed: number
		winddirection: number
		weathercode: number,
		time: string
	}
	hourly: {
		time: Array<string>
		temperature_2m: Array<number>
		relativehumidity_2m: Array<number>
		windspeed_10m: Array<number>
		cloudcover: Array<number>
		rain: Array<number>
		snowfall: Array<number>
		snow_depth: Array<number>
	}
	daily: {
		time: Array<string>
		temperature_2m_max: Array<number>
		temperature_2m_min: Array<number>
		windspeed_10m_max: Array<number>
		rain_sum: Array<number>
		snowfall_sum: Array<number>
	}
}