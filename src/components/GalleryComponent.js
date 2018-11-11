import React, { Component } from 'react';
import axios from 'axios';
import TableRowReports from './TableGallery';

export default class GalleryComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serverreports: []
        };
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

    render(){
        console.log(this.tabRow())
        return(
            <div className='container'>
                {this.tabRow()}
            </div>
        );
    }

}
