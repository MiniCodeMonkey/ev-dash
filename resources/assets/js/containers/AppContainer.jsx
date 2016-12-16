import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Row, Col } from 'react-bootstrap';

class AppContainer extends React.Component {

	render() {
		return (
			<div>
				Test
			</div>
		);
	}

}

function select(state, props) {
	return {

	};
}

export default connect(select)(AppContainer);
