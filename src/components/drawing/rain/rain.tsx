import React, {FunctionComponent as FC} from 'react'
import './rain.css'

const Rain:FC = () => {
	return (
		<div className="drops">
			<div className="big-drop"></div>
			<div className="big-drop"></div>
			<div className="big-drop"></div>
		</div>
	)
}

export default Rain