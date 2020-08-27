/* node_modules */
import React from 'react';
/* Components */
import GoogleMapAPI from './apps/GoogleMapAPI';
import Hotel from './apps/Hotel';
/* Store */
import { Provider } from '../Store';

const App = () => {
  const [latlng, setLatlng] = React.useState();

  const handleChange = val => setLatlng(val);

  return (
    <main>
      <Provider>
        <GoogleMapAPI latlng={latlng} />
      </Provider>
      <Provider>
        <Hotel onChange={handleChange} />
      </Provider>
    </main>
  );
};

export default App;