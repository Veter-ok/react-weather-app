import React, {FunctionComponent as FC} from 'react'
import './rainfall.css'

interface IPropsRainfall {
	rain: number
	weather: string
}


const Rainfall:FC<IPropsRainfall> = ({rain, weather}) => {

	const createRain = () => {
		let rainList = []
		var count = rain * 15
		if (weather){
			if (weather.includes("light")){
				count = 20
			}else if (weather.includes("moderate")){
				count = 35
			}
			for(let i = 0; i < count; i++){
				rainList.push(<div key={i} className="big-drop" style={{
					left: `${Math.random() * (0 - 1000) + 1000}px`,
					// animationDirection: `${Math.random() * (2 - 7) + 7}s`,
					animationDelay: `${Math.random() * (1 - 7) + 7}s`
				}}></div>)
			}
			return rainList
		}
	}

	return (
		<div className="drops">
			{createRain()}
		</div>
	)
}

export default Rainfall