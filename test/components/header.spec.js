import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../src/components/header';

const props = {
  user: {
    name: 'Alexander',
  },
  onSignOutClick: () => {},
};

describe('components', () => {
  describe('Header', () => {
    it('renders self with correct properties', () => {
      const wrapper = shallow(<Header {...props} />);
      expect(wrapper.find('.user-name').text()).to.equal('Alexander');
    });
  });
});
