import React, { useState, useEffect } from 'react';
import qs from 'query-string';
import { GoogleLogo } from './components/GoogleLogo';
import { Login } from './components/Login';
import { Profile } from './components/Profile';
import Cookies from 'universal-cookie';
import './App.css';
import { format } from 'path';

console.log(process.env.REACT_APP_API_BASE);

function App(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const query = qs.parse(props.location.search);
    console.log(query);
    if (query.token) {
      updateToken(query.token);
      setToken(query.token);
      props.history.push('/');
    }
  }, [ props.location, props.history ]);

  const updateToken = token => {
    window.localStorage.setItem('token', token);
  }

  if (token) {
    return <Profile token={ token } />
  }

  return (
    <div className="App">
      <div>
        <Login updateToken={ updateToken } />
      </div>
      <a href={ `${ process.env.REACT_APP_API_BASE }/auth/google` } className="button">
        <GoogleLogo />
      </a>
    </div>
  );
}

export default App;
