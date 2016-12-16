import React from 'react';
import { Row } from 'react-bootstrap';
import SideBarContainer from './SideBarContainer';

class AppContainer extends React.Component {

	render() {
		return (
			<Row>
		        <SideBarContainer />
		        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
		            {this.props.children}
		        </div>
		    </Row>
		);
	}

}

export default AppContainer;
