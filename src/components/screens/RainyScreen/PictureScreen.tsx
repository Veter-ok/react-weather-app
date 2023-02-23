import React, {FunctionComponent as FC, useContext, useEffect, useState, createContext} from "react";
import './PictureScreen.css'
import Rainfall from "../../UI/rainfall/rainfall";
import Luminary from "../../UI/luminary/luminary";
import Clouds from "../../UI/clouds/clouds";
import Hill from "../../drawing/hills/hill";
import { WeatherDataContext } from "../../../context/WeatherDataProvider";
import { formatDate } from "../../../utils/FormatDate";

export const PictureThemeContext = createContext<string>("day")

const PictureScreen:FC = () => {
	const {times, rain} = useContext(WeatherDataContext)
	const [theme, setTheme] = useState("day")
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const date = new Date()
	const formattedDate = formatDate(date)
	const index = times.indexOf(formattedDate)

	useEffect(() => {
		const time = date.getHours()
		if (time > 8 && time < 18){
			setTheme("day")
		}else if (time >= 18){
			setTheme("night")
		}
	}, [date, theme])
	
	return (
		<PictureThemeContext.Provider value={theme}>
			<div className={`frame ${theme}`}>
				<Luminary/>
				<Rainfall rain={rain[index]}/>
				<Clouds/>
				<Hill/>
			</div>
		</PictureThemeContext.Provider>
	)
}

export default PictureScreen