import * as actionTypes from '../../constants/github';

const initialState = {
  isFetching: false,
};

export default function single(state = initialState, { type } = {}) {
  switch (type) {
  case actionTypes.GIST_REQUEST:
    return {
      ...state,
      isFetching: true,
    };

  case actionTypes.GIST_SUCCESS:
  case actionTypes.GIST_FAILURE:
    return {
      ...state,
      isFetching: false,
    };

  default:
    return state;
  }
}
