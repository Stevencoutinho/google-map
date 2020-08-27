/* node_modules */
import React from 'react';
/* API_KEY */
import { WEATHER_KEY, WEATHER_URL } from '../../API';

const Weather = ({latlng}) => {
  /* State */
  const [weather, setWeather] = React.useState();
  const [req, setReq] = React.useState({area: null});
  /* useEffect */
  React.useEffect(() => {
    if(latlng) {
      if(req.area !== latlng.area) {
        fetch(`${WEATHER_URL}?lat=${latlng.lat}&lon=${latlng.lon}&appid=${WEATHER_KEY}`)
        .then(res => res.json())
        .then(json => setWeather(json))
        .catch(err => console.log(err));

        setReq({...req, area: latlng.area, lat: latlng.lat, lon: latlng.lng});
      }
    }
  }, [ latlng ]);

  return (
    <section id="weather">
      <h3>天気</h3>
      {weather ? (
        <>
        <div>
          <p>{req.area}</p>
          <p><img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" /></p>
        </div>
        </>
      ) : <p>検索してください</p>}
    </section>
  );
};

export default Weather;