import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Circle } from 'react-progressbar.js';

class OverviewContainer extends React.Component {

    render() {
        return this.props.currentVehicleData ? this.renderOverview() : this.renderNoResults();
    }

    renderNoResults = () => {
        return (
            <p></p>
        );
    }

	renderOverview = () => {
        var options = {
            strokeWidth: 2
        };

        // For demo purposes so the container has some dimensions.
        // Otherwise progress bar won't be shown
        var containerStyle = {
            width: '200px',
            height: '200px'
        };

        const data = this.props.currentVehicleData;

		return (
            <div className="page-overview">
                <h1 className="page-header">Dashboard</h1>

                <div className="row placeholders">
                    <div className="col-xs-6 col-sm-3 placeholder">
                        <Circle
                            progress={data.charge[0].battery_level / 100}
                            text={data.charge[0].battery_level + '%'}
                            options={options}
                            initialAnimate={true}
                            containerStyle={containerStyle}
                            containerClassName={'progressbar'} />
                        <h4>SOC</h4>
                        <span className="text-muted">Current state of charge</span>
                    </div>
                    <div className="col-xs-6 col-sm-3 placeholder">
                        <i className={'fa fa-plug text-' + (data.charge[0].charging_state === 'Disconnected' ? 'danger' : 'success')}></i>
                        <h4>Charging state</h4>
                        <span className="text-muted">{data.charge[0].charging_state}</span>
                    </div>
                    <div className="col-xs-6 col-sm-3 placeholder">
                        <i className={'fa fa-sun-o text-' + (data.climate[0].is_climate_on === 0 ? 'danger' : 'success')}></i>
                        <h4>HVAC state</h4>
                        <span className="text-muted">{data.climate[0].is_climate_on === 1 ? 'On' : 'Off'}</span>
                    </div>
                    <div className="col-xs-6 col-sm-3 placeholder">
                        <i className={'fa fa-road text-' + (data.driving[0].shift_state !== 'D' ? 'danger' : 'success')}></i>
                        <h4>Drive state</h4>
                        <span className="text-muted">{data.driving[0].shift_state || 'Off' }</span>
                    </div>
                </div>

                <h2 className="sub-header">Recent</h2>
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

export default connect(select)(OverviewContainer);
