import { expect } from 'chai';
import React from 'react';
import { mount } from 'enzyme';
import App from '../../src/components/app';

function setup() {
  const props = {
    data: {
      gists: [],
      selectedGist: undefined,
      labels: [],
    },
    auth: {
      user: {},
      token: 'fake-token',
    },
    gists: {
      list: {
        isFetching: false,
        selectedId: undefined,
      },
      single: {
        isFetching: false,
      },
    },
    labels: {
      selectedId: undefined,
    },
    authActions: {
      signOut: () => {},
    },
    gistActions: {
      fetchGist: () => {},
    },
    labelsActions: {
      selectLabel: () => {},
      addLabel: () => {},
      deleteLabel: () => {},
      toggleLabelOnGist: () => {},
    },
  };

  const wrapper = mount(<App {...props} />);

  return {
    props,
    wrapper,
  };
}

describe('components', () => {
  describe('App', () => {
    it('renders self', () => {
      const { wrapper } = setup();
      expect(wrapper.find('Header')).to.be.defined;
      expect(wrapper.find('Sidebar')).to.be.defined;
      expect(wrapper.find('Footer')).to.be.defined;
      expect(wrapper.find('GistsList')).to.be.defined;
      expect(wrapper.find('GistViewer')).to.be.defined;
    });

    it('changes body class', () => {
      setup();
      const body = document.getElementsByTagName('body')[0];
      expect(body.className).to.equal('hold-transition skin-blue sidebar-mini');
    });
  });
});
