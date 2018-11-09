import React, { Component } from 'react';
import axios from 'axios';
import TableRowReports from './TableRowReports';

export default class IndexReport extends Component {

  constructor(props) {
      super(props);
      this.state = {serverreports: []};
    }
    componentDidMount(){
      axios.get('http://localhost:4200/serverreport')
      .then(response => {
        this.setState({ serverreports: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    tabRow(){
        return this.state.serverreports.map(function(object, i){
            return <TableRowReports obj={object} key={i} />;
        });
    }

    render() {
      console.log(this.tabRow())
      return (
        <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>Estado</td>
                  <td>Descripcion</td>
                  <td>Imagen</td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
                
              </tbody>

            </table>
        </div>
      );
    }
  }