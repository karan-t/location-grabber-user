import React, { Component } from 'react'
import './App.css'
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      longitude: null,
      latitude: null,
      altitude: null,
      accuracy: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this); 
  }

getLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(this.getCoordinates, this.handleLocationError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

getCoordinates(position){
  this.setState({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    altitude: position.coords.altitude,
    accuracy: position.coords.accuracy
  })
}

handleLocationError(error){
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.")
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.")
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.")
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.")
      break;
    default:
      alert("An unknown error occurred.")
  }
}
  render() {
    return (
      <div className="App">
        <h2>
          React Location Grabber
        </h2>
        <button onClick={this.getLocation}>Get Coordinates</button>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <p>Altitude: {this.state.altitude}</p>
        <p>Accuracy: {this.state.accuracy}</p>
        <h4>Google Maps Reverse Geocoding</h4>
      </div>
    )
  }
}