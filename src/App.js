import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {

  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  

  const forecastURL = axios.get("https://api.weather.gov/points/40.7128,-74.0060").then((response)=>
    {if(response.data){
      return response.data.properties.forecast;
    } else{
      console.log(response?.errors)
      return Promise.reject("Error");
    }
    });

  async function getForecast(){
    if(forecastURL === null){
      return;
    }
    return axios.get(`${forecastURL}`).then((async (response) => {
      if (response) {
        return response.data;
      } else {
        const error = {
          message: response?.errors?.map((e) => e.message).join("\n"),
        };
        return Promise.reject(error);
      }
    })
  );
  }

  useEffect(() => {
    setLoading(true);
    getForecast().then((res) => {
      setForecast(res);
      console.log(res);
      setLoading(false);
      }
    )
  }, [forecastURL])

  if (loading) {
    return (
      <div className="App">
        <h1>Weather App</h1>
       <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="App">
        <h1>Weather App</h1>
        <div className="content">

        <ol>
        {forecast.properties.periods.slice(0,5).map((data, i) => {
          return (
            <li key={i}>
              <h2>{data.name}</h2>
              <h3>{data.temperature} {data.temperatureUnit}°</h3>
              <h3>Precipitation Chance: {data.probabilityOfPrecipitation.value}%</h3>
              <p>{data.shortForecast}</p>
            </li>
          )
        }
        )}
      </ol>
        </div>
      </div>
    );
  }

}

export default App;
