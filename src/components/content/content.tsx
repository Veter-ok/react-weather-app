import React, {FunctionComponent as FC, useContext } from "react";
import './content.css'
import WeatherMainBlock from "../UI/weatherMainBlock/weatherMainBlock";
import { DarkModeContext } from "../../context/DarkModeProvider";
import { CityType } from "../../types/CityTypes";
import WeatherHourlyBlock from "../UI/weatherBlock/weatherBlock";

interface IPropsContent {
	city: CityType
}

export const Content:FC<IPropsContent> = ({city}) => {
	const darkMode = useContext(DarkModeContext)

	return (
		<div className={darkMode ? "Content Content-dark" : "Content Content-light"}>
			<WeatherMainBlock city={city}/>
			<WeatherHourlyBlock/>
		</div>
	)
}

export default Content