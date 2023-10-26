import React, {FunctionComponent as FC} from 'react'
import './snowFall.css'

interface Props {
	snowFall: number
}

const SnowFall:FC<Props> = ({snowFall}) => {

	const createSnow = () => {
		let snowList = []
		for(let i = 0; i < 50; i++){
			snowList.push(<div className='snow' key={i} style={{
				marginLeft: `${Math.random() * (0 - 1000) + 1000}px`,
				animationDelay: `${Math.random() * (2 - 7) + 7}s`
			}}></div>)
		}
		return snowList
	}

	return (
	<div>
		{snowFall > 0 ?
			<>{createSnow()}</>
		:
			<></>
		}
	</div>
	)
}

export default SnowFall