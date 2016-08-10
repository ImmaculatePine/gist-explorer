import React, { Component, PropTypes } from 'react';
import Gist from './gist';

export default class GistsList extends Component {
  render() {
    const { isFetching, selectedId, onGistClick } = this.props;

    if (isFetching) {
      return (
        <div className='box box-solid'>
          <div className='box-body text-center'>
            Loading...
          </div>
        </div>
      )
    }

    const gists = this.props.gists.map(gist => {
      const isActive = gist.id === selectedId;
      return <Gist key={gist.id} gist={gist} isActive={isActive} onClick={onGistClick} />
    });

    return (
      <div className='box box-solid'>
        <div className='box-body no-padding'>
          <ul className='nav nav-pills nav-stacked'>
            {gists}
          </ul>
        </div>
      </div>
    )
  }
}

GistsList.propTypes = {
  gists: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  onGistClick: PropTypes.func.isRequired
};
