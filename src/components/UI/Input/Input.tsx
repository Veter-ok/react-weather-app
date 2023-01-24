import './input.css'
import React, {FunctionComponent as FC} from "react";

interface IInputProps {
	value: string,
	onChange: Function
}

export const Input:FC<IInputProps> = ({value, onChange}) => {
	return (
		<>
			<input type="text" value={value} onChange={(e) => onChange(e.target.value)}></input>
		</>
	)
}