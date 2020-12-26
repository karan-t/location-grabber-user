import React, { Component } from "react";
import { Button , Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import firebase from '../Firebase'

const api_key = process.env.REACT_APP_API_KEY;
export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: null,
      latitude: null,
      userAddress: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
    this.getuserAddress = this.getuserAddress.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  getCoordinates(position) {
    const userName = localStorage.getItem("Name") 
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    this.writeUserData(userName, position.coords.latitude, position.coords.longitude)
    this.getuserAddress();
  }

  writeUserData(userName, latitude, longitude) {
    firebase.database().ref(`positions/${userName}`).set({
      latitude: latitude,
      longitude: longitude
    });
  }

  getuserAddress() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.state.latitude},${this.state.longitude}&sensor=false&key=${api_key}`
    )
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          userAddress: data.results[0].formatted_address,
        })
      )
      .catch((error) => alert(error));
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
  render() {
    return (
      <div className="main_dashboard_container">
        <div className="top_bar">
        <h2><u>React Location Grabber</u></h2>
        <p>Signed in as : {localStorage.getItem("Name")}</p>
        </div>
        <div className="content">
          <Card className="content_card">
            <p>Press the get coordinates to get your Latitude, Longitude and Address</p>
        <Button variant="contained" color="primary" onClick={this.getLocation}>Get Coordinates</Button>
        <p>Latitude: {this.state.latitude}</p>
        <p>Longitude: {this.state.longitude}</p>
        <h4>Reverse Geocoding with Google Maps API</h4>
        <p>Address: {this.state.userAddress}</p>
        <br />
        {this.state.latitude && this.state.longitude ? (
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.state.latitude},${this.state.longitude}&zoom=14&size=400x300&sensor=false&markers=color:red%7C${this.state.latitude},${this.state.longitude}&key=${api_key}`}
            alt=""
          />
        ) : null}
         <br />
            <Button variant="contained" color="secondary" component={Link} to={"/logout"} className="logout_menulink">
               Logout
            </Button>
            </Card>
            </div>
      </div>
    );
  }
}
