import React, {createContext, FunctionComponent as FC} from "react"; 

interface IDarkModeProviderProps {
	children: JSX.Element
}

const DarkModeContext = createContext(true)

const DarkModeProvider:FC<IDarkModeProviderProps> = (props) => {
	return (
		<div>
			<DarkModeContext.Provider value={false}>
				{props.children}
			</DarkModeContext.Provider>
		</div>
	)
}

export {DarkModeContext, DarkModeProvider}