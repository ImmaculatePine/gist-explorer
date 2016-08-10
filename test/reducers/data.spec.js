import { expect } from 'chai'
import reducer from '../../src/reducers/data'
import * as githubActions from '../../src/constants/github'
import * as labelsActions from '../../src/constants/labels'

const gists = {
  a: {
    id: 'gistA',
    description: 'Gist A'
  },
  b: {
    id: 'gistB',
    description: 'Gist B'
  }
}

const labels = {
  a: {
    id: 1,
    name: 'Important',
    gistIds: ['gistA']
  },
  b: {
    id: 2,
    name: 'Other',
    gistIds: ['gistB']
  }
}

const initialState = {
  entities: {
    gistPreviews: {},
    gists: {},
    labels: {}    
  },
  gistIds: [],
  labelIds: []
}

const initialStateWithData = {
  entities: {
    gistPreviews: {
      gistA: gists.a
    },
    gists: {
      gistA: gists.a
    },
    labels: {
      labelA: labels.a
    }
  },
  gistIds: ['gistA'],
  labelIds: ['labelA']
}

describe('data reducer', () => {
  it('returns the initial state by default', () => {
    const expectedState = initialState
    expect(reducer()).to.eql(expectedState)
  })

  it('handles GISTS_SUCCESS action', () => {
    const action = {
      type: githubActions.GISTS_SUCCESS,
      payload: {
        entities: {
          gistPreviews: {
            'gistB': gists.b
          }
        },
        result: ['gistB']
      }
    }

    const expectedState = {
      ...initialStateWithData,
      entities: {
        ...initialStateWithData.entities,
        gistPreviews: {
          gistA: gists.a,
          gistB: gists.b
        }
      },
      gistIds: ['gistB']
    }

    expect(reducer(initialStateWithData, action)).to.eql(expectedState)
  })

  it('handles GIST_SUCCESS action', () => {
    const action = {
      type: githubActions.GIST_SUCCESS,
      payload: {
        entities: {
          gists: {
            'gistA': gists.a
          }
        },
        result: ['gistA']
      }
    }

    const expectedState = {
      ...initialState,
      entities: {
        ...initialState.entities,
        gists: {
          gistA: gists.a
        }
      }
    }

    expect(reducer(initialState, action)).to.eql(expectedState)
  })

  it('handles LABELS_SUCCESS action', () => {
    const action = {
      type: labelsActions.LABELS_SUCCESS,
      payload: {
        entities: {
          labels: {
            labelB: labels.b
          }
        },
        result: ['labelB']
      }
    }

    const expectedState = {
      ...initialStateWithData,
      entities: {
        ...initialStateWithData.entities,
        labels: {
          labelA: labels.a,
          labelB: labels.b
        }
      },
      labelIds: ['labelB']
    }

    expect(reducer(initialStateWithData, action)).to.eql(expectedState)
  })

  it('handles ADD_LABEL_SUCCESS action', () => {
    const action = {
      type: labelsActions.ADD_LABEL_SUCCESS,
      payload: {
        entities: {
          labels: {
            labelB: labels.b
          }
        },
        result: 'labelB'
      }
    }

    const expectedState = {
      ...initialStateWithData,
      entities: {
        ...initialStateWithData.entities,
        labels: {
          labelA: labels.a,
          labelB: labels.b
        }
      },
      labelIds: ['labelA', 'labelB']
    }

    expect(reducer(initialStateWithData, action)).to.eql(expectedState)
  })

  it('handles DELETE_LABEL_SUCCESS action', () => {
    const action = {
      type: labelsActions.DELETE_LABEL_SUCCESS,
      payload: {
        entities: {
          labels: {
            labelA: labels.a
          }
        },
        result: 'labelA'
      }
    }

    const expectedState = {
      ...initialStateWithData,
      labelIds: []
    }

    expect(reducer(initialStateWithData, action)).to.eql(expectedState)
  })

  it('handles TOGGLE_LABLE_ON_GIST_SUCCESS action', () => {
    const action = {
      type: labelsActions.TOGGLE_LABLE_ON_GIST_SUCCESS,
      payload: {
        entities: {
          labels: {
            labelA: {
              id: 1,
              name: 'Important',
              gistIds: []
            }
          }
        },
        result: ['labelA']
      }
    }

    const expectedState = {
      ...initialStateWithData,
      entities: {
        ...initialStateWithData.entities,
        labels: {
          labelA: {
            id: 1,
            name: 'Important',
            gistIds: []
          }
        }
      }
    }

    expect(reducer(initialStateWithData, action)).to.eql(expectedState)
  })
})
