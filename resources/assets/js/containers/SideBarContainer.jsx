import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import MenuItem from '../components/MenuItem';

class SideBarContainer extends React.Component {

	render() {
		return (
			<div className="col-sm-3 col-md-2 sidebar">
				<ul className="nav nav-sidebar">
					<MenuItem title="Overview" path="/" active={this.props.path === '/'} onClick={this.goToUrl} />
					<MenuItem title="Analytics" path="/analytics" active={this.props.path === '/analytics'} onClick={this.goToUrl} />
					<MenuItem title="Achievements" path="/achievements" active={this.props.path === '/achievements'} onClick={this.goToUrl} />
				</ul>
				<ul className="nav nav-sidebar">
					<MenuItem title="Logs" path="/logs" active={this.props.path === '/logs'} onClick={this.goToUrl} />
					<MenuItem title="Schedules" path="/schedules" active={this.props.path === '/schedules'} onClick={this.goToUrl} />
					<MenuItem title="Triggers" path="/triggers" active={this.props.path === '/triggers'} onClick={this.goToUrl} />
				</ul>
				<ul className="nav nav-sidebar">
					<MenuItem title="Authentication" path="/authentication" active={this.props.path === '/authentication'} onClick={this.goToUrl} />
				</ul>
	        </div>
		);
	}

	goToUrl = path => {
		this.props.dispatch(push(path));
	}

	renderMenuItem(title, path) {
		<li className={this.props.path === '/' ? 'active' : ''}><a href="#" onClick={e => this.goToUrl(e, '/')}>Overview</a></li>
	}

}

function select(state, props) {
	return {
		path: state.routing.locationBeforeTransitions.pathname
	};
}

export default connect(select)(SideBarContainer);
