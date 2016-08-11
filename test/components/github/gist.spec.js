import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Gist from '../../../src/components/github/gist';

const gistProps = {
  public: false,
  createdAt: new Date(),
  description: 'This is a test gist',
  files: {
    'index.js': {
      filename: 'index.js',
    },
    'other.js': {
      filename: 'other.js',
    },
  },
  labels: [],
};

const props = {
  gist: gistProps,
  isActive: false,
  onClick: () => {},
};

describe('components/github', () => {
  describe('Gist', () => {
    it('renders self with correct properties', () => {
      const wrapper = shallow(<Gist {...props} />);
      expect(wrapper.find('i.fa-lock')).to.be.defined;
      expect(wrapper.find('.gist-title').text()).to.equal('index.js');
      expect(wrapper.find('.gist-created-at').text()).to.equal('Created a few seconds ago');
      expect(wrapper.find('.gist-description').text()).to.equal('This is a test gist');
      expect(wrapper.find('.no-labels')).to.be.defined;
    });
  });
});
