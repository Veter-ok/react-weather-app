import { GEO_OPTIONS } from '../../../api/api';
import { CityType } from '../../../types/CityTypes';
import './SearchCity.css'
import React, {FunctionComponent as FC, useState} from "react";

interface IPropsSearchCity {
	setCity: (param: CityType) => void
}

interface cityType {
	city: string
	countryCode: string
	latitude: number,
	longitude: number
}

export const SearchCity:FC<IPropsSearchCity> = ({setCity}) => {
	const [currentlyCity, setCurrentlyCity] = useState('')
	const [prevTime, SetPrevTime] = useState(Date.now())
	const [cities, setCities] = useState<Array<cityType>>([{city: '', countryCode: '', latitude: 0, longitude: 0}])

	const onChangeValue = async (value: string) => {
		setCurrentlyCity(value)
		if (value !== ''){
			const delay = Date.now() - prevTime
			if (delay >= 1000){
				await sendRequest(value)
				SetPrevTime(Date.now())
			}else{
				// await setTimeout(sendRequest, 1000 - delay + 200, value)
				// SetPrevTime(Date.now())
			}
		}else{
			setCities([{city: '', countryCode: '', latitude: 0, longitude: 0}])
		}
	}

	const sendRequest = async (value: string) => {
		await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&minPopulation=20000&namePrefix=${value}`, GEO_OPTIONS)
			.then(response => response.json())
			.then(response => {
				if (response.data !== undefined){
					setCities(response.data)
				}
			})
			.catch(err => console.log(err));
	}

	const chooseCity = (city: cityType) => {
		setCity({cityName: city.city, coordinates: {lat: city.latitude, lon: city.longitude}})
		setCities([{city: '', countryCode: '', latitude: 0, longitude: 0}])
		setCurrentlyCity('')
	}

	return (
		<>
			<input type="text" value={currentlyCity} onChange={(e) => onChangeValue(e.target.value)}></input>
			{cities.length > 1 ?
				<div className="results">
					{cities.map((value, index) => 
						<div className='cityBlock' onClick={() => chooseCity(value)} key={index}>{value.city}, {value.countryCode}</div>
					)}
				</div>
			:
				<></>
			}
		</>
	)
}