import React, { useContext } from "react";
import './content.css'
import WeatherDataBlock from "../UI/weatherDataBlock/weatherDataBlock";
import { DarkModeContext } from "../../context/DarkModeProvider";

const Content = () => {
	const darkMode = useContext(DarkModeContext)

	return (
		<div className={darkMode ? "Content Content-dark" : "Content Content-light"}>
			<WeatherDataBlock/>
		</div>
	)
}

export default Content