import React, { PropTypes } from 'react';

const Header = ({ user, onSignOutClick }) => {
  let avatar;
  if (user.avatarUrl) {
    avatar = (<img src={user.avatarUrl} alt='Avatar' className='user-image' />);
  }
  return (
    <header className='main-header'>
      <a href='/' className='logo'>
        <span className='logo-lg'><b>Gist</b> Explorer</span>
      </a>
      <nav className='navbar navbar-static-top'>
        <div className='navbar-custom-menu'>
          <ul className='nav navbar-nav'>
            <li className='user user-menu'>
              <a href={user.url} target='_blank' rel='noopener noreferrer'>
                {avatar}
                <span className='hidden-xs user-name'>{user.name}</span>
              </a>
            </li>
            <li>
              <a href='#' onClick={onSignOutClick}>
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
};

export default Header;
