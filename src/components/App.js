import React, { useState } from 'react';
import repository from "../Repository";
 

function getDayOfWeek(date) {  
  console.log(date);
  var dayOfWeek = new Date(date).getDay();    
  return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
}

function convertKelvinToCelsius(kelvin) {
	if (kelvin < (0)) {
		return 'below absolute zero (0 K)';
	} else {
		return Math.round((kelvin-273.15)); 
	}
}

const DayWeather = props => (                         
  <div className="weather-day">
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

export function App({ initialData }) {  
  const data = repository  
  return (
    <div>      
      <div className="foreCast">      
     {data.list.map(p =>      
          <DayWeather
            weather={p.weather}
            temps={p.main}
            date={p.dt_txt}
          />
        )}
     </div>
    </div>
  )
}
