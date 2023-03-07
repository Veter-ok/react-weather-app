import React, {FunctionComponent as FC} from 'react'
import Sun from '../../drawing/sun/sun'
import Moon from '../../drawing/moon/moon'

const Luminary:FC = () => {
	const currentlyDate = new Date()

	return (
		<>
			{currentlyDate.getHours() > 6 && currentlyDate.getHours() < 18 ?
				<Sun/>
				:
				<>
					{currentlyDate.getHours() <= 6 || currentlyDate.getHours() >= 20 ?
						<Moon/>
						:
						<></>
					}
				</>
			}
		</>
	)
}

export default Luminary