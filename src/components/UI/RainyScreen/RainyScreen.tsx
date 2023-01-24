import React, {FunctionComponent as FC} from "react";
import './rainyScreen.css'

const RainyScreen:FC = () => {
	return (
		<div className="frame">
			<div className="moon">
				<div className="spot spot-1"></div>
				<div className="spot spot-2"></div>
				<div className="spot spot-3"></div>
				<div className="spot spot-4"></div>
				<div className="spot spot-5"></div>
			</div>
			<div className="drops">
				<div className="big-drop"></div>
				<div className="big-drop"></div>
				<div className="big-drop"></div>
			</div>
			<div className="hill hill-1"></div>
			<div className="hill hill-2"></div>
			<div className="hill hill-3"></div>
			<div className="hill hill-4"></div>
			<div className="hill hill-5"></div>
			<div className="hill hill-6"></div>
		</div>
	)
}

export default RainyScreen