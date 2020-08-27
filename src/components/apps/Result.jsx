/* node_modules */
import React from 'react';
/* Store */
import { Store } from '../../Store';

const Result = () => {
  const {state, dispatch} = React.useContext(Store);

  return (
    <>
    {state.result.map(e => (
      <section key={e.id}>
        <p><img src={e.img} alt={e.name} /></p>
        <h3>{e.name}</h3>
        <dl>
          <dt>宿の説明</dt>
          <dd>{e.caption}</dd>
          <dt>キャッチコピー</dt>
          <dd>{e.catchcopy}</dd>
        </dl>
        <p><a href={e.url} target="_brank">オフィシャルサイト</a></p>
      </section>
    ))}
    </>
  );
};

export default Result;