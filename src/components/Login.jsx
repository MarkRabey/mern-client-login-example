import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const Login = props => {
  const [ email, setEmail ] = useState('mark.rabey@georgiancollege.ca');
  const [ password, setPassword ] = useState('password');
  const [ token, setToken ] = useState(cookies.get('token'));
  const [ message, setMessage ] = useState(null);

  useEffect(() => {
    cookies.set('token', token, { path: '/' });
  }, [ token ]);

  const handleSubmit = e => {
    e.preventDefault();
    setMessage(null);
    axios({
      method: 'post',
      url: 'http://localhost:4300/users/login',
      data: qs.stringify({ email, password }),
      
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(({ data }) => setToken(data.token))
    .catch(e => {
      setMessage('Invalid login');
      setToken(null);
    });
  }

  return (
    <div>
      { message && <div><h3>{ message }</h3></div> }
      <header>
        <h1>Login</h1>
      </header>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email address"
          onChange={ e => setEmail(e.target.value) }
          value={ email } />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={ e => setPassword(e.target.value) }
          value={ password } />
      </div>
      <div>
        <button onClick={ handleSubmit }>
          Submit
        </button>
      </div>
      <div style={{ width: '50%' }}>
        Token: { token ? token : 'null' }
      </div>
    </div>
  );
}
