import React, {FunctionComponent as FC} from 'react'
import Cloud from '../../drawing/cloud/cloud'

const Clouds:FC = () => {
	
	const getClouds = () => {
		let cloudsList = []
		for(let i = 0; i < 7; i++){
			let randomX = Math.random() * (0 - 1000) + 1000
			let randomY = Math.random() * (0 - 150) + 150
			console.log(randomX, randomY)
			cloudsList.push(<div style={{position: 'absolute', left:`${randomX}px`, top:`${randomY}px`}}><Cloud/></div>)
		}
		return cloudsList
	}

	return (
		<>
			{getClouds()}
		</>
	)
}

export default Clouds