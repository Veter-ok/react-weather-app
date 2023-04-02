import React, {FunctionComponent as FC} from 'react'
import Cloud from '../../drawing/cloud/cloud'

const Clouds:FC = () => {
	
	const getClouds = () => {
		let cloudsList = []
		for(let i = 0; i < 7; i++){
			let randomX = Math.random() * (0 - 1000) + 1000
			let randomY = Math.random() * (0 - 150) + 150
			cloudsList.push(<div key={i} style={{position: 'absolute', left:`${randomX}px`, top:`${randomY}px`}}><Cloud/></div>)
		}
		return cloudsList
	}

	return (
		<>
			{/* {getClouds()} */}
			<div className="clouds" style={{position: 'absolute', width:"1000px", height:"400px"}}>
				<div style={{position: 'absolute', left:"19%", top:"5%"}}><Cloud/></div>
				<div style={{position: 'absolute', left:"30%", top:"30%"}}><Cloud/></div>
				<div style={{position: 'absolute', left:"45%", top:"22%"}}><Cloud/></div>
				<div style={{position: 'absolute', left:"62%", top:"35%"}}><Cloud/></div>
				<div style={{position: 'absolute', left:"78%", top:"15%"}}><Cloud/></div>
			</div>
		</>
	)
}

export default Clouds