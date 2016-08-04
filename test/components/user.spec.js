import { expect } from 'chai'
import React from 'react'
import { mount } from 'enzyme'
import User from '../../src/components/user'

function setup() {
  const props = {
    user: {
      name: 'Alexander'
    },
    onSignOutClick: () => {}
  }

  const wrapper = mount(<User {...props} />)

  return {
    props,
    wrapper
  }
}

describe('components', () => {
  describe('User', () => {
    it('renders self', () => {
      const { wrapper } = setup()
      expect(wrapper.find('Header')).to.be.defined
      expect(wrapper.find('Sidebar')).to.be.defined
      expect(wrapper.find('Footer')).to.be.defined
    })

    it('changes body class', () => {
      setup()
      const body = document.getElementsByTagName('body')[0]
      expect(body.className).to.equal('hold-transition skin-blue sidebar-mini')
    })
  })
})
