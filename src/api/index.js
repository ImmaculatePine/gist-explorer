import fetch from 'isomorphic-fetch';
import config from '../config';

// Class for working with the internal application API
// It allows to read, create, destroy labels and
// toggle the existing labels on the gists
export default class API {
  constructor(token) {
    this.token = token;
  }

  getLabels(successCallback, failureCallback) {
    return this._makeRequest(
      `${config.apiHost}/labels`,
      { headers: this._headers() },
      successCallback,
      failureCallback
    )
  }

  addLabel(options = {}, successCallback, failureCallback) {
    return this._makeRequest(
      `${config.apiHost}/labels`,
      {
        headers: this._headers(),
        method: 'POST',
        body: JSON.stringify({
          label: options
        })
      },
      successCallback,
      failureCallback
    )
  }

  deleteLabel(labelId, successCallback, failureCallback) {
    return this._makeRequest(
      `${config.apiHost}/labels/${labelId}`,
      {
        headers: this._headers(),
        method: 'DELETE'
      },
      successCallback,
      failureCallback
    )
  }

  toggleLabelOnGist(labelId, gistId, successCallback, failureCallback) {
    return this._makeRequest(
      `${config.apiHost}/labels/${labelId}/gists`,
      {
        headers: this._headers(),
        method: 'POST',
        body: JSON.stringify({
          gist: {
            id: gistId
          }
        })
      },
      successCallback,
      failureCallback
    )
  }

  _headers() {
    return {
      'Authorization': `Token token="${this.token}"`,
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
    }
  }

  _makeRequest(url, options, successCallback, failureCallback) {
    return fetch(url, options)
      .then((response) => {
        if (response.status > 400) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(data => successCallback(data))
      .catch(error => failureCallback(error.message))
  }
}
