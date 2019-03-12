import {getDayOfWeek, convertKelvinToCelsius} from './Support/Support'
import React, { useState } from 'react';
const HourlyWeather = props =>{  
    return (  
        <div className="hour-weather-container" style={{width: "170px"}}>
       {props.hourlyForecast.map(p =>    
          <div className="hour-weather">        
            <div className="day">{`${p.dt_txt}`}</div>
            <div className="weatherImg">
              <img src={`https://openweathermap.org/img/w/${p.weather[0].icon}.png`}/>
            </div>
            <div className="hour-temps" style={{display: "inline-block", width: "100%"}}>
              <div className="highTemp">{`Temp: ${convertKelvinToCelsius(p.main.temp_max)} °C`}</div>            
            </div>
            </div>                      
        )}
        </div>
        ) 
  }
  
  const HourlyForecastHeader = props => {
    if(!props.searchedCity) return(<div></div>)
    return (
        <div>{`Hourly forecast in ${props.searchedCity}`}</div>
    )
  }


  export {HourlyWeather, HourlyForecastHeader}
  