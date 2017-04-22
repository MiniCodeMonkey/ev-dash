import _ from 'lodash';
import Leaflet from 'leaflet';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ChargerInfo from '../components/ChargerInfo';

class ChargersContainer extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            selectedChargerId: null
        };
    }

    render() {
        const position = [45, -96];

        return (
            <div>
                {this.renderChargerInfo()}
                <Map center={position} zoom={4}>
                    <TileLayer
                        url='https://map.geocod.io/osm/{z}/{x}/{y}.png'
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {this.props.chargers.map(charger => (
                        <Marker
                            key={charger.id}
                            position={[parseFloat(charger.latitude), parseFloat(charger.longitude)]}
                            onClick={() => {
                                this.setState({
                                    selectedChargerId: charger.id
                                });
                            }}
                        />
                    ))}
                </Map>

                <p>Charger data provided by <a href="https://supercharge.info" target="_blank">supercharge.info</a></p>
            </div>
        );
    }

    renderChargerInfo() {
        return this.state.selectedChargerId ? <ChargerInfo charger={this.props.chargers.filter(charger => charger.id === this.state.selectedChargerId)[0]} /> : null;
    }

}

function select(state, props) {
    return {
        chargers: state.chargers.chargers
    };
}

export default connect(select)(ChargersContainer);
