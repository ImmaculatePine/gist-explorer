import { expect } from 'chai'
import * as selectors from '../../src/selectors/labels'
import data from './data'

describe('getLabel(state, id)', () => {
  it('returns a label by the specified ID', () => {
    const state = { data }
    expect(selectors.getLabel(state, 1)).to.eql({ name: 'Important', gistIds: ['a'] })
  })
})

describe('getLabels(state)', () => {
  it('returns a list of all labels', () => {
    const state = { data }
    expect(selectors.getLabels(state)).to.eql([
      { name: 'Important', gistIds: ['a'] },
      { name: 'Other', gistIds: ['b', 'c'] }
    ])
  })
})
