import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import * as actionTypes from '../constants/labels';
import API from '../api';

const labelSchema = new Schema('labels');

function labelsRequest() {
  return {
    type: actionTypes.LABELS_REQUEST,
  };
}

function labelsSuccess(json) {
  const payload = normalize(
    camelizeKeys(json),
    arrayOf(labelSchema)
  );
  return {
    type: actionTypes.LABELS_SUCCESS,
    payload,
  };
}

function labelsFailure(error) {
  return {
    type: actionTypes.LABELS_FAILURE,
    payload: error,
  };
}

// Fetches a list of labels for the current user.
export function fetchLabels(token) {
  return dispatch => {
    dispatch(labelsRequest());

    const api = new API(token);
    return api.getLabels(
      (json) => { dispatch(labelsSuccess(json)); },
      (error) => { dispatch(labelsFailure(error)); }
    );
  };
}

function addLabelRequest(name) {
  return {
    type: actionTypes.ADD_LABEL_REQUEST,
    payload: {
      name,
    },
  };
}

function addLabelSuccess(json) {
  const payload = normalize(
    camelizeKeys(json),
    labelSchema
  );
  return {
    type: actionTypes.ADD_LABEL_SUCCESS,
    payload,
  };
}

function addLabelFailure(error) {
  return {
    type: actionTypes.ADD_LABEL_FAILURE,
    payload: error,
  };
}

// Adds new label to the library.
export function addLabel(token, name) {
  return dispatch => {
    dispatch(addLabelRequest(name));

    const api = new API(token);
    return api.addLabel(
      { name },
      (json) => { dispatch(addLabelSuccess(json)); },
      (error) => { dispatch(addLabelFailure(error)); }
    );
  };
}

function deleteLabelRequest(labelId) {
  return {
    type: actionTypes.DELETE_LABEL_REQUEST,
    payload: labelId,
  };
}

function deleteLabelSuccess(json) {
  const payload = normalize(
    camelizeKeys(json),
    labelSchema
  );
  return {
    type: actionTypes.DELETE_LABEL_SUCCESS,
    payload,
  };
}

function deleteLabelFailure(error) {
  return {
    type: actionTypes.DELETE_LABEL_FAILURE,
    payload: error,
  };
}

// Deletes label from the library.
export function deleteLabel(token, labelId) {
  return dispatch => {
    dispatch(deleteLabelRequest(labelId));

    const api = new API(token);
    return api.deleteLabel(
      labelId,
      (json) => { dispatch(deleteLabelSuccess(json)); },
      (error) => { dispatch(deleteLabelFailure(error)); }
    );
  };
}

function toggleLabelOnGistRequest(labelId, gistId) {
  return {
    type: actionTypes.TOGGLE_LABLE_ON_GIST_REQUEST,
    payload: {
      labelId,
      gistId,
    },
  };
}

function toggleLabelOnGistSuccess(json) {
  const payload = normalize(
    camelizeKeys(json),
    labelSchema
  );
  return {
    type: actionTypes.TOGGLE_LABLE_ON_GIST_SUCCESS,
    payload,
  };
}

function toggleLabelOnGistFailure(error) {
  return {
    type: actionTypes.TOGGLE_LABLE_ON_GIST_FAILURE,
    payload: error,
  };
}

// Toggles the specified label on the specified gist.
// If the gist is not labeled, label will be assigned to it,
// otherwise label will be removed.
export function toggleLabelOnGist(token, labelId, gistId) {
  return dispatch => {
    dispatch(toggleLabelOnGistRequest(labelId, gistId));

    const api = new API(token);
    return api.toggleLabelOnGist(
      labelId,
      gistId,
      (json) => { dispatch(toggleLabelOnGistSuccess(json)); },
      (error) => { dispatch(toggleLabelOnGistFailure(error)); }
    );
  };
}


// Selects a label with the specified id.
export function selectLabel(labelId) {
  return {
    type: actionTypes.SELECT_LABEL,
    payload: labelId,
  };
}
