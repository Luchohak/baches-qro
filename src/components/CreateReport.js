import React, { Component } from 'react';
import axios from 'axios';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class CreateReport extends Component {

    constructor(props) {
        super(props);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeLatitude = this.onChangeLatitude.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getLatitude = this.getLatitude.bind(this);
        this.getLongitude = this.getLongitude.bind(this);
        this.onMarkerPositionChanged = this.onMarkerPositionChanged.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            user: '',
            latitude: '',
            longitude: '',
            state: 'Por reparar',
            description: ''

        }
    }

    onChangeUser(e) {
        this.setState({
            user: e.target.value
        });
    }
    onChangeLatitude(e) {
        this.setState({
            latitude: e.target.value
        });
    }
    onChangeLongitude(e) {
        this.setState({
            longitude: e.target.value
        });
    }
    onChangeState(e) {
        this.setState({
            state: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    getLatitude(position){
        let lat = position.coords.latitude
        console.log('Latitud: ', lat)
        
        this.setState({
            latitude: lat
        })
        return lat
    }

    getLongitude(position){
        let long = position.coords.longitude
        console.log('Longitud: ', long)
        this.setState({
            longitude: long
        })
        return long
    }


    locationNotReceived(positionError){
        console.log(positionError);
    }
    onSubmit(e) {
        e.preventDefault();
    
        const potholereport = {
            user: this.state.user,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            state: this.state.state,
            description: this.state.description
            
        }
        axios.post('http://localhost:4200/serverreport/add', potholereport)
        .then(res => console.log(res.data));
        alert('Reporte registrado, muchas gracias!')
        this.setState({
            user: '',
            latitude: '',
            longitude: '',
            state: 'Por reparar',
            description: ''
        })
    }
    onMarkerPositionChanged(e) {
        console.log('Nueva lat:', e.position.lat, ' Nueva lng: ', e.position.lng)
        this.setState({
            //latitude: e.position.lat,
            //longitude: e.position.lng
        })
        
    }

    render() {  
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getLatitude);
            navigator.geolocation.getCurrentPosition(this.getLongitude);
    
        }
        return (
            <div style={{marginTop: 50}}>
                <h3>Registrar nuevo bache</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Usuario:  </label>
                        <input type="text" value={this.state.user} className="form-control" onChange={this.onChangeUser}/>
                    </div>
                    <div className="form-group">
                        <label>Latitud: </label>
                        <input type="text" value = {this.state.latitude} className="form-control" onChange={this.onChangeLatitude} readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Longitud: </label>
                        <input type="text" value={this.state.longitude} className="form-control" onChange={this.onChangeLongitude} readOnly/>
                    </div>
                    
                    <div className="form-group">
                        <label>Estado: </label>
                        <input type="text" value={this.state.state} className="form-control" onChange={this.onChangeState} readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Descripcion: (opcional) </label>
                        <input type="text" value={this.state.description} className="form-control" onChange={this.onChangeDescription} placeholder="Agrega información extra si deseas"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Reportar" className="btn btn-primary"/>
                    </div>
                </form>
                <h4>Comprueba tu ubicación</h4>
                <Map
                  google={this.props.google}
                  onDragend={this.centerMoved}
                  style={{
                    width: "40%",
                    height: "40%"
                  }}
                  zoom={15}
                  initialCenter={{
                    lat: 29.087481099999998,
                    lng: -111.0038117
                  }}
                >
                  <Marker
                    name={'Current Location'}
                    draggable = {true}
                    position={{lat: this.state.latitude, lng: this.state.longitude}}
                    //onDragend={(e) => {console.log('dragEnd', e.position.lat)}}
                    //onDragend={this.onMarkerPositionChanged}
                    />
                  

                </Map>
            </div>
            
            
            
        )
        
    }
    
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCAiKROuSWqcjm6LN4R339Y3qWsCw6o3eg'
  })(CreateReport)