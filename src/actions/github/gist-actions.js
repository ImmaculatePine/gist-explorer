import GitHub from 'github-api';
import { Schema, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { GIST_REQUEST, GIST_SUCCESS, GIST_FAILURE, SELECT_GIST } from '../../constants/github';

const gistSchema = new Schema('gists');

// Selects a single gist.
export function selectGist(id) {
  return {
    type: SELECT_GIST,
    payload: id,
  };
}

function gistRequest(id) {
  return {
    type: GIST_REQUEST,
    payload: id,
  };
}

function gistSuccess(json) {
  const payload = normalize(
    camelizeKeys(json),
    gistSchema
  );
  return {
    type: GIST_SUCCESS,
    payload,
  };
}

function gistFailure(error) {
  return {
    type: GIST_FAILURE,
    payload: new Error(error.message),
  };
}

// Fetches a single gist from Github API.
export function fetchGist(id, token) {
  return dispatch => {
    dispatch(gistRequest(id));
    dispatch(selectGist(id));

    const gh = new GitHub({ token });
    return gh.getGist(id).read().then(
      (response) => { dispatch(gistSuccess(response.data)); },
      (error) => { dispatch(gistFailure(error)); }
    );
  };
}
