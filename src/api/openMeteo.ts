export const getWeatherData = async () => {
	const url = 'https://api.open-meteo.com/v1/forecast?latitude=55.78&longitude=37.56&hourly=temperature_2m,relativehumidity_2m,cloudcover_low,windspeed_10m'
	await fetch(url).then((response) => {
		response.json().then((data) => {
			const weatherData = {
				times: data.hourly.time, 
				temperatures: data.hourly.temperature_2m,
				humidity: data.hourly.relativehumidity_2m,
				windSpeed: data.hourly.windspeed_10m
			}
			return weatherData
		})
	}).catch((error) => {
		return error
	})
}