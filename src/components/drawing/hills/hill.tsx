import {FunctionComponent as FC} from 'react'
import './hill.css'
import { HillsColors1, HillsColors2 } from './colors'

interface IPropsHill {
	type: string
}

const Hill:FC<IPropsHill> = ({type}) => {	
	return (
		<>
			<div className='hill hill-1' style={{backgroundColor: HillsColors1[type]}}></div>
			<div className='hill hill-2' style={{backgroundColor: HillsColors1[type]}}></div>
			<div className='hill hill-3' style={{backgroundColor: HillsColors1[type]}}></div>
			<div className='hill hill-4' style={{backgroundColor: HillsColors2[type]}}></div>
			<div className='hill hill-5' style={{backgroundColor: HillsColors2[type]}}></div>
			<div className='hill hill-6' style={{backgroundColor: HillsColors2[type]}}></div>	
		</>
	)
}

export default Hill