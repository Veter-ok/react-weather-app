import { useContext} from "react"
import { WeatherOWAPIDataContext } from "../../../context/WeatherDataProviderOWAPI"
import { convertDateToTime } from "../../../utils/FormatDate"

const Clock = () => {
	const {currentlyWeather, setNewDate} = useContext(WeatherOWAPIDataContext)

	setInterval(setNewDate,  10000)

	return (
		<div className="time">{convertDateToTime(currentlyWeather.time)}</div>
	)
}

export default Clock