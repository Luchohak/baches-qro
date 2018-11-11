import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gallery from 'react-grid-gallery';
import { render } from 'react-dom';


class TableGallery extends Component {
    constructor(props) {
        super(props);
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
         const buttonStyle = {
             position: 'absolute'
         }

    return ( 
        <div style={style}>
        <figure >
             <img style={imgStyle} src={this.props.obj.url} />

             <figcaption>
                <br></br>
                <Link to={"/report/view/"+this.props.obj._id} style={imgStyle}  className="btn btn-light">Ver Detalle</Link>
             </figcaption>
        </figure>
        </div>
     );
  }
}

export default TableGallery;