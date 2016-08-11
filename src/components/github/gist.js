import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import LabelsList from '../labels-list';

export default class Gist extends Component {
  render() {
    const { gist, isActive, onClick } = this.props;
    const filenames = Object.keys(gist.files);
    const firstFile = gist.files[filenames[0]];
    const title = firstFile.filename;
    const createdAtInWords = moment(gist.createdAt).fromNow();

    let privateIcon;
    if (!gist.public) {
      privateIcon = (<span className='pull-right'>
        <i className='fa fa-lock' />
      </span>);
    }

    return (
      <li className={isActive ? 'active' : ''}>
        <a href='#' onClick={() => { onClick(gist.id); }}>
          {privateIcon}
          <b className='gist-title'>{title}</b>
          <br />
          <small className='gist-created-at'>Created {createdAtInWords}</small>
          <p className='gist-description'>{gist.description}</p>
          <div className='labels'>
            <i className='fa fa-tags' /> <LabelsList labels={gist.labels} />
          </div>
        </a>
      </li>
    );
  }
}

Gist.propTypes = {
  gist: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
