import React, { PropTypes } from 'react';

let User = ({ user, onSignOutClick }) => {
  return <div>
    <p>Hi, {user.name}</p>
    <p>
      <button onClick={onSignOutClick}>Sign out</button>
    </p>
  </div>
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  onSignOutClick: PropTypes.func.isRequired
};

export default User;
