import React, {FunctionComponent as FC, useContext } from "react";
import './content.css'
import WeatherMainBlock from "../UI/weatherMainBlock/weatherMainBlock";
import { DarkModeContext } from "../../context/DarkModeProvider";
import { CityType } from "../../types/CityTypes";
import WeatherHourlyBlock from "../UI/WeatherHourlyBlock/WeatherHourlyBlock";
import WeatherDailyBlock from "../UI/WeatherDailyBlock/WeatherDailyBlock";

interface IPropsContent {
	city: CityType
}

export const Content:FC<IPropsContent> = ({city}) => {
	const darkMode = useContext(DarkModeContext)

	return (
		<div className={darkMode ? "content Content-dark" : "content Content-light"}>
			<WeatherMainBlock city={city}/>
			<h2>Hourly Weather</h2>
			<WeatherHourlyBlock/>
			<h2>Daily Weather</h2>
			<WeatherDailyBlock/>
		</div>
	)
}

export default Content