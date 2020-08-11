import React from 'react';
import Text from './components/Text';
import './images/icon.PNG';

const App = () => {
  const [name, setName] = React.useState('world');

  const handleChange = e => setName(e.target.value);

  return (
    <main>
      <h1 className="welcome">Hello, {name}</h1>
      <div>
        <p><img src="./images/icon.PNG" alt="" width="100" /></p>
        <Text onChange={handleChange} />
      </div>
    </main>
  );
};

export default App;