import React, {FunctionComponent as FC, useContext, useEffect, useState, createContext} from "react";
import './PictureScreen.css'
import Rainfall from "../UI/rainfall/rainfall";
import Luminary from "../UI/luminary/luminary";
import Clouds from "../UI/clouds/clouds";
import Hill from "../drawing/hills/hill";
import { WeatherDataContext } from "../../context/WeatherDataProvider";
import SnowFall from "../UI/showFall/snowFall";
import { CityType } from "../../types/CityTypes";

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
	const {currentlyWeather} = useContext(WeatherDataContext)
	const [timeOfDay, setTimeOfDay] = useState<"morning" | "day"| "evening" | "night">("day")
	const [cloudCover, setCloudcover] = useState<"clear" | "overcast">("clear")
	const [season, setSeason] = useState< "winter" | "summer">("summer")

	useEffect(() => {
		let time = 0
		if (currentlyWeather.time){
			time = Number(currentlyWeather.time.split(',')[1].split(':')[0])
		}

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

		if (time > 5 && time <= 8){
			setTimeOfDay('morning')
		}
		else if (time > 8 && time <= 17){
			setTimeOfDay('day')
		}else if (time > 17 && time < 19){
			setTimeOfDay('evening')
		}else{
			setTimeOfDay('night')
		}
		//console.log(currentlyWeather, currentlyWeather.time, timeOfDay, cloudCover, season)
	}, [cloudCover, currentlyWeather, currentlyWeather.cloudcover, currentlyWeather.snowDepth, season, timeOfDay])

	const formatDate = (date: string) => {
		if (date){
			const [hours, minute] = date.split(' ')[1].split(':')
			return `${hours}:${minute}`
		}
	}
	
	return (
		<PictureThemeContext.Provider value={{timeOfDay: timeOfDay, cloudCover: cloudCover, season: season}}>
			<div className="time">{formatDate(currentlyWeather.time)}</div>
			<div className="city">{city.cityName}</div>
			<div className="currently-temperature">{currentlyWeather.temperature}°C</div>
			<div className={`frame ${timeOfDay} ${cloudCover}`}>
				<Luminary timeOfDay={timeOfDay} cloudcover={currentlyWeather.cloudcover}/>
				<Rainfall rain={currentlyWeather.rain}/>
				<SnowFall snowFall={currentlyWeather.snowfall}/>
				<Clouds/>
				<Hill/>
			</div>
		</PictureThemeContext.Provider>
	)
}

export default PictureScreen