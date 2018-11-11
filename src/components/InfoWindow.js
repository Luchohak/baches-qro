import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server'

export default class InfoWindow extends React.Component {
    
    componentDidUpdate(prevProps, prevState) {
      if (this.props.map !== prevProps.map) {
        this.renderInfoWindow();
      }
      if (this.props.children !== prevProps.children) {
        this.updateContent();
      }

      if (this.props.visible !== prevProps.visible) {
        this.props.visible ?
          this.openWindow() :
          this.closeWindow();
      }

    }

    openWindow() {
        this.infowindow
          .open(this.props.map, this.props.marker);
          console.log('Open');
      }
      
      closeWindow() {
        this.infowindow.close();
        console.log('Close')
      }

    updateContent() {
        const content = this.renderChildren();
        this.infowindow
          .setContent(content);
      }

      renderChildren() {
        const {children} = this.props;
        return ReactDOMServer.renderToString(children);
      }



    renderInfoWindow() {
      let {map, google, mapCenter} = this.props;
  
      const iw = this.infowindow = new google.maps.InfoWindow({
        content: ''
      });
    }
  }