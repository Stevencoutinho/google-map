/* node_modules */
import React from 'react'
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
/* Store */
import { Store } from '../../Store';
/* API */
import { API_URL } from '../../API';
/* Components */
import Result from './Result';

const Hotel = ({onChange}) => {
  const {state, dispatch} = React.useContext(Store);
  const [tagName, setTagName] = React.useState('Region');
  const [req, setReq] = React.useState({});

  const handleChange = e => {
    setReq({key: e.target.id, val: e.target.value});
    switch(e.target.name) {
      case 'Region':
        setTagName('Prefecture');
        return;
      case 'Prefecture':
        setTagName('LargeArea');
        return;
      case 'LargeArea':
        setTagName('SmallArea')
        return;
    }
  };

  React.useEffect(() => {
    let url = API_URL;
    if(req.key) {
      url +=`?${req.key}=${req.val}`;
    }
    axios.get(url)
    .then(res => new DOMParser().parseFromString(res.data, 'text/xml'))
    .then(xml => {
      let ary = [];
      if(req.key === 's_area') {
        let promises = [];
        const geocoder = new google.maps.Geocoder();

        const promiseFunc = val => {
          return new Promise((resolve, reject) => {
            geocoder.geocode({
              address: val,
              region: "jp"
            }, (results, status) => {
              if(status === "OK") {
                resolve({
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng()
                });
              }else {
                reject(status);
              }
            })
          });
        };

        Array.from(xml.getElementsByTagName('Hotel')).map(e => {
          promises.push(promiseFunc(e.children[3].textContent));
          ary.push({
            id: e.children[0].textContent,
            name: e.children[1].textContent,
            url: e.children[6].textContent,
            catchcopy: e.children[7].textContent,
            caption: e.children[8].textContent,
            img: e.children[9].textContent,
            area: e.children[4].children[3].textContent
          });
        });
        Promise.all(promises)
          .then(val => {
            let latlng = [];
            val.map((e, key) => {
              latlng.push({lat: e.lat, lng: e.lng, name: ary[key].name, url: ary[key].url, area: ary[key].area});
            });
            onChange(latlng);
          })
          .catch(err => console.log(err));
        dispatch({type: 'Hotel', value: ary});
      }else {
        Array.from(xml.getElementsByTagName(tagName)).map(e => {
          ary.push({cd: e.attributes.cd.value, name: e.attributes.name.value});
          dispatch({type: tagName, value: ary});
        });
      }
    })
    .catch(err => console.log(err));
  },[ req ]);
  return (
    <div id="rightBox" className="box">
      <article id="search">
        <h2 className="none">じゃらん宿検索</h2>
        <section id="hotelSearch">
          <h3>宿を検索する</h3>
          <form>
            <dl>
              <dt>地域</dt>
              <dd>
                <select
                  name="Region"
                  id="reg"
                  onChange={handleChange}
                >
                  {state.hotel.reg ? (
                    <>
                      {!Object.keys(req).length && <option>選択してください</option>}
                      {state.hotel.reg.map(e => (
                        <option key={e.cd} value={e.cd}>{e.name}</option>
                      ))}
                    </>
                  ) : <option>読み込み中です...</option>}
                </select>
              </dd>
              <dt>都道府県</dt>
              <dd>
                <select
                  name="Prefecture"
                  id="pref"
                  onChange={handleChange}
                >
                  {state.hotel.pref ? (
                    <>
                      {req.key === 'reg' && <option>選択してください</option>}
                      {state.hotel.pref.map(e => (
                        <option key={e.cd} value={e.cd}>{e.name}</option>
                      ))}
                    </>
                  ): null}
                </select>
              </dd>
              <dt>大エリア</dt>
              <dd>
                <select
                  name="LargeArea"
                  id="l_area"
                  onChange={handleChange}
                >
                  {state.hotel.l_area ? (
                    <>
                      {req.key === 'pref' && <option>選択してください</option>}
                      {state.hotel.l_area.map(e => (
                        <option key={e.cd} value={e.cd}>{e.name}</option>
                      ))}
                    </>
                  ): null}
                </select>
              </dd>
              <dt>小エリア</dt>
              <dd>
                <select
                  name="SmallArea"
                  id="s_area"
                  onChange={handleChange}
                >
                  {state.hotel.s_area ? (
                    <>
                      {req.key === 'l_area' && <option>選択してください</option>}
                      {state.hotel.s_area.map(e => (
                        <option key={e.cd} value={e.cd}>{e.name}</option>
                      ))}
                    </>
                  ): null}
                </select>
              </dd>
            </dl>
          </form>
        </section>
      </article>
      <article id="result">
        <h2 className="none">検索結果</h2>
        {state.result ? <Result /> : null}
      </article>
    </div>
  );
};

export default Hotel;