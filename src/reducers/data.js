import * as githubActionTypes from '../constants/github';
import * as labelsActionTypes from '../constants/labels';

const initialState = {
  entities: {
    gistPreviews: {},
    gists: {},
    labels: {}    
  },
  gistIds: [],
  labelIds: []
}

const mergeGistPreviews = (state, payload) => {
  return {
    ...state,
    gistPreviews: Object.assign(
      {},
      state.gistPreviews,
      payload.gistPreviews
    )
  }
}

const mergeGist = (state, payload) => {
  return {
    ...state,
    gists: Object.assign(
      {},
      state.gists,
      payload.gists
    )
  }
}

const mergeLabels = (state, payload) => {
  return {
    ...state,
    labels: Object.assign(
      {},
      state.labels,
      payload.labels
    )
  }
}

const removeElement = (array, element) => {
  return [
    ...array.slice(0, array.indexOf(element)),
    ...array.slice(array.indexOf(element) + 1)
  ]
}

// A function that reduce entities to the state.
// It knows nothing about any UI stuff.
export default function dataReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case githubActionTypes.GISTS_SUCCESS:
      return {
        ...state,
        entities: mergeGistPreviews(
          state.entities,
          payload.entities
        ),
        gistIds: payload.result
      }

    case githubActionTypes.GIST_SUCCESS:
      return {
        ...state,
        entities: mergeGist(
          state.entities,
          payload.entities
        )
      }

    case labelsActionTypes.LABELS_SUCCESS:
      return {
        ...state,
        entities: mergeLabels(
          state.entities,
          payload.entities
        ),
        labelIds: payload.result
      }

    case labelsActionTypes.ADD_LABEL_SUCCESS:
      return {
        ...state,
        entities: mergeLabels(
          state.entities,
          payload.entities
        ),
        labelIds: [...state.labelIds, payload.result],
      }

    case labelsActionTypes.DELETE_LABEL_SUCCESS:
      return {
        ...state,
        labelIds: removeElement(state.labelIds, payload.result)
      }

    case labelsActionTypes.TOGGLE_LABLE_ON_GIST_SUCCESS:
      return {
        ...state,
        entities: mergeLabels(
          state.entities,
          payload.entities
        )
      }

    default:
      return state
  }
}
