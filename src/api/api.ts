export const GEO_OPTIONS = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY ? process.env.REACT_APP_RAPIDAPI_KEY : '',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const OPEN_METEO_API_URL = 'https://api.open-meteo.com/v1/forecast?'

export const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/'