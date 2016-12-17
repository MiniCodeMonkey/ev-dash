import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import _ from 'lodash';
import SideBarItem from '../components/SideBarItem';
import { refreshVehicles, selectVehicle } from '../actions/vehiclesActions';

class SideBarContainer extends React.Component {

	render() {
		return (
			<div className="col-sm-3 col-md-2 sidebar">
				{this.props.hasValidAccessToken ? this.renderVehicles() : ''}
				{this.props.isLoadingVehicles ? ( <i className="fa fa-refresh fa-spin"></i> ) : ''}
				<ul className="nav nav-sidebar">
					<SideBarItem title="Overview" path="/" active={this.props.path === '/'} onClick={this.goToUrl} />
					<SideBarItem title="Analytics" path="/analytics" active={this.props.path === '/analytics'} onClick={this.goToUrl} />
					<SideBarItem title="Achievements" path="/achievements" active={this.props.path === '/achievements'} onClick={this.goToUrl} />
				</ul>
				<ul className="nav nav-sidebar">
					<SideBarItem title="Logs" path="/logs" active={this.props.path === '/logs'} onClick={this.goToUrl} />
					<SideBarItem title="Triggers" path="/triggers" active={this.props.path === '/triggers'} onClick={this.goToUrl} />
				</ul>
				<ul className="nav nav-sidebar">
					<SideBarItem title="Authentication" path="/authentication" active={this.props.path === '/authentication'} onClick={this.goToUrl} />
				</ul>
	        </div>
		);
	}

	goToUrl = path => {
		this.props.dispatch(push(path));
	}

	renderVehicles() {
		const currentVehicle = this.props.selectedVehicleId ? _.find(this.props.vehicles, vehicle => vehicle.id === this.props.selectedVehicleId) : null;
		const title = currentVehicle ? currentVehicle.name || currentVehicle.vin : '(no vehicle selected)';

		return (
			<DropdownButton title={title} id="vehiclesDropdown" bsStyle="primary">
				{this.props.vehicles.map(vehicle => (
					<MenuItem key={vehicle.id} onClick={() => this.props.dispatch(selectVehicle(vehicle.id))}>
						{this.props.selectedVehicleId === vehicle.id ? ( <i className="fa fa-check"></i> ) : null}
						{' '}
						{vehicle.name || vehicle.vin}
					</MenuItem>
				))}
				{this.props.vehicles.length > 0 ? ( <MenuItem divider /> ) : null}
				<MenuItem onClick={() => this.props.dispatch(refreshVehicles())}><i className="fa fa-refresh"></i> Refresh vehicles</MenuItem>
			</DropdownButton>
		);
	}

}

function select(state, props) {
	return {
		path: state.routing.locationBeforeTransitions.pathname,
		hasValidAccessToken: state.user.hasValidAccessToken,
		vehicles: state.vehicles.vehicles,
		selectedVehicleId: state.vehicles.selectedVehicleId,
		isLoadingVehicles: state.vehicles.isLoading
	};
}

export default connect(select)(SideBarContainer);
