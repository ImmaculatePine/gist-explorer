import React, { Component, PropTypes } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import moment from 'moment';
import LabelsList from '../labels-list';
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

    const labelsPopover = (
      <Popover id='popover-positioned-scrolling-bottom' title='Edit gist labels'>
        {labels.map(
          label => (
            <div key={label.id} className='checkbox'>
              <label htmlFor={`label-${label.id}`}>
                <input
                  id={`label-${label.id}`}
                  type='checkbox'
                  checked={this._hasLabel(label)}
                  onChange={() => { onLabelSelect(token, label.id, gist.id); }}
                /> {label.name}
              </label>
            </div>
          )
        )}
      </Popover>
    );

    return (
      <div className='gist-viewer'>
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
            <div>
              <OverlayTrigger
                container={this}
                trigger='click'
                placement='bottom'
                overlay={labelsPopover}
              >
                <span className='label label-default labels-select-button'>
                  <i className='fa fa-tags' /> Labels <i className='fa fa-caret-down' />
                </span>
              </OverlayTrigger> <LabelsList labels={gist.labels} />
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
