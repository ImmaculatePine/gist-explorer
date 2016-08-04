import React, { Component } from 'react';
import config from '../config';

export class LoginPage extends Component {
  componentWillMount() {
    this._updateBodyClass()
  }

  render() {
    const url = `${config.apiHost}/users/auth/github`;
    return (
      <div className='login-box'>
        <div className='login-logo'>
          <a href='/'><b>Gist</b> Explorer</a>
        </div>
        <div className='login-box-body'>
          <p className='login-box-msg'>Sign in to start your session</p>
          <div className='social-auth-links text-center'>
            <a href={url} className='btn btn-block btn-social btn-github btn-flat'>
              <i className='fa fa-github'></i> Sign in using GitHub
            </a>
          </div>
        </div>
      </div>
    )
  }

  _updateBodyClass() {
    const body = document.getElementsByTagName('body')[0];
    body.className = 'hold-transition login-page';
  }
}

export default LoginPage;
