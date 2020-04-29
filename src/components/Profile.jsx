import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Profile = props => {
  const [ user, setUser ] = useState(null);
  useEffect(() => {
    // get the user
    (async () => {
      try {
        const res = await axios.get('http://localhost:4300/users/me', {
          headers: {
            Authorization: props.token,
          },
        });
        
        setUser(res.data);
      } catch (error) {
        props.onLogout(null);
      }
    })();

  }, [ props ]);
  
  return user ? (
    <div>
      <header>
        <h1>User Profile</h1>
      </header>

      <div>
        Name: { user.username }
      </div>

      <div>
        Email: { user.email }
      </div>

      <button onClick={ props.onLogout }>
        Logout
      </button>

      <button onClick={ props.onLogoutAll }>
        Logout All Devices
      </button>
    </div>
  ) : null;
}