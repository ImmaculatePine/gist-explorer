import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import LabelsList from '../../src/components/labels-list';

describe('components', () => {
  describe('LabelsList', () => {
    it('renders No labels message when there are no labels', () => {
      const labels = [];
      const wrapper = shallow(<LabelsList labels={labels} />);
      expect(wrapper.text()).to.equal('No labels');
    });

    it('renders list of labels separated bo comma', () => {
      const labels = [
        { name: 'Important' },
        { name: 'Other' }
      ];
      const wrapper = shallow(<LabelsList labels={labels} />);
      expect(wrapper.text()).to.equal('Important, Other');
    });
  });
});
