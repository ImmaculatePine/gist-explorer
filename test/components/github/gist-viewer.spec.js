import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import GistViewer from '../../../src/components/github/gist-viewer';

const defaultProps = {
  token: 'fake-token',
  labels: [],
  isFetching: false,
  onLabelSelect: () => {},
};

describe('components/github', () => {
  describe('GistViewer', () => {
    describe('when gist is not selected', () => {
      it('shows loading message while fetching data', () => {
        const props = {
          ...defaultProps,
          isFetching: true,
        }
        const wrapper = shallow(<GistViewer {...props} />);
        expect(wrapper.find('.box-body').text()).to.equal('Loading...');
      });

      it('shows call-to-action message when data is not fetching', () => {
        const props = {
          ...defaultProps,
          isFetching: false,
        }
        const wrapper = shallow(<GistViewer {...props} />);
        expect(wrapper.find('.box-body').text()).to.equal('Please, select a gist');
      });
    });

    describe('when gist is selected', () => {
      const props = {
        ...defaultProps,
        gist: {
          files: {
            'index.js': {
              filename: 'index.js',
            },
            'other.js': {
              filename: 'other.js',
            },
          },
          labels: [],
          createdAt: new Date(),
          updatedAt: new Date(),
          owner: {},
        },
      };

      it('renders gist details', () => {
        const wrapper = shallow(<GistViewer {...props} />);
        const files = wrapper.find('File');
        expect(files.length).to.equal(2);
        expect(files.nodes[0].props.file.filename).to.equal('index.js');
        expect(files.nodes[1].props.file.filename).to.equal('other.js');
        expect(wrapper.find('LabelsList').length).to.equal(1);
      });
    });
  });
});
