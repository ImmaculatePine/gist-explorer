import React, { PropTypes } from 'react';

let User = ({ user, onSignOutClick }) => {
  return <div>
    <p className='greetings'>Hi, {user.name}</p>
    <button onClick={onSignOutClick}>Sign out</button>
  </div>
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onSignOutClick: PropTypes.func.isRequired
};

export default User;
