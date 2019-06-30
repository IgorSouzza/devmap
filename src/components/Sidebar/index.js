import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Container } from './styles';

const Sidebar = ({ users }) => (
  <Container>
    {users.data.map(user => (
      <div key={user.id}>
        <p>{user.name}</p>
        <p>{user.login}</p>
        <hr />
      </div>
    ))}
  </Container>
);

Sidebar.propTypes = {
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

export default connect(mapStateToProps)(Sidebar);
