import React, { Component, PropTypes } from 'react';
import Highlight from 'highlight.js';
import RawHtml from 'react-raw-html';

export default class File extends Component {
  render() {
    const { file } = this.props;
    const { filename, language, rawUrl } = file;
    const code = Highlight.highlightAuto(file.content, [file.language]);

    return (
      <div className='box box-solid'>
        <div className='box-header with-border'>
          
          <b className='file-filename'>{filename}</b>
          <br />
          <small className='file-language'>{language}</small>
        
          <div className='box-tools'>
            <a href={rawUrl} className='file-raw-url btn btn-box-tool' target='_blank'>
              <i className='fa fa-external-link'></i>
            </a>
          </div>
        </div>
        <div className='box-body'>
          <pre><code>
            <RawHtml.div>{code.value}</RawHtml.div>
          </code></pre>
        </div>
      </div>
    );
  }
}

File.propType = {
  file: PropTypes.object.isRequired
}
