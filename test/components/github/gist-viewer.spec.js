import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import GistViewer from '../../../src/components/github/gist-viewer';

describe('components/github', () => {
  describe('GistViewer', () => {
    describe('when gist is not selected', () => {
      it('shows loading message while fetching data', () => {
        const wrapper = shallow(<GistViewer isFetching />);
        expect(wrapper.find('.box-body').text()).to.equal('Loading...');
      });

      it('shows call-to-action message when data is not fetching', () => {
        const wrapper = shallow(<GistViewer isFetching={false} />);
        expect(wrapper.find('.box-body').text()).to.equal('Please, select a gist');
      });
    });

    describe('when gist is selected', () => {
      const props = {
        gist: {
          files: {
            'index.js': {
              filename: 'index.js',
            },
            'other.js': {
              filename: 'other.js',
            },
          },
        },
        labels: [],
        isFetching: false,
      };

      it('renders gist details', () => {
        const wrapper = shallow(<GistViewer {...props} />);
        const files = wrapper.find('File');
        expect(files.length).to.equal(2);
        expect(files.nodes[0].props.file.filename).to.equal('index.js');
        expect(files.nodes[1].props.file.filename).to.equal('other.js');
      });
    });
  });
});
