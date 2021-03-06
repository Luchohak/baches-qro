import React, { Component } from 'react';
import axios from 'axios';

class TableRowReports extends Component {
    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
      alert('Reporte eliminado')
        axios.get('https://vast-cove-91420.herokuapp.com/serverreport/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
  render() {
    return (
        <tr>
          <td>
            {this.props.obj.description}
          </td>
          <td>
            {this.props.obj.state}
          </td>
          {/* <td >
          <Link to={"/report/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td> */}
        </tr>
    );
  }
}

export default TableRowReports;