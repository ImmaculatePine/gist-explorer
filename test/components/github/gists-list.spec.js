import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import GistsList from '../../../src/components/github/gists-list'

const defaultProps = {
  gists: [
    { id: '0' },
    { id: '1' },
    { id: '2' }
  ],
  selectedId: undefined,
  isFetching: false,
  onGistClick: () => {}
}

describe('components/github', () => {
  describe('GistsList', () => {
    describe('when data is fetching', () => {
      it('renders loading message', () => {
        const props = {
          ...defaultProps,
          isFetching: true
        }
        const wrapper = shallow(<GistsList {...props} />)
        expect(wrapper.find('Gist')).not.to.be.defined
        expect(wrapper.find('.box-body').text()).to.equal('Loading...')
      })
    })

    describe('when data is not fetching', () => {
      it('renders list of gists', () => {
        const props = {
          ...defaultProps,
          isFetching: false
        }
        const wrapper = shallow(<GistsList {...props} />)
        expect(wrapper.find('Gist').length).to.equal(3)
      })
    })
  })
})
