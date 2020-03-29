import React, { useCallback, useState } from 'react';
import { Weather } from './weather'

const WeatherInfo: React.FC<{weather: Weather, parentChannel: (msg: string) => void}> = ({weather, parentChannel}) => {

    const [counter, setCounter ] = useState(0)
    const {city, humidity, pressure, temp,temp_max, temp_min} = weather
    const message = "Hello from child"
    const memoizedParentChanneld = useCallback(() => {setCounter(counter+1); parentChannel(message + counter) } ,[parentChannel, message, counter])


    return(
        <div>
            <h2>City: {city}</h2>
            <h2>Humidty: {humidity}</h2>
            <h2>Pressure: {pressure}</h2>
            <h2>Temp: {temp}</h2>
            <h2>Temp max: {temp_max}</h2>
            <h2>Temp min: {temp_min}</h2>
            <button onClick={ memoizedParentChanneld }>Hello from child</button>
        </div>

    )
}

export default WeatherInfo;