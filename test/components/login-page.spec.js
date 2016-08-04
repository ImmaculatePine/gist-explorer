import { expect } from 'chai'
import React from 'react'
import { mount } from 'enzyme'
import LoginPage from '../../src/components/login-page'

describe('components', () => {
  describe('LoginPage', () => {
    it('renders self and a login button', () => {
      const wrapper = mount(<LoginPage />)
      const button = wrapper.find('.btn-github')
      expect(button.props().href).to.equal('http://localhost:3000/users/auth/github')
    })

    it('changes body class', () => {
      mount(<LoginPage />)
      const body = document.getElementsByTagName('body')[0]
      expect(body.className).to.equal('hold-transition login-page')
    })
  })
})
