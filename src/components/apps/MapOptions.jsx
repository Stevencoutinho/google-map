/* node_modules */
import React from 'react';
/* Store */
import { Store } from '../../Store';

const MapOptions = () => {
  const {state, dispatch} = React.useContext(Store);

  const handleChange = e => dispatch({type: e.target.name, value: e.target.value});

  return (
    <section id="google-map-opt">
      <h3 className="none">googleMAPオプション</h3>
      <form id="mapOption">
        <dl>
          <dt>地図の種類</dt>
          <dd><select name="mapTypeId" id="mapTypeId" onChange={handleChange}>
            <option value="roadmap">ROADMAP</option>
            <option value="satellite">SATELLITE</option>
            <option value="hybrid">HYBRID</option>
            <option value="terrain">TERRAIN</option>
          </select></dd>
          <dt>地図ボタン</dt>
          <dd>
            <label>true:&nbsp;
              <input
                type="radio"
                name="mapTypeControl"
                value="true"
                onChange={handleChange}
                checked={state.mapTypeControl}
              />
            </label>
            <label>false:&nbsp;
              <input
                type="radio"
                name="mapTypeControl"
                value="false"
                onChange={handleChange}
                checked={!state.mapTypeControl}
              />
            </label>
          </dd>
          <dt>全画面表示コントロール</dt>
          <dd>
            <label>true:&nbsp;
              <input
                type="radio"
                name="fullscreenControl"
                value="true"
                onChange={handleChange}
                checked={state.fullscreenControl}
              />
            </label>
            <label>false:&nbsp;
              <input
                type="radio"
                name="fullscreenControl"
                value="false"
                onChange={handleChange}
                checked={!state.fullscreenControl}
              />
            </label>
          </dd>
          <dt>ストリートビューコントロール</dt>
          <dd>
            <label>true:&nbsp;
              <input
                type="radio"
                name="streetViewControl"
                value="true"
                onChange={handleChange}
                checked={state.streetViewControl}
              />
            </label>
            <label>false:&nbsp;
              <input
                type="radio"
                name="streetViewControl"
                value="false"
                onChange={handleChange}
                checked={!state.streetViewControl}
              />
            </label>
          </dd>
          <dt>ズームコントロール</dt>
          <dd>
            <label>true:&nbsp;
              <input
                type="radio"
                name="zoomControl"
                value="true"
                onChange={handleChange}
                checked={state.zoomControl}
              />
            </label>
            <label>false:&nbsp;
              <input
                type="radio"
                name="zoomControl"
                value="false"
                onChange={handleChange}
                checked={!state.zoomControl}
              />
            </label>
          </dd>
        </dl>
      </form>
    </section>
  );
};

export default MapOptions;