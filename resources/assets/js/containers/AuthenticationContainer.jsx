import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel, Panel } from 'react-bootstrap';
import { authenticateWithTesla, disconnectAuthenticationWithTesla } from '../actions/userActions';

class AuthenticationContainer extends React.Component {

	render() {
		return (
			<div>
            	<h1 className="page-header">Authentication</h1>

            	{this.props.hasValidAccessToken ? this.renderIsAuthenticated() : this.renderNotAuthenticated() }
            </div>
		);
	}

	renderIsAuthenticated() {
		return (
			<div>
				<div className="alert alert-success"><i className="fa fa-check"></i> You are authenticated with "My Tesla"</div>
				<p><a href="#" onClick={this.handleDisconnect}>Disconnect and remove authentication token {this.props.isAuthenticatingWithTesla ? ( <i className="fa fa-cog fa-spin"></i> ) : ( <i className="fa fa-trash"></i> )}</a></p>
				<p><strong>Note:</strong> This will disable all evcontrol functionality</p>
			</div>
		);
	}

	renderNotAuthenticated() {
		return (
			<div>
				<div className="alert alert-info"><i className="fa fa-times"></i> You are not authenticated with "My Tesla"</div>
				<p>To connect to your "My Tesla" account, you will need to provide the email address and password that you use on tesla.com</p>

				<Form onSubmit={this.handleFormSubmit} horizontal>
					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
							Email
						</Col>
						<Col sm={10}>
							<FormControl inputRef={ref => { this.inputEmail = ref; }} type="email" placeholder="Email" />
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalPassword">
						<Col componentClass={ControlLabel} sm={2}>
							Password
						</Col>
						<Col sm={10}>
							<FormControl inputRef={ref => { this.inputPassword = ref; }} type="password" placeholder="Password" />
						</Col>
					</FormGroup>

					<FormGroup>
						<Col smOffset={2} sm={10}>
							<Button type="submit" disabled={this.props.isAuthenticatingWithTesla}>
								Connect {this.props.isAuthenticatingWithTesla ? ( <i className="fa fa-cog fa-spin"></i> ) : ( <i className="fa fa-arrow-circle-right"></i> )}
							</Button>
							{this.renderErrorMessageIfNecessary()}
						</Col>
					</FormGroup>
				</Form>

				<hr />

				<Panel header="Why do you need my password?">
					Tesla does not provide an official API (yet), this means that the only means of accessing data is using the same interface as the mobile app is using, which requires us to use the email and password directly.
				</Panel>
				<Panel header="What are you doing with email/password?">
					We use the provided credentials to authenticate and retrieve and access token from Tesla, your email/password is then v discarded and it is never stored on our servers
				</Panel>
				<Panel header="What happens after I connect?">
					Shortly after connecting your Tesla account to evcontrol we will start retrieving and visualize your driving, charging and climate data. We will <strong>only</strong> perform API calls that reads data, unless you explicitly configure evcontrol to do otherwise.
				</Panel>
			</div>
		);
	}

	handleFormSubmit = event => {
		event.preventDefault();

		this.props.dispatch(authenticateWithTesla(this.inputEmail.value, this.inputPassword.value));
	}

	renderErrorMessageIfNecessary = () => {
		if (this.props.showAuthenticationErrorMessage) {
			return (
				<p><strong className="text-danger">Error!</strong> Could not authenticate with the provided credentials, please double check and try again.</p>
			);
		} else {
			return null;
		}
	}

	handleDisconnect = event => {
		event.preventDefault();
		this.props.dispatch(disconnectAuthenticationWithTesla());
	}

}

function select(state, props) {
	return {
		hasValidAccessToken: state.user.hasValidAccessToken,
		isAuthenticatingWithTesla: state.user.isAuthenticatingWithTesla,
		showAuthenticationErrorMessage: state.user.showAuthenticationErrorMessage
	};
}

export default connect(select)(AuthenticationContainer);
