import React, { Component } from 'react';
import axios from 'axios';

export default class EditReport extends Component {

    constructor(props) {
        super(props);
        this.onChangeUser = this.onChangeUser.bind(this);
        this.onChangeLatitude = this.onChangeLatitude.bind(this);
        this.onChangeLongitude = this.onChangeLongitude.bind(this);
        this.onChangeState = this.onChangeState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {user: '', latitude: '', longitude: '', state: ''};
    }

    componentDidMount() {
        axios.get('http://localhost:4200/serverreport/edit/'+this.props.match.params.id)
            .then(response => {
                this.setState({ user: response.data.user, latitude: response.data.latitude, longitude: response.data.longitude, state: response.data.state });
            })
            .catch(function (error) {
                console.log(error);
            })
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
    onSubmit(e) {
        e.preventDefault();
        const serverreport = {
            user: this.state.user,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            state: this.state.state
        }
        axios.post('http://localhost:4200/serverreport/update/'+this.props.match.params.id, serverreport)
        .then(res => console.log(res.data));
        this.setState({
            user: '',
            latitude: '',
            longitude: '',
            state: ''
        })
        this.props.history.push('/report/index');
    }

    render() {
        return (
            <div style={{marginTop: 50}}>
                <h3>Editar Reporte</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Usuario:  </label>
                        <input type="text" value={this.state.user} className="form-control" onChange={this.onChangeUser}/>
                    </div>
                    <div className="form-group">
                        <label>Latitud: </label>
                        <input type="text" value={this.state.latitude} className="form-control" onChange={this.onChangeLatitude}/>
                    </div>
                    <div className="form-group">
                        <label>Longitud: </label>
                        <input type="text" value={this.state.longitude} className="form-control" onChange={this.onChangeLongitude}/>
                    </div>
                    <div className="form-group">
                        <label>Estado: </label>
                        <input type="text" value={this.state.state} className="form-control" onChange={this.onChangeState}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Actualizar" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}