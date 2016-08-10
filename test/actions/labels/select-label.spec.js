import { expect } from 'chai'
import * as actions from '../../../src/actions/labels-actions'
import * as types from '../../../src/constants/labels'

describe('selectLabel(labelId)', () => {
  it('creates SELECT_LABEL action', () => {
    const expectedAction = {
      type: types.SELECT_LABEL,
      payload: 1
    }
    expect(actions.selectLabel(1)).to.eql(expectedAction)
  })
})
