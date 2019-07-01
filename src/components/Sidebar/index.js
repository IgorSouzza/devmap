import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/users';

import { Container } from './styles';

const Sidebar = ({ users, removeUser }) => (
  <Container>
    {users.data.map(user => (
      <section key={user.id}>
        <div>
          <img src={user.avatar} alt={user.name} />
          <p>
            {user.name ? user.name : 'User'} <br />
            <span>{user.login}</span>
          </p>
        </div>
        <button type="button" onClick={() => removeUser(user.id)}>X</button>
      </section>
    ))}
  </Container>
);

Sidebar.propTypes = {
  removeUser: PropTypes.func.isRequired,
  users: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      login: PropTypes.string,
    })),
  }).isRequired,
};

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
