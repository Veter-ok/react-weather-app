import React, {FunctionComponent as FC, useContext} from "react";
import './PictureScreen.css'
import { WeatherDataContext } from "../../../App";
import Luminary from "../../UI/luminary/luminary";
import Rainfall from "../../UI/rainfall/rainfall";
import Hill from "../../drawing/hills/hill";

const PictureScreen:FC = () => {
	//const {times, temperatures, humidity, windSpeed} = useContext(WeatherDataContext)

	return (
		<div className="frame">
			<Luminary/>
			<Rainfall/>
			<Hill/>
		</div>
	)
}

export default PictureScreen