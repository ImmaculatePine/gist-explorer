import React from 'react';
import config from '../config';

const LoginPage = () => {
  const url = `${config.apiHost}/users/auth/github`;
  return (
    <div>
      <p><a href={url}>Sign in with Github</a></p>
    </div>
  )
}

export default LoginPage;
