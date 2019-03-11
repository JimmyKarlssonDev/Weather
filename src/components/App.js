import React, { useState } from 'react';
import repository from "../Repository";

const  weeKdays = {
  "Mon" : "Monday",
  "Tue" : "Tuesday",
  "Wed" : "Wednesday",
  "Thu" : "Thursday",
  "Fri" : "Friday"
}

const DayWeather = props => 
(
  <div className="weather-day">
  <div className="week-day">
    <div className="day">Mon</div>
    <div className="weatherImg">IMG</div>
    <div className="temps">   
      <div className="highTemp">{props.temps.temp_max}</div>
      <div className="lowTemp">{props.temps.temp_min}</div>
    </div>
  </div> 
</div>                                  
)

export function App({ initialData }) {  
  const data = repository
  
  return (
    <div>      
      <div className="5-foreCast">      
     { data.list.map(p => 
          <DayWeather
            weather={p.weather}
            temps={p.main}
          />
        )};
      
     </div>
    </div>
  )

}
