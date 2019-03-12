import React, { useState } from 'react';
import WeatherData from "../Repository";
const http = require('axios');
 

function getDayOfWeek(date) {  
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


const HourlyWeather = props =>{  
  return (  
      <div>
     { props.hourlyForecast.map(p =>    
        <div >
         <div>{getDayOfWeek(p.date)}</div>
          <div>{`${convertKelvinToCelsius(p.main.temp_max)} °C`}</div>
          <div>{`${convertKelvinToCelsius(p.main.temp_min)} °C`}</div>
        </div>               
      ) }
      </div>
      ) 
  }


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



export function App({ initialData }) {  
  const [hrForecast, setHrForecast] = useState([]);
  const [wd, setWd] = useState([])
  const doSearch = (input) => {  
  setWd(WeatherData.list)
 /*  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${input},us&mode=json&APPID=5abf3bbb00199842f7dd9cdeedfe56f0`
  http.get(url)
    .then(function(resp){
      console.log('setWd')
      setWd(resp.data.list)
    })
    .catch(function(error){
      console.log(error)
    }) */
  } 
  function setStuff(selectedDate){
    let date = new Date(selectedDate)

    //Weird
    let dateString = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`    
    setHrForecast(wd.filter(a => a.dt_txt.includes(dateString)))    
  }
  return (
    <div >              
      <input id="search-input"></input>   
      <button onClick={ () => doSearch(document.getElementById("search-input").value)}>Search</button>
      <div className="foreCast">      
      {wd.filter(a=>a.dt_txt.includes("12:00:00")).map(p =>      
          <DayWeather
            key={p.dt}
            weather={p.weather}
            hourlyWeather={wd}
            temps={p.main}
            date={p.dt_txt}
            onClick={setStuff}
          />
        )}
     </div>
     <div className="hourlyForecast">
     <div>       
      <HourlyWeather
        hourlyForecast={hrForecast}
      />     
    </div>  
     </div>
    </div>
  )
}
