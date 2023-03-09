import {FunctionComponent as FC} from 'react'
import Sun from '../../drawing/sun/sun'
import Moon from '../../drawing/moon/moon'

interface IPropsLuminary {
	cloudcover: number
}

const Luminary:FC<IPropsLuminary> = ({cloudcover}) => {
	const currentlyDate = new Date()

	const chooseLuminary = () => {
		if (cloudcover < 90){
			if (currentlyDate.getHours() > 6 && currentlyDate.getHours() < 18){
				return <Sun/>
			}else if (currentlyDate.getHours() <= 6 || currentlyDate.getHours() >= 20 ){
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