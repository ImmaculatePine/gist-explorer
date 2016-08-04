import React, { PropTypes } from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import FixLayout from '../utils/fix-layout';

export class User extends React.Component {
  componentWillMount() {
    this._updateBodyClass()
  }

  componentDidMount() {
    this.fixLayout = new FixLayout();
    this.fixLayout.activate();
  }

  componentWillUnmount() {
    this.fixLayout.deactivate();
  }

  render() {
    const { user, onSignOutClick } = this.props;
    return (
      <div className='wrapper'>
        <Header user={user} onSignOutClick={onSignOutClick} />
        <Sidebar />
        <div className='content-wrapper'>
          <section className='content-header'>
          </section>
          <section className='content'>
          </section>
        </div>
        <Footer />
      </div>
    )
  }

  _updateBodyClass() {
    const body = document.getElementsByTagName('body')[0];
    body.className = 'hold-transition skin-blue sidebar-mini';
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onSignOutClick: PropTypes.func.isRequired
};

export default User;
