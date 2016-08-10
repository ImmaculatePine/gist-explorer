import * as actionTypes from '../constants/labels';

const initialState = {
  isFetching: false,
  selectedId: undefined,
};

export default function labelsReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
  case actionTypes.LABELS_REQUEST:
    return {
      ...state,
      isFetching: true,
    };

  case actionTypes.LABELS_SUCCESS:
  case actionTypes.LABELS_FAILURE:
    return {
      ...state,
      isFetching: false,
    };

  case actionTypes.SELECT_LABEL:
    return {
      ...state,
      selectedId: payload,
    };

  default:
    return state;
  }
}
