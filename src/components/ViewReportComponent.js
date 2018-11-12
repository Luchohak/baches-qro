import React, { Component } from 'react';
import axios from 'axios';

export default class ViewReportComponent extends Component {

    constructor(props) {
        super(props);
        this.onChangeLatitude = this.onChangeLatitude.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {user: '', latitude: '', longitude: '', state: '', description: ''};
    }

    componentDidMount() {
        axios.get('https://vast-cove-91420.herokuapp.com/serverreport/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({ user: response.data.user, latitude: response.data.latitude, longitude: response.data.longitude, state: response.data.state, description: response.data.description });
            })
            .catch(function (error) {
                console.log(error);
            })
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

    onSubmit(e) {
        e.preventDefault();
        this.props.history.push('/report/gallery');
    }

    render() {
        return (
            <div style={{marginTop: 50}}>
                <h3>Detalle</h3>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Latitud: </label>
                        <input type="text" value={this.state.latitude} className="form-control" onChange={this.onChangeLatitude} readOnly/>
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
                        <label>Descripción: </label>
                        <input type="text" value={this.state.description} className="form-control" onChange={this.onChangeDescription} readOnly/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Regresar" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}