import React, { Component } from 'react';
import axios from 'axios';
import TableRowReports from './TableRowReports';

export default class IndexReport extends Component {

  constructor(props) {
      super(props);
      this.state = {serverreports: []};
    }
    componentDidMount(){
      axios.get('https://vast-cove-91420.herokuapp.com/serverreport')
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
      const style = {
        overflowX: 'auto'
      }
      return (
        <div className="container" style={style}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>Calles</td>
                  <td>Estado</td>
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