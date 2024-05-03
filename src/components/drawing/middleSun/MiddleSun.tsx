import './MiddleSun.css'
import React, {FunctionComponent as FC} from 'react'

interface MiddleSunProps {
	timeOfDay: "morning" | "evening",
}

const MiddleSun:FC<MiddleSunProps> = ({timeOfDay}) => {

    const backgroundColor = {
		"evening": "rgb(248, 204, 168)",
		"morning": "rgb(248, 236, 168)"
	}
	const shadowColor = {
		"evening": "rgb(245, 140, 102)",
		"morning": "rgb(248, 236, 168)"
	}

  return (
	<div className="middle-sun" style={{
            backgroundColor: backgroundColor[timeOfDay],
            boxShadow: `0 0 100px 0 ${shadowColor[timeOfDay]}`,
        }}>
		<div className=""></div>
		<div className=""></div>
		<div className=""></div>
		<div className=""></div>
		<div className=""></div>
	</div>
  )
}

export default MiddleSun