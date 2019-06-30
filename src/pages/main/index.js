import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/users';

import AddBox from '../../components/AddBox';
import Sidebar from '../../components/Sidebar';

import { Container, UserAvatar } from './styles';

class Main extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '97vh',
      latitude: 0,
      longitude: 0,
      zoom: 13.4,
    },
    clickLngLat: {},
  };

  static propTypes = {
    addUserToggleModal: PropTypes.func.isRequired,
    users: PropTypes.shape({
      error: PropTypes.string,
      loading: PropTypes.bool,
      modalVisible: PropTypes.bool,
      data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        location: PropTypes.shape({
          lat: PropTypes.number,
          lng: PropTypes.number,
        }),
      })),
    }).isRequired,
  }

  componentDidMount() {
    this.handleLocateUser();
  }

  handleLocateUser = () => {
    const { viewport } = this.state;
    const userCoords = { ...viewport };

    navigator.geolocation.getCurrentPosition((position) => {
      userCoords.latitude = position.coords.latitude;
      userCoords.longitude = position.coords.longitude;
      this.setState({
        viewport: userCoords,
      });
    }, () => {
      userCoords.latitude = 40.7;
      userCoords.longitude = -74;
      this.setState({
        viewport: userCoords,
      });
    });
  }

  handleClick = (map) => {
    const { addUserToggleModal } = this.props;
    const lngLat = {
      lng: map.lngLat[0],
      lat: map.lngLat[1],
    };
    this.setState({ clickLngLat: lngLat });
    addUserToggleModal(true);
  }

  render() {
    const {
      viewport,
      clickLngLat,
    } = this.state;
    const { users } = this.props;

    return (
      <>
        <ReactMapGL
          {...viewport}
          onViewportChange={vp => this.setState({ viewport: vp })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9?optimize=true"
          onClick={this.handleClick}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
          />
          {users.data.map(user => (
            <Marker
              key={user.id}
              latitude={user.location.lat}
              longitude={user.location.lng}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <UserAvatar src={user.avatar} alt={user.login} />
            </Marker>
          ))}
        </ReactMapGL>
        <Container>
          <Sidebar />
          {users.modalVisible && <AddBox location={clickLngLat} />}
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
