/* node_modules */
import React from 'react';
import GoogleMapReact from 'google-map-react';
/* Components */
import Weather from './Weather';
import MapOptions from './MapOptions';
/* img */
import '../../images/marker.png';
/* API */
import { GCP_KEY } from '../../API';
/* Store */
import { Store } from '../../Store';

const InfoWindow = ({current, value, word, close}) => (
  current === value ? (
    <div className="balloon">
      <div className="my-parts" onClick={close}><span></span></div>
      <p>{word}</p>
      <a
        href={`https://www.google.com/search?q=${word}&oq=${word}&aqs=chrome..69i57j0l7.2885j0j7&sourceid=chrome&ie=UTF-8`}
        target="_blank"
      >
        検索する
      </a>
    </div>
  ) : null
);

const Marker = ({current, value, word, onClick, close}) => (
  <div className="wrapper">
    <button className="pin" value={value} onClick={onClick} ></button>
    {current && <InfoWindow value={value} word={word} close={close} current={current} />}
  </div>
);

const getMapBounds = (places, bounds) => {
  places.map(place => {
    bounds.extend(new google.maps.LatLng(
      place.lat,
      place.lng
    ));
  });

  return bounds;
};

const GoogleMapAPI = ({latlng}) => {
  /* State */
  const {state, dispatch} = React.useContext(Store);
  const [current, setCurrent] = React.useState(null);
  const [map, setMap] = React.useState(null);

  /* handler */
  const handleClick = e => {
    setCurrent(Number(e.target.value));
  };
  const close = () => setCurrent(null);

  React.useEffect(() => {
    if(latlng) {
      const bounds = new google.maps.LatLngBounds();
      const place = getMapBounds(latlng, bounds);
      map.map.fitBounds(place);
    }
  }, [ latlng ]);

  return (
    <article id="leftBox" className="box">
      <section id="google-map-wrapper">
        <h3 className="none">GoogleMAP</h3>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GCP_KEY }}
          defaultCenter={{
            lat: state.center.lat,
            lng: state.center.lng
          }}
          defaultZoom={state.zoom}
          id="google-map-area"
          options={{
            mapTypeId: state.mapTypeId,
            mapTypeControl: state.mapTypeControl,
            zoomControl: state.zoomControl,
            streetViewControl: state.streetViewControl,
            fullscreenControl: state.fullscreenControl
          }}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={(map, maps) => {
            setMap(map);
          }}
        >
          {latlng ? (
            latlng.map((e, key) => (
              <Marker
                key={key}
                lat={e.lat}
                lng={e.lng}
                word={e.name}
                current={current}
                value={key + 1}
                onClick={handleClick}
                close={close}
              />
            ))
          ) : null}
        </GoogleMapReact>
      </section>
      {latlng ? <Weather latlng={{area: latlng[0].area, lat: latlng[0].lat, lon: latlng[0].lng}} /> : <Weather latlng="" />}
      <MapOptions />
    </article>
  );

};

export default GoogleMapAPI;