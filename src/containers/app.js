import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth-actions';
import { AUTH_STATE_UNKNOWN, AUTH_STATE_GUEST, AUTH_STATE_AUTHENTICATED } from '../constants/auth-states';

import LoadingPage from '../components/loading-page';
import LoginPage from '../components/login-page';
import UserPage from '../containers/user-page';

export class App extends Component {
  componentWillMount() {
    this.props.authActions.readTokenFromCookies();
  }

  render() {
    const auth = this.props.auth;

    switch (auth.state) {
      case AUTH_STATE_UNKNOWN:
        return <LoadingPage />

      case AUTH_STATE_GUEST:
        return <LoginPage />

      case AUTH_STATE_AUTHENTICATED:
        return <UserPage />
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
