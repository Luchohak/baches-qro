import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';



export default class CreateUserComponent extends Component {

    constructor(props){
        super(props);
        this.onChangefirstName = this.onChangefirstName.bind(this);
        this.onChangelastName = this.onChangelastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    onChangefirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangelastName(e){
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }
    
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();
    
        const newUser = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            
        }
        axios.post('http://localhost:4200/serveruser/add', newUser)
        .then(res => console.log(res.data));
        alert('Su usuario ha sido creado')
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 50}}>
                <h3>Registrarme</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nombre:  </label>
                        <input type="text" value={this.state.firstName} className="form-control" onChange={this.onChangefirstName}/>
                    </div>
                    <div className="form-group">
                        <label>Apellido: </label>
                        <input type="text" value={this.state.lastName} className="form-control" onChange={this.onChangelastName}/>
                    </div>
                    <div className="form-group">
                        <label>E-mail: </label>
                        <input type="email" value={this.state.email} className="form-control" onChange={this.onChangeEmail}/>
                    </div>
                    <div className="form-group">
                        <label>Contraseña: </label>
                        <input type="password" value={this.state.password} className="form-control" onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Crear usuario" className="btn btn-primary" />
                    </div>
                    <div className="form-group">
                     <Link to="/report/create" >Reportar bache</Link>
                    </div>
                </form>
                
            </div>
        )
    }
}