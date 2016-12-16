import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Row, Col } from 'react-bootstrap';

class AuthenticationContainer extends React.Component {

	render() {
		return (
            <h1 className="page-header">Authentication</h1>
		);
	}

}

function select(state, props) {
	return {

	};
}

export default connect(select)(AuthenticationContainer);
