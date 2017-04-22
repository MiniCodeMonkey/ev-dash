import React from 'react';
import { Grid, Row } from 'react-bootstrap';
import SideBarContainer from './SideBarContainer';

class AppContainer extends React.Component {

	render() {
		return (
			<Grid fluid>
				<Row>
			        <SideBarContainer />
			        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			            {this.props.children}
			        </div>
			    </Row>
		    </Grid>
		);
	}

}

export default AppContainer;
