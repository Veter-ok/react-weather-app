import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import { Input } from './components/UI/Input/Input';
import PictureScreen from './components/screens/RainyScreen/PictureScreen';
import WeatherDataBlock from './components/UI/weatherDataBlock/weatherDataBlock';

interface IweatherData {
  times: string[]
  temperatures: number[]
  humidity: number[]
  windSpeed: number[]
}

export const WeatherDataContext = createContext<IweatherData>({
  times: [],
  temperatures: [],
  humidity: [],
  windSpeed: []
});

function App() {
  const [text, setText] = useState('')
  const [windSpeed, setWindSpeed] = useState([])
  const [times, setTimes] = useState([])
  const [temperature, setTemperature] = useState([])
  const [humidity, setHumidity] = useState([])

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=55.78&longitude=37.56&hourly=temperature_2m,relativehumidity_2m,cloudcover_low,windspeed_10m').then((response) => {
      response.json().then((data) => {
        setTemperature(data.hourly.temperature_2m)
        setHumidity(data.hourly.relativehumidity_2m)
        setWindSpeed(data.hourly.windspeed_10m)
        setTimes(data.hourly.time)
        console.log(data)
      })
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <WeatherDataContext.Provider value={{times: times, temperatures: temperature, humidity: humidity, windSpeed: windSpeed}}>
      <Input value={text} onChange={setText}/>
      <PictureScreen/>
      <div className="content">
        <WeatherDataBlock/>
      </div>
    </WeatherDataContext.Provider>
  );
}

export default App;
