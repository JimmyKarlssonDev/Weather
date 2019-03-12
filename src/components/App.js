import React, { useState } from 'react';
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
      ) }
      </div>
      ) 
}

const HourlyForecastHeader = props => {
  if(!props.searchedCity) return(<div></div>)
  return (
      <div>{`Hourly forecast in ${props.searchedCity}`}</div>
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
