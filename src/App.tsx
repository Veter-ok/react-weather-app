import React, { useEffect, useState } from 'react';
import './App.css';
import { Input } from './components/UI/Input/Input';
import RainyScreen from './components/screens/RainyScreen/RainyScreen';
import WeatherDataBlock from './components/UI/weatherDataBlock/weatherDataBlock';

function App() {
  const [text, setText] = useState('')
  const [data, setData] = useState('')

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=55.78&longitude=37.56&hourly=temperature_2m').then((response) => {
      response.json().then((data) => {
        setData(data)
      })
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  return (
    <>
      <Input value={text} onChange={setText}/>
      <RainyScreen/>
      <div className="content">
        <WeatherDataBlock/>
      </div>
    </>
  );
}

export default App;
