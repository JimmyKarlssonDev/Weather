import React, { useState } from 'react';

const  weeKdays = {
  "Mon" : "Monday",
  "Tue" : "Tuesday",
  "Wed" : "Wednesday",
  "Thu" : "Thursday",
  "Fri" : "Friday"
}
const DayWeather = props => (
  <div className="weather-day">
  <div className="week-day">
    <div className="day">Mon</div>
    <div className="weatherImg">IMG</div>
    <div className="temps">   
      <div className="highTemp">15</div>
      <div className="lowTemp">25</div>
    </div>
  </div>
</div>
)

export function App({ initialData }) {
  return (
    <div>
      <div className="5-foreCast">      
      <DayWeather />
     </div>
    </div>
  );

}
