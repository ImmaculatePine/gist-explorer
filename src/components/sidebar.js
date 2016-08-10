import React, { Component, PropTypes } from 'react';

export default class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      isAddingLabel: false
    };

    this._toggleLabelForm = this._toggleLabelForm.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    const { token, onDeleteClick, onSelect, selectedLabelId } = this.props;
    const labels = this.props.labels.map(
      label => {
        return (
          <li key={label.id} className={selectedLabelId === label.id ? 'active' : ''}>
            <a href='#' onClick={() => { onSelect(label.id) }}>
              <span className='pull-right-container'>
                <span className='label label-default pull-right' onClick={() => { onDeleteClick(token, label.id) }}>
                  <i className='fa fa-trash'></i>
                </span>
                <span className='label label-primary pull-right'>{label.gistIds.length}</span>
              </span>
              <i className='fa fa-circle-o'></i>
              <span className='label-name'>{label.name}</span>
            </a>
          </li>
        )
      }
    );

    return (
      <aside className='main-sidebar'>
        <section className='sidebar'>
          <ul className='sidebar-menu'>
            <li className={selectedLabelId === undefined ? 'active' : ''}>
              <a href='#' onClick={() => { onSelect() }}>
                <i className='fa fa-book'></i> <span>My gists</span>
              </a>
            </li>
            <li className='header'>
              {this._addLabelButton()}
              LABELS
            </li>
            {this._addLabelForm()}
            {labels}
          </ul>
        </section>
      </aside>
    )
  }

  _addLabelButton() {
    return (
      <div className='pull-right'>
        <a href='#' onClick={this._toggleLabelForm}>
          <i className={this.state.isAddingLabel ? 'fa fa-minus' : 'fa fa-plus'}></i>
        </a>
      </div>
    )
  }

  _addLabelForm() {
    if (!this.state.isAddingLabel) { return }
    return (
      <li>
        <form action='#' className='sidebar-form' onSubmit={this._handleSubmit}>
          <div className='input-group'>
            <input ref={c => this._name = c} type='text'className='form-control' placeholder='E.g. important' />
            <span className='input-group-btn'>
              <button type='submit' className='btn btn-flat'>
                <i className='fa fa-check'></i>
              </button>
            </span>
          </div>
        </form>
      </li>
    )
  }

  _toggleLabelForm() {
    this.setState({
      isAddingLabel: !this.state.isAddingLabel
    });
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.setState({ isAddingLabel: false });
    this.props.onFormSubmit(this.props.token, this._name.value)
  }
}

Sidebar.propTypes = {
  token: PropTypes.string.isRequired,
  labels: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  selectedLabelId: PropTypes.number
}
