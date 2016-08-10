import React, { Component, PropTypes } from 'react';

// Import components
import Header from './header';
import Sidebar from './sidebar';
import Footer from './footer';
import GistsList from './github/gists-list';
import GistViewer from './github/gist-viewer';

// Import utils
import FixLayout from '../utils/fix-layout';

export default class App extends Component {
  componentWillMount() {
    this._updateBodyClass();
  }

  componentDidMount() {
    this.fixLayout = new FixLayout();
    this.fixLayout.activate();
  }

  componentWillUnmount() {
    this.fixLayout.deactivate();
  }

  _updateBodyClass() {
    const body = document.getElementsByTagName('body')[0];
    body.className = 'hold-transition skin-blue sidebar-mini';
  }

  render() {
    const {
      data, auth, gists, labels,
      authActions, gistActions, labelsActions,
    } = this.props;

    return (
      <div className='wrapper'>
        <Header user={auth.user} onSignOutClick={authActions.signOut} />
        <Sidebar
          token={auth.token}
          labels={data.labels}
          selectedLabelId={labels.selectedId}
          onSelect={labelsActions.selectLabel}
          onDeleteClick={labelsActions.deleteLabel}
          onFormSubmit={labelsActions.addLabel}
        />
        <div className='content-wrapper'>
          <section className='content'>
            <div className='row'>
              <div className='col-md-4'>
                <GistsList
                  gists={data.gists}
                  selectedId={gists.list.selectedId}
                  isFetching={gists.list.isFetching}
                  onGistClick={gistActions.fetchGist}
                />
              </div>
              <div className='col-md-8'>
                {
                  gists.list.isFetching
                  ?
                    ''
                  :
                    <GistViewer
                      token={auth.token}
                      gist={data.selectedGist}
                      isFetching={gists.single.isFetching}
                      labels={data.labels}
                      onLabelSelect={labelsActions.toggleLabelOnGist}
                    />
                }
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  data: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  gists: PropTypes.object.isRequired,
  labels: PropTypes.object.isRequired,
  authActions: PropTypes.object.isRequired,
  gistActions: PropTypes.object.isRequired,
  labelsActions: PropTypes.object.isRequired,
};
