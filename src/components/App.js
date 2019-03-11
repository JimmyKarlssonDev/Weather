import React, { useState } from 'react';
import repository from "../Repository";

function getDayOfWeek(date) {  
  console.log(date);
  var dayOfWeek = new Date(date).getDay();    
  console.log(dayOfWeek);
  return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
}

const DayWeather = props => ( 
  <div className="weather-day">
  <div className="week-day">  
    <div className="day">{getDayOfWeek(props.date)}</div>
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
     {data.list.map(p => 
     
          <DayWeather
            weather={p.weather}
            temps={p.main}
            date={p.dt_txt}
          />
        )};
      
     </div>
    </div>
  )

}
