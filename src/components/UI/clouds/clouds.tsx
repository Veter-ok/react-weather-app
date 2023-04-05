import React, {FunctionComponent as FC} from 'react'
import Cloud from '../../drawing/cloud/cloud'

const Clouds:FC = () => {
	return (
		<>
			<div className="clouds">
				<Cloud left="530px" top="80px"/>
				<Cloud left="20px" top="150px"/>
				<Cloud left="300px" top="115px"/>
				<Cloud left="720px" top="140px"/>
				<Cloud left="900px" top="60px"/>
			</div>
		</>
	)
}

export default Clouds