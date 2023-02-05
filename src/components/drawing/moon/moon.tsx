import './moon.css'
import React, {FunctionComponent as FC} from 'react'

const Moon:FC = () => {
  return (
	<div className="moon">
		<div className="spot spot-1"></div>
		<div className="spot spot-2"></div>
		<div className="spot spot-3"></div>
		<div className="spot spot-4"></div>
		<div className="spot spot-5"></div>
	</div>
  )
}

export default Moon