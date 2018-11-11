import React, { Component } from 'react';
import axios from 'axios';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { storage } from '../firebase/firebaseIndex';

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

        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);

        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            user: '',
            latitude: '',
            longitude: '',
            state: 'Por reparar',
            description: '',
            image: null, 
            url: '',
            progress: 0

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
            url: this.state.url,
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
            url: '',
            image: null,
            progress: 0,
            description: ''
        })
        this.props.history.push('/report/map');
    }
    onMarkerPositionChanged(e) {
        console.log('Nueva lat:', e.position.lat, ' Nueva lng: ', e.position.lng)
        this.setState({
            //latitude: e.position.lat,
            //longitude: e.position.lng
        })
        
    }

    handleImageChange = e => {
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(() => ({image}));
            console.log('Imagen seleccionada')
        }
    }

    handleImageUpload = () => {
        const {image} = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on('state_changed', (snapshot) => {
            //progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            console.log('Yes: ', progress);
            this.setState({progress})
        }, (error) => {
            //error function
            console.log('Error: ', error);
        }, () => {
            //complete function
            storage.ref('images').child(image.name).getDownloadURL().then(url => {
                console.log(url);
                this.setState({url});
            })
        });
    }

    render() {  
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.getLatitude);
            navigator.geolocation.getCurrentPosition(this.getLongitude);
    
        }

        const style = {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        };

        if(this.state.image == null){
        return (
            <div style={{marginTop: 50}}>
                <h3>Registrar nuevo bache</h3>
                <form onSubmit={this.onSubmit}>
                    {/* <div className="form-group">
                        <label>Usuario:  </label>
                        <input type="text" value={this.state.user} className="form-control" onChange={this.onChangeUser}/>
                    </div> */}
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
                        <label>Calle: (opcional) </label>
                        <input type="text" value={this.state.description} className="form-control" onChange={this.onChangeDescription} placeholder="Agrega la calle donde encontraste el bache"/>
                    </div>
                    <div className='form-group'>
                        <label>Tómale una foto al bache</label>
                        <input type="file" className="form-control" onChange={this.handleImageChange}/>
                        <br />
                        <progress value={this.state.progress} max="100"/>
                        <img src={this.state.url} />
                    </div>
                </form>
                
                
                <h4>Comprueba tu ubicación</h4>
                <p>Si tu ubicación no aparece intenta refrescar la página</p>
                <Map
                  google={this.props.google}
                  onDragend={this.centerMoved}
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                  zoom={12}
                  initialCenter={{
                    lat: 20.588056,
                    lng: -100.388056
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
                
        );
                }
        if (this.state.image != null && this.state.url == ''){
            return (
                <div style={{marginTop: 50}}>
                    <h3>Registrar nuevo bache</h3>
                    <form onSubmit={this.onSubmit}>
                        {/* <div className="form-group">
                            <label>Usuario:  </label>
                            <input type="text" value={this.state.user} className="form-control" onChange={this.onChangeUser}/>
                        </div> */}
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
                            <label>Calle: (opcional) </label>
                            <input type="text" value={this.state.description} className="form-control" onChange={this.onChangeDescription} placeholder="Agrega la calle donde encontraste el bache"/>
                        </div>
                        <div className='form-group'>
                        <label>Tómale una foto al bache</label>
                        <input type="file" className="form-control" onChange={this.handleImageChange}/>
                        <br />
                        <progress value={this.state.progress} max="100"/>
                        <br/>
                        <button onClick={this.handleImageUpload} type="button" className="btn btn-secondary">Confirmar imagen</button>
                        <br />
                        <img src={this.state.url} />
                        </div>                
                    </form>
                    
                    
                    <h4>Comprueba tu ubicación</h4>
                    <p>Si tu ubicación no aparece intenta refrescar la página</p>
                    <Map
                      google={this.props.google}
                      onDragend={this.centerMoved}
                      style={{
                        width: "100%",
                        height: "100%"
                      }}
                      zoom={12}
                      initialCenter={{
                        lat: 20.588056,
                        lng: -100.388056
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
                    
            );
        }
        if (this.state.url != ''){
            const style = {
                border: '1px solid #ddd',
                padding: '5px',
                width: '100%',
                height: '50%',
                margin: 'auto',
                display: 'block'
                 };
            
         const imgStyle = {
            width: '100%',
            height: '100%',
         }
            return (
                <div style={{marginTop: 50}}>
                    <h3>Registrar nuevo bache</h3>
                    <form onSubmit={this.onSubmit}>
                        {/* <div className="form-group">
                            <label>Usuario:  </label>
                            <input type="text" value={this.state.user} className="form-control" onChange={this.onChangeUser}/>
                        </div> */}
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
                            <label>Calle: (opcional) </label>
                            <input type="text" value={this.state.description} className="form-control" onChange={this.onChangeDescription} placeholder="Agrega la calle donde encontraste el bache"/>
                        </div>
                        <div className='form-group'>
                        <label>Tómale una foto al bache</label>
                        <input type="file" className="form-control" onChange={this.handleImageChange}/>
                        <br />
                        <progress value={this.state.progress} max="100"/>
                        <br/>
                        <button onClick={this.handleImageUpload} type="button" className="btn btn-secondary">Confirmar imagen</button>
                        <br />
                        </div>  
                        <div className='form-group' style={style}>
                                <img style={imgStyle} src={this.state.url} />
                        </div>
                        <br/>                
                        <div className="form-group">
                            <input type="submit" value="Reportar" className="btn btn-primary"/>
                        </div>
                    </form>
                    
                    <div className='container'>
                    <h4>Comprueba tu ubicación</h4>
                    <p>Si tu ubicación no aparece intenta refrescar la página</p>
                    <Map
                      google={this.props.google}
                      onDragend={this.centerMoved}
                      style={{
                        width: "100%",
                        height: "100%"
                      }}
                      zoom={12}
                      initialCenter={{
                        lat: 20.588056,
                        lng: -100.388056
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
                </div>
                    
            );
        }



    }
    
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyCAiKROuSWqcjm6LN4R339Y3qWsCw6o3eg'
  })(CreateReport)