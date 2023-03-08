import React, {FunctionComponent as FC, useContext, useEffect, useState, createContext} from "react";
import './PictureScreen.css'
import Rainfall from "../../UI/rainfall/rainfall";
import Luminary from "../../UI/luminary/luminary";
import Clouds from "../../UI/clouds/clouds";
import Hill from "../../drawing/hills/hill";
import { WeatherDataContext } from "../../../context/WeatherDataProvider";
import { WeatherOWAPIDataContext } from "../../../context/WeatherDataProviderOWAPI";

export const PictureThemeContext = createContext<string>("day-summer")

const PictureScreen:FC = () => {
	const {currentlyWeather} = useContext(WeatherDataContext)
	//const {currentlyWeather} = useContext(WeatherOWAPIDataContext)
	const [theme, setTheme] = useState("winter-day")
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const date = new Date()

	useEffect(() => {
		const time = date.getHours()
		if (time > 8 && time < 18){
			if (currentlyWeather.snowfall > 0){
				setTheme("winter-day")	
			}else{
				setTheme("summer-day")	
			}
		}else if (time >= 18){
			if (currentlyWeather.snowfall > 0){
				setTheme("winter-night")
			}else{
				setTheme("summer-night")
			}
		}
	}, [currentlyWeather.snowfall, date])
	
	return (
		<PictureThemeContext.Provider value={theme}>
			<div className={`frame ${theme}`}>
				<Luminary/>
				<Rainfall rain={currentlyWeather.rain}/>
				<Clouds/>
				<Hill/>
			</div>
		</PictureThemeContext.Provider>
	)
}

export default PictureScreen