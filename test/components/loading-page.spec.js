import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import LoadingPage from '../../src/components/loading-page'

describe('components', () => {
  describe('LoadingPage', () => {
    it('just renders self without any additional logic', () => {
      const wrapper = shallow(<LoadingPage />)
      expect(wrapper.text()).to.equal('Loading...')
    })
  })
})
