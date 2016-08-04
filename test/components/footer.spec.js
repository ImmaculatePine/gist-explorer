import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import Footer from '../../src/components/footer'

describe('components', () => {
  describe('Footer', () => {
    it('just renders self without any additional logic', () => {
      const wrapper = shallow(<Footer />)
      expect(wrapper.find('footer')).to.be.defined
    })
  })
})
