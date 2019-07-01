import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Container } from './styles';

const Sidebar = ({ users }) => (
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
        <button type="button">X</button>
      </section>
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
