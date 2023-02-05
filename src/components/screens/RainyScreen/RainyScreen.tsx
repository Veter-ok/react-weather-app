import React, {FunctionComponent as FC} from "react";
import './rainyScreen.css'
import Moon from "../../drawing/moon/moon";
import Sun from "../../drawing/sun/sun";

const RainyScreen:FC = () => {
	const currentlyDate = new Date()

	return (
		<div className="frame">
			{currentlyDate.getHours() > 6 && currentlyDate.getHours() < 18 ?
			<Sun/>
			:
			<>
				{currentlyDate.getHours() <= 6 || currentlyDate.getHours() > 20 ?
					<Moon/>
					:
					<></>
				}
			</>
			}
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