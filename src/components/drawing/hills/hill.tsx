import {FunctionComponent as FC, useContext} from 'react'
import './hill.css'
import { PictureThemeContext } from '../../screens/PictureScreen'
import { colors_1, colors_2 } from './colors'

const Hill:FC = () => {
	const pictureTheme = useContext(PictureThemeContext)
	const type = `${pictureTheme.season}-${pictureTheme.timeOfDay}-${pictureTheme.cloudCover}`
	
	return (
		<>
			<div className='hill hill-1' style={{backgroundColor: colors_1[type]}}></div>
			<div className='hill hill-2' style={{backgroundColor: colors_1[type]}}></div>
			<div className='hill hill-3' style={{backgroundColor: colors_1[type]}}></div>
			<div className='hill hill-4' style={{backgroundColor: colors_2[type]}}></div>
			<div className='hill hill-5' style={{backgroundColor: colors_2[type]}}></div>
			<div className='hill hill-6' style={{backgroundColor: colors_2[type]}}></div>	
		</>
	)
}

export default Hill