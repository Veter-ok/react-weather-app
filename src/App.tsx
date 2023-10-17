import './App.css';
import PictureScreen from './components/screens/PictureScreen';
import {DarkModeProvider} from './context/DarkModeProvider';
import Content from './components/content/content';
import { WeatherDataOWAPIProvider} from './context/WeatherDataProviderOWAPI';
import { SearchCity } from './components/UI/SearchCity/SearchCity';
import { useState } from 'react';
import { WeatherDataProvider } from './context/WeatherDataProvider';

function App() {
  const [city, setCity] = useState({
    cityName: "Moscow",
    coordinates: {lat: 55.78, lon: 37.56},
  })

  return (
      <>
       <SearchCity setCity={setCity}/>
        <WeatherDataOWAPIProvider city={city}>
          <WeatherDataProvider coordinates={city.coordinates}>
            <DarkModeProvider>
              <>
                <PictureScreen city={city}/>
                <Content city={city}/>
              </>
            </DarkModeProvider>
          </WeatherDataProvider>
        </WeatherDataOWAPIProvider>
      </>
  );
}

export default App;
