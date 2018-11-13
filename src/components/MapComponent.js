import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          serverreports: [],
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
          selectedCoordenates: {}
        };


        this.handleToggleOpen = this.handleToggleOpen.bind(this);
        this.handleToggleClose = this.handleToggleClose.bind(this);

        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMapClick = this.onMapClick.bind(this);

      }
      componentDidMount(){
        axios.get('https://vast-cove-91420.herokuapp.com/serverreport')
        .then(response => {
          this.setState({ serverreports: response.data });
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error);
        })
      }


    handleToggleOpen = () => {

      console.log('Abrir')
      this.setState({
        isOpen: true
      });
    }
    
    handleToggleClose = () => {
      console.log('Cerrar')
      this.setState({
        isOpen: false
      });
    }

    onMarkerClick = (props, marker, e) => {
      console.log('marker: ', marker)
      console.log('props: ', props)
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        selectedCoordenates: {
          "lat" : props.position.lat,
          "lng" : props.position.lng
        }
      });
      console.log(this.state.selectedCoordenates);
    }

    onMapClick() {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null
        });
      }
    }
  
    render() {
    return (
        
        <Map google={this.props.google}
        style={{width: '90%', height: '80%'}}
        //Once the map is loaded, it calls the OnReady method, we are using it to load the pothole markers
        onClick = {this.onMapClick}
        onReady = {this.addMarker}
        zoom={14}
        initialCenter={{
          lat: 20.613787,
          lng: -100.404910
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
          onClick={this.onMarkerClick}   
        >
        </Marker>
        
      ))}



          <InfoWindow
            //key = {object._id}
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h5>Bache </h5>
                {/* <img src={object.url} /> */}
              </div>
          </InfoWindow>

      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCAiKROuSWqcjm6LN4R339Y3qWsCw6o3eg'
})(MapContainer)