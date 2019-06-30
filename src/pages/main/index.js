import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../../store/ducks/users';

import AddBox from '../../components/AddBox';

class Main extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '97vh',
      latitude: 0,
      longitude: 0,
      zoom: 15,
    },
    initialLatitude: 0,
    initialLongitude: 0,
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
        initialLatitude: userCoords.latitude,
        initialLongitude: userCoords.longitude,
      });
    }, () => {
      userCoords.latitude = 40.7;
      userCoords.longitude = -74;
      this.setState({
        viewport: userCoords,
        initialLatitude: userCoords.latitude,
        initialLongitude: userCoords.longitude,
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
      initialLatitude,
      initialLongitude,
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
          <Marker
            latitude={initialLatitude}
            longitude={initialLongitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div>You are here</div>
          </Marker>
          {users.modalVisible && <AddBox location={clickLngLat} />}
        </ReactMapGL>
      </>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
