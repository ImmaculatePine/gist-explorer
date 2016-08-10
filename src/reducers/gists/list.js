import * as actionTypes from '../../constants/github';

const initialState = {
  isFetching: false,
  selectedId: undefined
}

export default function list(state = initialState, { type, payload } = {}) {
  switch (type) {
    case actionTypes.SELECT_GIST:
      return {
        ...state,
        selectedId: payload
      }

    case actionTypes.GISTS_REQUEST:
      return {
        ...state,
        isFetching: true
      }

    case actionTypes.GISTS_SUCCESS:
    case actionTypes.GISTS_FAILURE:
      return {
        ...state,
        isFetching: false
      }

    default:
      return state
  }
}
