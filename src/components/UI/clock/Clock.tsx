import { useContext, useState} from "react"
import { WeatherDataContext } from "../../../context/WeatherDataProvider"

const Clock = () => {
	const {currentlyWeather} = useContext(WeatherDataContext)
	const [time, setTime] = useState(new Date())

	setInterval(() => {
		setTime(new Date())
	},  10000)

	return (
		<div className="time">{time.toLocaleString("ru-RU", {timeZone: currentlyWeather.timezone}).slice(12, 17)}</div>
	)
}

export default Clock