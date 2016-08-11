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
      expect(wrapper.find('Header').length).to.equal(1);
      expect(wrapper.find('Sidebar').length).to.equal(1);
      expect(wrapper.find('Footer').length).to.equal(1);
      expect(wrapper.find('GistsList').length).to.equal(1);
      expect(wrapper.find('GistViewer').length).to.equal(1);
    });

    it('changes body class', () => {
      setup();
      const body = document.getElementsByTagName('body')[0];
      expect(body.className).to.equal('hold-transition skin-blue sidebar-mini');
    });
  });
});
