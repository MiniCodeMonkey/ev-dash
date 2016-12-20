import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Row, Col } from 'react-bootstrap';

class LogsContainer extends React.Component {

    render() {
        return this.props.currentVehicleData ? this.renderOverview() : this.renderNoResults();
    }

    renderNoResults = () => {
        return (
            <p></p>
        );
    }

	renderOverview = () => {
        const data = this.props.currentVehicleData;

		return (
            <div className="page-overview">
                <h1 className="page-hader">Recent log entries</h1>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Charging State</th>
                                <th>Battery Level</th>
                                <th>Est. Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.charge.map(charge =>
                                <tr key={charge.id}>
                                    <td>{charge.created_at}</td>
                                    <td>{charge.charging_state}</td>
                                    <td>{charge.battery_level}%</td>
                                    <td>{charge.est_battery_range}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Inside Temperature</th>
                                <th>Outside Temperature</th>
                                <th>Driver Temperature Setting</th>
                                <th>Passenger Temperature Setting</th>
                                <th>HVAC state</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.climate.map(climate =>
                                <tr key={climate.id}>
                                    <td>{climate.created_at}</td>
                                    <td>{climate.inside_temp}</td>
                                    <td>{climate.outside_temp}</td>
                                    <td>{climate.driver_temp_setting}</td>
                                    <td>{climate.passenger_temp_setting}</td>
                                    <td>{climate.is_climate_on === 1 ? 'On' : 'Off'}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Shift state</th>
                                <th>Speed</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.driving.map(driving =>
                                <tr key={driving.id}>
                                    <td>{driving.created_at}</td>
                                    <td>{driving.shift_state}</td>
                                    <td>{driving.speed}</td>
                                    <td>{driving.latitude},{driving.longitude}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
		);
	}

}

function select(state, props) {
    const currentVehicleId = state.vehicles.selectedVehicleId;
    const currentVehicleData = _.find(state.vehicles.currentData, vehicle => vehicle.id === currentVehicleId);

    return {
        currentVehicleData
    };
}

export default connect(select)(LogsContainer);
