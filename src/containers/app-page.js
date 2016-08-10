import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Import actions
import * as authActions from '../actions/auth-actions';
import * as gistPreviewsActions from '../actions/github/gist-previews-actions';
import * as gistActions from '../actions/github/gist-actions';
import * as labelsActions from '../actions/labels-actions';

// Import components
import App from '../components/app';

// Import selectors
import { getGists, getSelectedGist } from '../selectors/gists';
import { getLabels } from '../selectors/labels';

export class AppPage extends Component {
  componentWillMount() {
    const token = this.props.auth.token;
    const { fetchGists } = this.props.gistPreviewsActions;
    const { fetchLabels } = this.props.labelsActions;
    fetchGists(token);
    fetchLabels(token);
  }

  render() {
    return <App {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    data: {
      gists: getGists(state),
      selectedGist: getSelectedGist(state),
      labels: getLabels(state)
    },
    auth: state.auth,
    gists: state.gists,
    labels: state.labels
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    gistPreviewsActions: bindActionCreators(gistPreviewsActions, dispatch),
    gistActions: bindActionCreators(gistActions, dispatch),
    labelsActions: bindActionCreators(labelsActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppPage);
