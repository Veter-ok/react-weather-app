import React, {FunctionComponent as FC} from 'react'
import './cloud.css'

interface IPropsCloud {
	left: string,
	top: string,
}

const Cloud:FC<IPropsCloud> = ({left, top}) => {

	return (
		<div className="cloud" style={{left: left, top: top}}>
			<div className="cloud-circle cloud-circle-1"></div>
			<div className="cloud-circle cloud-circle-2"></div>
			<div className="cloud-circle cloud-circle-3"></div>
			<div className="cloud-circle cloud-circle-4"></div>
			<div className="cloud-circle cloud-circle-5"></div>
		</div>
	)
}

export default Cloud