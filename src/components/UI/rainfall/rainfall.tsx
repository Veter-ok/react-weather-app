import React, {FunctionComponent as FC} from 'react'
import Rain from '../../drawing/rain/rain'

interface IPropsRainfall {
	rain: number
}

const Rainfall:FC<IPropsRainfall> = ({rain}) => {

	return (
		<>
			{rain > 0 ?
				<Rain/>
				:
				<></>
			}
		</>
	)
}

export default Rainfall