import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import history from '../history';




class TableGallery extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }
  delete() {
  alert('Reporte eliminado')
    axios.get('https://vast-cove-91420.herokuapp.com/serverreport/delete/'+this.props.obj._id)
        .then((response) => {
          history.push('/report/map');
        }) 
        .catch(err => console.log(err))

  }

  render() {
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

         const btnStyle = {
          width: '50%',
          height: '50%',
         }

    return ( 
        <div style={style}>
        <figure >
             <img style={imgStyle} src={this.props.obj.url} alt='Imagen de Bache'/>

             <figcaption>
                <br></br>
                <Link to={"/report/view/"+this.props.obj._id} style={btnStyle}  className="btn btn-success">Ver Detalle</Link>
                <button onClick={this.delete} style={btnStyle} className="btn btn-danger">Eliminar</button>
             </figcaption>
        </figure>
        </div>
     );
  }
}

export default TableGallery;