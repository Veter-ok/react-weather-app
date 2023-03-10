import React, {FunctionComponent as FC, useContext, useEffect, useState, createContext} from "react";
import './PictureScreen.css'
import Rainfall from "../UI/rainfall/rainfall";
import Luminary from "../UI/luminary/luminary";
import Clouds from "../UI/clouds/clouds";
import Hill from "../drawing/hills/hill";
import { WeatherDataContext } from "../../context/WeatherDataProvider";
import { WeatherOWAPIDataContext } from "../../context/WeatherDataProviderOWAPI";
import SnowFall from "../UI/showFall/snowFall";

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

const PictureScreen:FC = () => {
	const {currentlyWeather} = useContext(WeatherDataContext)
	const [timeOfDay, setTimeOfDay] = useState<"morning" | "day"| "evening" | "night">("day")
	const [cloudCover, setCloudcover] = useState<"clear" | "overcast">("clear")
	const [season, setSeason] = useState< "winter" | "summer">("summer")
	//const {currentlyWeather} = useContext(WeatherOWAPIDataContext)

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
		console.log(currentlyWeather, currentlyWeather.time, timeOfDay, cloudCover, season)
	}, [cloudCover, currentlyWeather, currentlyWeather.cloudcover, currentlyWeather.snowDepth, season, timeOfDay])

	
	return (
		<PictureThemeContext.Provider value={{timeOfDay: timeOfDay, cloudCover: cloudCover, season: season}}>
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