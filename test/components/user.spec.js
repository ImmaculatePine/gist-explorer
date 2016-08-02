import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import User from '../../src/components/user'

function setup() {
  const props = {
    user: {
      name: 'Alexander'
    },
    onSignOutClick: () => {}
  }

  const wrapper = shallow(<User {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('User', () => {
    it('renders self with correct properties', () => {
      const { wrapper } = setup()
      expect(wrapper.find('.greetings').text()).to.equal('Hi, Alexander')
    })
  })
})
