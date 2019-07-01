import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/users';

import { Form, Overlay } from './styles';

class AddBox extends Component {
  state = {
    inputValue: '',
  }

  static propTypes = {
    addUserRequest: PropTypes.func.isRequired,
    addUserToggleModal: PropTypes.func.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }).isRequired,
  }

  handleAddUser = (e) => {
    e.preventDefault();
    const { addUserRequest, location } = this.props;
    const { inputValue } = this.state;

    addUserRequest(inputValue, location);
  }

  handleCancelForm = (e) => {
    e.preventDefault();
    const { addUserToggleModal } = this.props;
    addUserToggleModal(false);
  }

  render() {
    return (
      <Form onSubmit={this.handleAddUser}>
        <Overlay />
        <section>
          <h1>Adicionar novo usuário</h1>
          <input
            type="text"
            placeholder="Usuário no Github..."
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            onChange={e => this.setState({ inputValue: e.target.value })}
          />
          <div>
            <button type="button" onClick={this.handleCancelForm}>Cancelar</button>
            <button type="submit">OK!</button>
          </div>
        </section>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddBox);
