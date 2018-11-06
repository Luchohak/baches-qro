import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import TableRowReports from './TableRowReports';
import axios from 'axios';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {serverreports: [],
        };

      }
      componentDidMount(){
        axios.get('http://localhost:4200/serverreport')
        .then(response => {
          this.setState({ serverreports: response.data });
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
      }

      tabRow(){
        return this.state.serverreports.map(function(object, i){
           console.log(object.state)
        });
    }
  
    render() {
    return (
        
        <Map google={this.props.google}
        style={{width: '80%', height: '80%'}}
        //Once the map is loaded, it calls the OnReady method, we are using it to load the pothole markers
        onClick = {this.onMapClicked}
        onReady = {this.addMarker}
        zoom={15}
        initialCenter={{
          lat: 20.5880600,
          lng: -100.3880600
        }}
      >

        {/* {this.state.serverreports.map(function(object, i){
           console.log('Latitud: ', object.latitude, 'Longitud: ', object.longitude)
        })} */}

      {this.state.serverreports.map((object, i) => (
        <Marker
        key = {object._id}
        position={{lat: object.latitude, lng: object.longitude}}
        draggable={false}
        />
      ))}

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCAiKROuSWqcjm6LN4R339Y3qWsCw6o3eg'
})(MapContainer)