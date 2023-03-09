import './SearchCity.css'
import React, {FunctionComponent as FC, useState} from "react";

interface IPropsSearchCity {
	setCoordinates: (coordinates: {lat: number, lon: number}) => void
}

interface cityType {
	city: string
	countryCode: string
	latitude: number,
	longitude: number
}

export const SearchCity:FC<IPropsSearchCity> = ({setCoordinates}) => {
	const [city, setCity] = useState('')
	const [cities, setCities] = useState<Array<cityType>>([{city: '', countryCode: '', latitude: 0, longitude: 0}])

	const onChangeValue = async (value: string) => {
		setCity(value)
		const options = {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'a011aa4a34msh0601bbc6c6ff814p1989d0jsnba609c677f28',
				'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
			}
		};
		if (value !== ''){
			await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&minPopulation=20000&namePrefix=${value}&sort=population`, options)
			.then(response => response.json())
			.then(response => {
				if (response.data !== undefined){
					console.log(response.data)
					setCities(response.data)
				}
			})
			.catch(err => console.log(err));
		}else{
			setCities([{city: '', countryCode: '', latitude: 0, longitude: 0}])
		}
	}

	const chooseCity = (city: cityType) => {
		setCoordinates({lat: city.latitude, lon: city.longitude})
		setCities([{city: '', countryCode: '', latitude: 0, longitude: 0}])
		setCity('')
	}

	return (
		<>
			<input type="text" value={city} onChange={(e) => onChangeValue(e.target.value)}></input>
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