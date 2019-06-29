import React, { Component } from 'react';

import ReactMapGL, { Marker, GeolocateControl } from 'react-map-gl';

class Main extends Component {
  state = {
    viewport: {
      width: '100%',
      height: '97vh',
      latitude: 0,
      longitude: 0,
      zoom: 15,
    },
    userLatitude: 0,
    userLongitude: 0,
  };

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
        userLatitude: userCoords.latitude,
        userLongitude: userCoords.longitude,
      });
    }, () => {
      userCoords.latitude = 40.7;
      userCoords.longitude = -74;
      this.setState({
        viewport: userCoords,
        userLatitude: userCoords.latitude,
        userLongitude: userCoords.longitude,
      });
    });
  }

  handleClick = (map) => {
    const lngLat = {
      lng: map.lngLat[0],
      lat: map.lngLat[1],
    };

    console.log(lngLat.lat);
  }

  render() {
    const { viewport, userLatitude, userLongitude } = this.state;

    return (
      <>
        <ReactMapGL
          {...viewport}
          onViewportChange={vp => this.setState({ viewport: vp })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          onClick={this.handleClick}
        >
          <GeolocateControl
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation
          />
          <Marker
            latitude={userLatitude}
            longitude={userLongitude}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <div>You are here</div>
          </Marker>
        </ReactMapGL>
      </>
    );
  }
}

export default Main;
