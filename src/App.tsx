import React, {useState } from 'react';
import './App.css';
import { Input } from './components/UI/Input/Input';
import PictureScreen from './components/screens/RainyScreen/PictureScreen';
import {DarkModeProvider} from './context/DarkModeProvider';
import Content from './components/content/content';
import { WeatherDataProvider } from './context/WeatherDataProvider';

function App() {
  const [text, setText] = useState('')
  return (
    <WeatherDataProvider>
      <DarkModeProvider>
        <>
          <Input value={text} onChange={setText}/>
          <PictureScreen/>
          <Content/>
        </>
      </DarkModeProvider>
    </WeatherDataProvider>
  );
}

export default App;
