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
        const options = {
            strokeWidth: 2
        };

        const containerStyle = {
            width: '200px',
            height: '200px'
        };

        const data = this.props.currentVehicleData;

		return (
            <div className="page-overview">
                <h1 className="page-header">Overview</h1>

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
