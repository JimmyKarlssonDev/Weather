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


  export {getDayOfWeek, convertKelvinToCelsius}
  