import React, { useEffect } from 'react';
import { GoogleLogo } from './components/GoogleLogo';
import qs from 'query-string';
import { Login } from './components/Login';
import Cookies from 'universal-cookie';
import './App.css';
import { format } from 'path';

// console.log()

function App(props) {
  useEffect(() => {
    const query = qs.parse(props.location.search);
    if (query.token) {
      updateToken(query.token);
      props.history.push('/');
    }
  }, [ props.location, props.history ]);

  const updateToken = token => {
    window.localStorage.setItem('token', token);
  }

  return (
    <div className="App">
      <div>
        <Login updateToken={ updateToken } />
      </div>
      <a href="http://localhost:4300/auth/google" className="button">
        <GoogleLogo />
      </a>
    </div>
  );
}

export default App;
