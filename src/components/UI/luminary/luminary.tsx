import {FunctionComponent as FC} from 'react'
import Sun from '../../drawing/sun/sun'
import Moon from '../../drawing/moon/moon'
import MorningSun from '../../drawing/MorningSun/MorningSun'
import EveningSun from '../../drawing/EveningSun/EveningSun'

interface IPropsLuminary {
	timeOfDay: string
	cloudcover: number
}

const Luminary:FC<IPropsLuminary> = ({timeOfDay, cloudcover}) => {
	const chooseLuminary = () => {
		if (cloudcover < 90){
			if (timeOfDay === "day"){
				return <Sun/>
			}else if (timeOfDay === "night"){
				return <Moon/>
			}else if (timeOfDay === "morning"){
				return <MorningSun/>
			}else{
				console.log(timeOfDay)
				return <EveningSun/>
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