import { useContext, useState} from "react"
import { WeatherDataContext } from "../../../context/WeatherDataProvider"

const Clock = () => {
	const {currentlyWeather, time} = useContext(WeatherDataContext)
	// const [currentTime, setCurrentTime] = useState(new Date().toLocaleString("ru-Ru", {timeZone: currentlyWeather.timezone}).slice(12, 17))

	// setInterval(() => {
		// setCurrentTime(new Date().toLocaleString("ru-Ru", {timeZone: currentlyWeather.timezone}).slice(12, 17))
	// },  10000)

	return (
		<div className="time">{time.toLocaleString("ru-RU").slice(12, 17)}</div>
	)
}

export default Clock