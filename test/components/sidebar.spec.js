import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from '../../src/components/sidebar'

const props = {
  token: 'fake-token',
  labels: [
    { id: 1, name: 'Important', gistIds: ['a'] },
    { id: 1, name: 'Other', gistIds: [] }
  ],
  selectedLabelId: undefined,
  onSelect: () => {},
  onDeleteClick: () => {},
  onFormSubmit: () => {}
}

describe('components', () => {
  describe('Sidebar', () => {
    it('renders list of labels', () => {
      const wrapper = shallow(<Sidebar {...props} />)
      const labels = wrapper.find('.label-name')
      expect(labels.length).to.equal(2)
      expect(labels.nodes[0].props.children).to.equal('Important')
      expect(labels.nodes[1].props.children).to.equal('Other')
    })
  })
})
