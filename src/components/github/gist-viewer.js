import React, { Component, PropTypes } from 'react';
import File from './file';

export default class GistViewer extends Component {
  render() {
    const { token, isFetching, gist, labels, onLabelSelect } = this.props;

    if (isFetching) {
      return (
        <div className='box box-solid'>
          <div className='box-body text-center'>
            Loading...
          </div>
        </div>
      )
    }

    if (gist === undefined) {
      return (
        <div className='box box-solid'>
          <div className='box-body text-center'>
            Please, select a gist
          </div>
        </div>
      )
    }

    const filenames = Object.keys(gist.files);
    const title = gist.files[filenames[0]].filename;
    const files = filenames.map(filename => {
      const file = gist.files[filename];
      return <File key={file.filename} file={file} />
    });

    return (
      <div>
        <div className='box box-primary'>
          <div className='box-body'>
            <b>{title}</b>
            <ul>
              {labels.map(
                label => {
                  return (
                    <li key={label.id}>
                      <input
                        type='checkbox'
                        checked={this._hasLabel(label)}
                        onChange={() => { onLabelSelect(token, label.id, gist.id) }}
                      />
                      {label.name}
                    </li>
                  )
                }
              )}
            </ul>
          </div>
        </div>
        {files}
      </div>
    )
  }

  _hasLabel(label) {
    return this.props.gist.labels.map(label => label.id).includes(label.id);
  }
}

GistViewer.propTypes = {
  token: PropTypes.string.isRequired,
  gist: PropTypes.object,
  labels: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLabelSelect: PropTypes.func.isRequired
};
