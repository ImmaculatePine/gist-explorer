import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import File from '../../../src/components/github/file';

const props = {
  file: {
    filename: 'test.js',
    language: 'JavaScript',
    rawUrl: 'https://gist.githubusercontent.com/blablabla',
    content: 'alert("Hello world!")',
  },
};

describe('components/github', () => {
  describe('File', () => {
    it('renders self with correct properties', () => {
      const wrapper = shallow(<File {...props} />);
      expect(wrapper.find('.file-filename').text()).to.equal(props.file.filename);
      expect(wrapper.find('.file-language').text()).to.equal(props.file.language);
      expect(wrapper.find('.file-raw-url').props().href).to.equal(props.file.rawUrl);

      const code = wrapper.find('RawComponent').node.props.children;
      const expectedCode = 'alert(<span class="hljs-string">"Hello world!"</span>)';
      expect(code).to.equal(expectedCode);
    });
  });
});
