import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import File from './file';

export default class GistViewer extends Component {
  _hasLabel(label) {
    return this.props.gist.labels.map(l => l.id).includes(label.id);
  }

  render() {
    const { token, isFetching, gist, labels, onLabelSelect } = this.props;

    if (isFetching) {
      return (
        <div className='box box-solid'>
          <div className='box-body text-center'>
            Loading...
          </div>
        </div>
      );
    }

    if (gist === undefined) {
      return (
        <div className='box box-solid'>
          <div className='box-body text-center'>
            Please, select a gist
          </div>
        </div>
      );
    }

    const filenames = Object.keys(gist.files);
    const title = gist.files[filenames[0]].filename;
    const files = filenames.map(filename => {
      const file = gist.files[filename];
      return (<File key={file.filename} file={file} />);
    });

    const format = 'DD/MM/YYYY';
    const createdAt = moment(gist.createdAt).format(format);
    const updatedAt = moment(gist.updatedAt).format(format);

    return (
      <div>
        <div className='box box-primary'>
          <div className='box-header with-border'>
            <b>{title}</b>
            <p>
              Created by {' '}
              <a
                href={gist.owner.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                {gist.owner.login}
              </a> on {createdAt} - Last updated {updatedAt}
            </p>
            <div className='row'>
              <div className='col-md-2'>
                <i className='fa fa-tags' /> Labels:
              </div>
              {labels.map(
                label => (
                  <div className='col-md-2' key={label.id}>
                    <input
                      type='checkbox'
                      checked={this._hasLabel(label)}
                      onChange={() => { onLabelSelect(token, label.id, gist.id); }}
                    /> {label.name}
                  </div>
                )
              )}
            </div>
          </div>
          <div className='box-body'>
            {gist.description}
          </div>
        </div>
        {files}
      </div>
    );
  }
}

GistViewer.propTypes = {
  token: PropTypes.string.isRequired,
  gist: PropTypes.object,
  labels: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLabelSelect: PropTypes.func.isRequired,
};
