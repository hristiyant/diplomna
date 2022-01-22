import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

import "./Map.css";

const mapStyles = {
    // position: "relative",
    // height: '70vh',
    // width: 'auto',
    // "& div:first-child ": {
    //     height: '100%',
    //     width: '100%',
    // }
};

const containerStyle = {
    // background: "white"
    position: 'relative',
    width: '80vw',
    height: '80vh',

}

class MapContainer extends Component {
    state = {
        showingInfoWindow: false,  // Hides or shows the InfoWindow
        activeMarker: {},          // Shows the active marker upon click
        selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    render() {
        const location = this.props.location;
        const coordinates = location.coordinates.split(",");
        const lat = coordinates[0];
        const long = coordinates[1];

        return (
            <Map className="my-map"
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                containerStyle={containerStyle}
                initialCenter={
                    {
                        lat: lat,
                        lng: long
                    }
                }
            >
                <Marker
                    onClick={this.onMarkerClick}
                    name={location.name}
                    phone={location.phone}
                    managerName={location.manager.name}
                    managerPhone={location.manager.phone}
                    managerEmail={location.manager.email}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h1>{this.state.selectedPlace.name}</h1>
                        <h2><PhoneOutlined /> {this.state.selectedPlace.phone}</h2>
                        <div>{this.state.selectedPlace.managerName}</div>
                        <div><PhoneOutlined /> {this.state.selectedPlace.managerPhone}</div>
                        <div><MailOutlined /> {this.state.selectedPlace.managerEmail}</div>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyAwZT5u_ammCrCPJvbzvW29QNzvCUHu5Q0'
})(MapContainer);