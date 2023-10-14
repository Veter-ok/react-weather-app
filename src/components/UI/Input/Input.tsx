import './input.css'
import React, {FunctionComponent as FC} from "react";

interface IInputProps {
	value: string,
	onChange: (a: string) => void
	onKeyDown: (a: string) => void
}

export const Input:FC<IInputProps> = ({value, onChange, onKeyDown}) => {
	return (
		<>
			<input 
				type="text" 
				value={value} 
				onChange={(e) => onChange(e.target.value)}
				onKeyDown={(e) => onKeyDown(e.key)}
			/>
		</>
	)
}