import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreateReport from './components/CreateReport';
import APIComponent from './components/APIComponent';
import EditReport from './components/EditReport';
import IndexReport from './components/IndexReport';
import MapComponent from './components/MapComponent';

import CreateUserComponent from './components/CreateUserComponent';
import ViewReportComponent from './components/ViewReportComponent';

import GalleryComponent from './components/GalleryComponent';
import HomeComponent from './components/HomeComponent';


class App extends Component {
  render() {

    return (
    <Router>
        <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/home'}><a className="navbar-brand">Baches Qro</a></Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/report/create'} className="nav-link">Crear Reporte</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/report/index'} className="nav-link">Reportes</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/report/gallery'} className="nav-link">Galería de Baches</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/report/map'} className="nav-link">Mapa de Reportes</Link>
                </li>
              </ul>
            </div>            
          </nav>
          <Switch>
              <Route path='/account/create' component={CreateUserComponent} />

              <Route path='/report/create' component={CreateReport} />
              <Route path='/report/index' component={IndexReport} />
              <Route path='/report/edit/:id' component={EditReport} />
              <Route path='/report/map' component={MapComponent} />
              <Route path='/report/api' component={APIComponent} />
              <Route path='/report/gallery' component={GalleryComponent} />
              <Route path='/report/view/:id' component={ViewReportComponent} />
              <Route path='/home' component={HomeComponent} />



              
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
