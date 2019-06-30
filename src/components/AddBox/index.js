import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/users';

import { Form } from './styles';

class AddBox extends Component {
  state = {
    inputValue: '',
  }

  static propTypes = {
    addUserRequest: PropTypes.func.isRequired,
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

  render() {
    return (
      <Form onSubmit={this.handleAddUser}>
        <input
          type="text"
          placeholder="Insira o nome de usuário aqui..."
          onChange={e => this.setState({ inputValue: e.target.value })}
        />
        <button type="submit">OK!</button>
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddBox);
