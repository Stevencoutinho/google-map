/* node_modules */
import React from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
/* Components */
import MapOptions from './MapOptions';
/* API_KEY */
import { API_KEY } from '../../../API_KEY';
/* Store */
import { Store } from '../../Store';

const GoogleMapAPI = () => {
  const {state, dispatch} = React.useContext(Store);
  
  return (
    <article>
      <section id="google-map-wrapper">
        <h3 className="none">GoogleMAP</h3>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
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
        >
        </GoogleMapReact>
      </section>
      <MapOptions />
    </article>

  );

};

export default GoogleMapAPI;