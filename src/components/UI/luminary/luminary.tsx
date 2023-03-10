import {FunctionComponent as FC} from 'react'
import Sun from '../../drawing/sun/sun'
import Moon from '../../drawing/moon/moon'

interface IPropsLuminary {
	hour: number
	cloudcover: number
}

const Luminary:FC<IPropsLuminary> = ({hour, cloudcover}) => {
	const chooseLuminary = () => {
		if (cloudcover < 90){
			if (hour > 6 && hour <= 18){
				return <Sun/>
			}else if (hour <= 6 || hour >= 20 ){
				return <Moon/>
			}else{
				return <></>
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