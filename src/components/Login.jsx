import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import Cookies from 'universal-cookie';
import { GoogleLogo } from './GoogleLogo';

export const Login = props => {
  const [ email, setEmail ] = useState('mark.rabey@georgiancollege.ca');
  const [ password, setPassword ] = useState('password');
  const [ message, setMessage ] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setMessage(null);
    axios({
      method: 'post',
      url: 'http://localhost:4300/users/login',
      data: qs.stringify({ email, password }),
      
    }, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }).then(({ data }) => props.updateToken(data.token))
    .catch(e => {
      setMessage('Invalid login');
      props.updateToken(null);
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
      <h2>OR</h2>
      <div>
        <a href="/auth/google" class="button">
          <GoogleLogo />
        </a>
      </div>
    </div>
  );
}
