import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import LoginPage from '../../src/components/login-page'

describe('components', () => {
  describe('LoginPage', () => {
    it('renders self and a login button', () => {
      const wrapper = shallow(<LoginPage />)
      const button = wrapper.find('a')
      expect(button.text()).to.equal('Sign in with Github')
      expect(button.props().href).to.equal('http://localhost:3000/users/auth/github')
    })
  })
})
