import React, { Component, PropTypes } from 'react';
import moment from 'moment';

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

    let labels = <span className='no-labels'>No labels</span>;
    if (gist.labels.length) {
      labels = gist.labels.map(label => label.name).join(', ');
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
            <i className='fa fa-tags' /> {labels}
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
