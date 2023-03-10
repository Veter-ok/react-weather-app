import React, {FunctionComponent as FC, useContext} from 'react'
import './hill.css'
import { PictureThemeContext } from '../../screens/RainyScreen/PictureScreen'

const Hill:FC = () => {
	const pictureTheme = useContext(PictureThemeContext)

	return (
		<>
			<div className={`hill hill-1 hill-${pictureTheme.season}-${pictureTheme.cloudCover === "clear" ? '' : `${pictureTheme.cloudCover}-`}${pictureTheme.timeOfDay}-1`}></div>
			<div className={`hill hill-2 hill-${pictureTheme.season}-${pictureTheme.cloudCover === "clear" ? '' : `${pictureTheme.cloudCover}-`}${pictureTheme.timeOfDay}-1`}></div>
			<div className={`hill hill-3 hill-${pictureTheme.season}-${pictureTheme.cloudCover === "clear" ? '' : `${pictureTheme.cloudCover}-`}${pictureTheme.timeOfDay}-1`}></div>
			<div className={`hill hill-4 hill-${pictureTheme.season}-${pictureTheme.cloudCover === "clear" ? '' : `${pictureTheme.cloudCover}-`}${pictureTheme.timeOfDay}-2`}></div>
			<div className={`hill hill-5 hill-${pictureTheme.season}-${pictureTheme.cloudCover === "clear" ? '' : `${pictureTheme.cloudCover}-`}${pictureTheme.timeOfDay}-2`}></div>
			<div className={`hill hill-6 hill-${pictureTheme.season}-${pictureTheme.cloudCover === "clear" ? '' : `${pictureTheme.cloudCover}-`}${pictureTheme.timeOfDay}-2`}></div>	
		</>
	)
}

export default Hill