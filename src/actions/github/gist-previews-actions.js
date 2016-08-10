import GitHub from 'github-api';
import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import { GISTS_REQUEST, GISTS_SUCCESS, GISTS_FAILURE } from '../../constants/github';

const gistPreviewSchema = new Schema('gistPreviews');

function gistsRequest() {
  return { type: GISTS_REQUEST };
}

function gistsSuccess(json) {
  const payload = normalize(
    camelizeKeys(json),
    arrayOf(gistPreviewSchema)
  );
  return {
    type: GISTS_SUCCESS,
    payload,
  };
}

function gistsFailure(error) {
  return {
    type: GISTS_FAILURE,
    payload: new Error(error),
  };
}

// Fetches list of gist previews from Github API.
export function fetchGists(token) {
  return dispatch => {
    dispatch(gistsRequest());

    const gh = new GitHub({ token });
    const me = gh.getUser();
    return me.listGists().then(
      (response) => { dispatch(gistsSuccess(response.data)); },
      (error) => { dispatch(gistsFailure(error)); }
    );
  };
}
