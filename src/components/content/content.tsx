import React, {FunctionComponent as FC, useContext } from "react";
import './content.css'
import WeatherDataBlock from "../UI/weatherDataBlock/weatherDataBlock";
import { DarkModeContext } from "../../context/DarkModeProvider";
import { CityType } from "../../types/CityTypes";

interface IPropsContent {
	city: CityType
}

const Content:FC<IPropsContent> = ({city}) => {
	const darkMode = useContext(DarkModeContext)

	return (
		<div className={darkMode ? "Content Content-dark" : "Content Content-light"}>
			<WeatherDataBlock city={city}/>
		</div>
	)
}

export default Content