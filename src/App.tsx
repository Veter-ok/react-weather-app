import React, { useState } from 'react';
import './App.css';
import { Input } from './components/UI/Input/Input';
import RainyScreen from './components/UI/RainyScreen/RainyScreen';
import WeatherDataBlock from './components/UI/weatherDataBlock/weatherDataBlock';

function App() {
  const [text, setText] = useState('')

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
