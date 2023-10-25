import React, {FunctionComponent as FC, useContext, useEffect, useState, createContext} from "react";
import './PictureScreen.css'
import Luminary from "../UI/luminary/luminary";
import Clouds from "../UI/clouds/clouds";
import Hill from "../drawing/hills/hill";
import Rainfall from "../drawing/rainfall/rainfall";
import {WeatherOWAPIDataContext} from '../../context/WeatherDataProviderOWAPI'
import SnowFall from "../UI/showFall/snowFall";
import { CityType } from "../../types/CityTypes";
import { convertStringToTime } from "../../utils/FormatDate";

interface IPictureThemeContext {
	timeOfDay: "morning" | "day"| "evening" | "night",
	cloudCover: "clear" | "overcast",
	season: "winter" | "summer"
}

export const PictureThemeContext = createContext<IPictureThemeContext>({
	timeOfDay: "day",
	cloudCover: "clear",
	season: "summer"
})

interface IPropsPictureScreen {
	city: CityType
}

const PictureScreen:FC<IPropsPictureScreen> = ({city}) => {
	const {currentlyWeather} = useContext(WeatherOWAPIDataContext)
	const [timeOfDay, setTimeOfDay] = useState<"morning" | "day"| "evening" | "night">("day")
	const [cloudCover, setCloudcover] = useState<"clear" | "overcast">("clear")
	const [season, setSeason] = useState< "winter" | "summer">("summer")

	useEffect(() => {
		const time = convertStringToTime(currentlyWeather.time.slice(12, 20))
		const sunset = convertStringToTime(currentlyWeather.sunset)
		const sunrise = convertStringToTime(currentlyWeather.sunrise)
		const day = new Date(sunrise)
		day.setHours(sunrise.getHours() + 2)
		const evening = new Date(sunset)
		evening.setHours(sunset.getHours() - 2)

		if (currentlyWeather.snowDepth > 0.05){
			setSeason('winter')
		}else{
			setSeason('summer')
		}

		if (currentlyWeather.cloudcover <= 100 && currentlyWeather.cloudcover >= 90 ){
			setCloudcover('overcast')
		}else{
			setCloudcover('clear')
		}

		if (time > sunrise && time <= day){
			setTimeOfDay('morning')
		}
		else if (time > day && time <= evening){
			setTimeOfDay('day')
		}else if (time > evening && time <= sunset){
			setTimeOfDay('evening')
		}else{
			setTimeOfDay('night')
		}
	}, [cloudCover, currentlyWeather.cloudcover, currentlyWeather.snowDepth, currentlyWeather.sunrise, currentlyWeather.sunset, currentlyWeather.time, season, timeOfDay])

	const formatDate = (date: string) => {
		if (date !== ""){
			const [hours, minute] = date.split(' ')[1].split(':')
			return `${hours}:${minute}`
		}
	}

	const formatTime = (time: string) => {
		if (time) {
			const [hours, minutes] = time.split(':')
			return `${hours}:${minutes}`
		}
	}
	
	return (
		<PictureThemeContext.Provider value={{timeOfDay: timeOfDay, cloudCover: cloudCover, season: season}}>
			<div className="time">{formatDate(currentlyWeather.time)}</div>
			<div className="sunrise">Sunrise: {formatTime(currentlyWeather.sunrise)}</div>
			<div className="sunset">Sunset:  {formatTime(currentlyWeather.sunset)}</div>
			<div className="city">{city.cityName}</div>
			<div className="currently-temperature">{currentlyWeather.temperature}°C</div>
			<div className={`frame ${timeOfDay} ${cloudCover}`}>
				<Luminary timeOfDay={timeOfDay} cloudcover={currentlyWeather.cloudcover}/>
				<Rainfall rain={currentlyWeather.rain} weather={currentlyWeather.weather}/>
				<SnowFall snowFall={currentlyWeather.snowfall}/>
				<Clouds/>
				<Hill/>
			</div>
		</PictureThemeContext.Provider>
	)
}

export default PictureScreen