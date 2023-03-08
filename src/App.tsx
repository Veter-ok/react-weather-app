import React, {useState } from 'react';
import './App.css';
import { Input } from './components/UI/Input/Input';
import PictureScreen from './components/screens/RainyScreen/PictureScreen';
import {DarkModeProvider} from './context/DarkModeProvider';
import Content from './components/content/content';
import { WeatherDataProvider } from './context/WeatherDataProvider';
import { WeatherDataOWAPIProvider} from './context/WeatherDataProviderOWAPI';

function App() {
  const [text, setText] = useState('')
  return (
      // <WeatherDataOWAPIProvider>
      <WeatherDataProvider>
        <DarkModeProvider>
          <>
            <Input value={text} onChange={setText}/>
            <PictureScreen/>
            <Content/>
          </>
        </DarkModeProvider>
      </WeatherDataProvider>
      // {/* </WeatherDataOWAPIProvider> */}
  );
}

export default App;
