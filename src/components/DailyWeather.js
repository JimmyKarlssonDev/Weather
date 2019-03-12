import React from 'react';
import {getDayOfWeek, convertKelvinToCelsius} from './Support/Support'
const DayWeather = props => 
{
  return ( 
    <div onClick={() => props.onClick(props.date)} className="weather-day">
      <div className="week-day" >  
        <div className="day">{getDayOfWeek(props.date)}</div>
        <div className="weatherImg">
          <img src={`https://openweathermap.org/img/w/${props.weather[0].icon}.png`}/>
        </div>
        <div className="temps">   
          <div className="highTemp">{`${convertKelvinToCelsius(props.temps.temp_max)} °C`}</div>
          <div className="lowTemp">{`${convertKelvinToCelsius(props.temps.temp_min)} °C`}</div>
        </div>
      </div>      
    </div>
)
}

export {DayWeather}
