import React from 'react';
import Reducer from './Reducer';

const initialState = {
  center: {
    lat: 34.6669453,
    lng: 134.9640429
  },
  zoom: 8,
  mapTypeId: 'roadmap',
  mapTypeControl: false,
  fullscreenControl: false,
  streetViewControl: false,
  zoomControl: false,
};

const Store = React.createContext();

const Provider = ({children}) => {
  const [state, dispatch] = React.useReducer(Reducer, initialState);

  return <Store.Provider value={{state, dispatch}}>{children}</Store.Provider>;
};

export { Store, Provider };


