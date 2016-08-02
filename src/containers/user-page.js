import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/auth-actions';
import User from '../components/user';

export class UserPage extends Component {
  render() {
    const { user } = this.props;
    const { signOut } = this.props.authActions;
    return <User user={user} onSignOutClick={signOut} />
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
