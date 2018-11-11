import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class HomeComponent extends Component {
    render(){
        const style = {
            width: '40%',
            height:'20%',
            padding: '10% 0',
            margin: '2%'
        }
        const divStyle = {
            padding: '70px 0',
        }
        return(
            <div className='container' style={divStyle}>
            <Link to={'/report/create'} style={style} className="btn btn-outline-success">Crear Reporte</Link>
            <Link to={'/report/index'} style={style} className="btn btn-outline-danger">Ver Reportes</Link>
            <Link to={'/report/gallery'} style={style} className="btn btn-outline-warning">Galería de Baches</Link>
            <Link to={'/report/map'} style={style} className="btn btn-outline-info">Mapa de Reportes</Link>
            </div>
        );
    }
}