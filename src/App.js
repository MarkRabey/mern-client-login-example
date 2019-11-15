import React, { useEffect } from 'react';
import { GoogleLogo } from './components/GoogleLogo';
import qs from 'query-string';
import './App.css';

// console.log()

function App(props) {
  useEffect(() => {
    const query = qs.parse(props.location.search);
    if (query.token) {
      window.localStorage.setItem('jwt', query.token);
      props.history.push('/');
    }
  }, [ props.location, props.history ]);
  return (
    <div className="App">
      <a href="http://localhost:4300/auth/google" className="button">
        <GoogleLogo />
      </a>
    </div>
  );
}

export default App;
