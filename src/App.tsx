import './App.css';
import PictureScreen from './components/screens/RainyScreen/PictureScreen';
import {DarkModeProvider} from './context/DarkModeProvider';
import Content from './components/content/content';
import { WeatherDataProvider } from './context/WeatherDataProvider';
import { WeatherDataOWAPIProvider} from './context/WeatherDataProviderOWAPI';
import { SearchCity } from './components/UI/SearchCity/SearchCity';
import { useState } from 'react';

function App() {
  const [coordinates, setCoordinates] = useState({lat: 55.78, lon: 37.56})

  return (
      <>
       <SearchCity setCoordinates={setCoordinates}/>
        <WeatherDataOWAPIProvider coordinates={coordinates}>
          <WeatherDataProvider coordinates={coordinates}>
            <DarkModeProvider>
              <>
                <PictureScreen/>
                <Content/>
              </>
            </DarkModeProvider>
          </WeatherDataProvider>
        </WeatherDataOWAPIProvider>
      </>
  );
}

export default App;
