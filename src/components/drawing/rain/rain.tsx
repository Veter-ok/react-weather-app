import React, {FunctionComponent as FC} from 'react'
import './rain.css'

const Rain:FC = () => {

	const createRain = () => {
		let rainList = []
		for(let i = 0; i < 40; i++){
			rainList.push(<div key={i} className="big-drop" style={{
				left: `${Math.random() * (0 - 1000) + 1000}px`,
				// animationDirection: `${Math.random() * (2 - 7) + 7}s`,
				animationDelay: `${Math.random() * (1 - 7) + 7}s`
			}}></div>)
		}
		return rainList
	}

	return (
		<div className="drops">
			{createRain()}
		</div>
	)
}

export default Rain