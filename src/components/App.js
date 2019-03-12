import React, { useState } from 'react';
import {HourlyWeather, HourlyForecastHeader} from './HourlyWeather'
import {DayWeather} from './DailyWeather'

const http = require('axios');

export function App({ initialData }) {  
  const [hrForecast, setHrForecast] = useState([]);
  const [city, setCity] = useState('');
  const [wd, setWd] = useState([])
  const [httpError, setHttpError] = useState()

  const doSearch = (input) => {    
  let url = `http://api.openweathermap.org/data/2.5/forecast?q=${input},us&mode=json&APPID=5abf3bbb00199842f7dd9cdeedfe56f0`
  http.get(url)
    .then(function(resp){      
      setWd(resp.data.list)
      setCity(resp.data.city.name)
      setHrForecast([])
      setHttpError()
    })
    .catch(function(error){
      setHttpError(error.response.status)
    })
  } 
  
  function setStuff(selectedDate){
    let date = new Date(selectedDate)
    //Weird
    let dateString = `${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}`    
    setHrForecast(wd.filter(a => a.dt_txt.includes(dateString)))    
  }
  return (
    <div className="main">             
      <input type="text" placeholder="City..." id="search-input"></input>       
      <a href="#"  onClick={ () => doSearch(document.getElementById("search-input").value)} className="myButton">Search</a>  
      <div>
        <p>{httpError}</p>                 
      </div>
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
     <div>    
       <HourlyForecastHeader 
        searchedCity={city}
       />
     </div>
     <div className="hourlyForecast">
     <div>       
      <HourlyWeather
        key={1}
        hourlyForecast={hrForecast}
      />     
    </div>  
     </div>
    </div>
  )
}
