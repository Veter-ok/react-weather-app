import React, {FunctionComponent as FC, useContext, useEffect, useState, createContext} from "react";
import './PictureScreen.css'
import Rainfall from "../../UI/rainfall/rainfall";
import Luminary from "../../UI/luminary/luminary";
import Clouds from "../../UI/clouds/clouds";
import Hill from "../../drawing/hills/hill";
import { WeatherDataContext } from "../../../context/WeatherDataProvider";
import { WeatherOWAPIDataContext } from "../../../context/WeatherDataProviderOWAPI";
import SnowFall from "../../UI/showFall/snowFall";

export const PictureThemeContext = createContext<string>("")

const PictureScreen:FC = () => {
	const {currentlyWeather} = useContext(WeatherDataContext)
	//const {currentlyWeather} = useContext(WeatherOWAPIDataContext)
	const [theme, setTheme] = useState("")

	useEffect(() => {
		let time = 0
		if (currentlyWeather.time){
			time = Number(currentlyWeather.time.split(',')[1].split(':')[0])
		}
		let createTheme = ''

		if (currentlyWeather.snowDepth > 0.05){
			createTheme += 'winter-'
		}else{
			createTheme += 'summer-'
		}

		if (currentlyWeather.cloudcover <= 100 && currentlyWeather.cloudcover >= 90 ){
			createTheme += 'overcast-'
		}

		if (time > 8 && time < 18){
			createTheme += 'day'
		}else if (time >= 18){
			createTheme += 'night'
		}
		console.log(currentlyWeather, createTheme)
		setTheme(createTheme)
	}, [currentlyWeather, currentlyWeather.cloudcover, currentlyWeather.snowDepth])

	
	return (
		<PictureThemeContext.Provider value={theme}>
			<div className={`frame ${theme}`}>
				<Luminary hour={currentlyWeather.time ? Number(currentlyWeather.time.split(',')[1].split(':')[0]) : 0} cloudcover={currentlyWeather.cloudcover}/>
				<Rainfall rain={currentlyWeather.rain}/>
				<SnowFall snowFall={currentlyWeather.snowfall}/>
				<Clouds/>
				<Hill/>
			</div>
		</PictureThemeContext.Provider>
	)
}

export default PictureScreen