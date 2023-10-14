import { CityType } from '../../../types/CityTypes';
import { Input } from '../Input/Input';
import './SearchCity.css'
import React, {FunctionComponent as FC, useState} from "react";

interface IPropsSearchCity {
	setCity: (param: CityType) => void
}

interface cityType {
	name: string
	country: string
	lat: number,
	lon: number
}

export const SearchCity:FC<IPropsSearchCity> = ({setCity}) => {
	const [currentlyCity, setCurrentlyCity] = useState('')
	const [cities, setCities] = useState<cityType[]>([{name: '', country: '', lat: 0, lon: 0}])

	const onChangeValue = async (value: string) => {
		setCurrentlyCity(value)
		if (value !== ''){
			await sendRequest(value, false)
		}else{
			setCities([{name: '', country: '', lat: 0, lon: 0}])
		}
	}

	const EnderDown = async (key: string) => {
		if (key === "Enter") {
			await sendRequest(currentlyCity, true)
			setCities([{name: '', country: '', lat: 0, lon: 0}])
			setCurrentlyCity('')
		}
	}

	const sendRequest = async (value: string, isLast:boolean) => {
		await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.REACT_APP_OW_API}`)
			.then((response) => response.json())
			.then((data) => {
				if (isLast){
					setCity({cityName: data[0].name, coordinates: {lat: data[0].lat, lon: data[0].lon}, })
				}
				setCities(data)
			})
	}

	const chooseCity = (city: cityType) => {
		setCity({cityName: city.name, coordinates: {lat: city.lat, lon: city.lon}})
		setCities([{name: '', country: '', lat: 0, lon: 0}])
		setCurrentlyCity('')
	}

	return (
		<>
			<Input 
				value={currentlyCity} 
				onChange={onChangeValue}
				onKeyDown={EnderDown}
			/>
			{cities.length > 1 ?
				<div className="results">
					{cities.map((value, index) => 
						<div className='cityBlock' onClick={() => chooseCity(value)} key={index}>{value.name}, {value.country}</div>
					)}
				</div>
			:
				<></>
			}
		</>
	)
}