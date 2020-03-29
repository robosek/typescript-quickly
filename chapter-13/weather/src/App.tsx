import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import { Weather } from './weather'
import  WeatherInfo  from './WeatherInfo'

function App() {

  const [city, setCity] = useState('Gdańsk')
  const [weather, setWeather] = useState<Weather | null>(null)
  const [msgFromChild, setMsgFromChild] = useState('')
  const getMsgFromChild = (msg: string) => setMsgFromChild(msg)

  const url = "http://api.openweathermap.org/data/2.5/weather?q="
  const suffix = "&appid=42a104ff04103825c221c6fd498adcd7"

  const changeHandler = (change: ChangeEvent<HTMLInputElement>) => {
    setCity(change.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    getWeather(city)
  }

  const getWeather = async (city: string) => {
    const response = await fetch(url + city + suffix)
    if(response.status === 200){
      const content = await response.json()
      const cityTemp: Weather = content.main
      cityTemp.city = content.name
      setWeather(cityTemp)
    }
    else{
      setWeather(null)
    }

  }

  useEffect(() => { getWeather('Gdańsk') } ,[]);

  const has = (value:any):value is Boolean => !!value 

  return (
      
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter city" onChange={changeHandler} />
        <button type="submit">Get weather</button>
        {has(weather) ? (<WeatherInfo weather={weather} parentChannel={getMsgFromChild} />) : (<h2>No weather</h2>) }
      </form>
      <h2>{msgFromChild}</h2>
    </div>
  );
}

export default App;
