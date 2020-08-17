import React from 'react';
import GoogleMapAPI from './apps/GoogleMapAPI';
import {Provider} from '../Store';

const App = () => {
  return (
    <main>
      <Provider>
        <GoogleMapAPI />
      </Provider>
    </main>
  );
};

export default App;