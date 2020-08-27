/* node_modules */
import React from 'react';
/* Store */
import { Store } from '../../Store';

const Marker = () => {
  const {state, dispatch} = React.useContext(Store);
  // console.log(state);
  return (
    <>
    {state.result ? (
      console.log(state)
      // state.result.map((e, key) => {
      //   <Pin
      //     key={key}
      //     lat={e.lat}
      //     lng={e.lng}
      //   >
      //     {e.name}
      //   </Pin>
      // })
    ) : null}
    </>
  )
};

export default Marker;