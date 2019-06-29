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

    navigator.geolocation.getCurrentPosition((position) => {
      const newstate = { ...viewport };
      newstate.latitude = position.coords.latitude;
      newstate.longitude = position.coords.longitude;
      this.setState({
        viewport: newstate,
        userLatitude: newstate.latitude,
        userLongitude: newstate.longitude,
      });
    }, () => {
      const newstate = { ...viewport };
      newstate.latitude = 40.730610;
      newstate.longitude = -73.935242;
      this.setState({
        viewport: newstate,
        userLatitude: newstate.latitude,
        userLongitude: newstate.longitude,
      });
    });
  }

  render() {
    const { viewport, userLatitude, userLongitude } = this.state;

    return (
      <>
        <ReactMapGL
          {...viewport}
          onViewportChange={vp => this.setState({ viewport: vp })}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
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
