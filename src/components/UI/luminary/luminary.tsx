import {FunctionComponent as FC} from 'react'
import Sun from '../../drawing/sun/sun'
import Moon from '../../drawing/moon/moon'
import MiddleSun from '../../drawing/middleSun/MiddleSun'

interface IPropsLuminary {
	timeOfDay: "day" | "night" | "evening" | "morning"
	cloudcover: number
}

const Luminary:FC<IPropsLuminary> = ({timeOfDay, cloudcover}) => {
	const chooseLuminary = () => {
		if (cloudcover < 90){
			if (timeOfDay === "day"){
				return <Sun/>
			}else if (timeOfDay === "night"){
				return <Moon/>
			}else{
				return  <MiddleSun timeOfDay={timeOfDay}/>
			}
		}else{
			return <></>
		}
	}

	return (
		<>
			{chooseLuminary()}
		</>
	)
}

export default Luminary