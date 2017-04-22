import React, { PropTypes } from 'react';
import { Grid, Panel, Row, Col } from 'react-bootstrap';

class ChargerInfo extends React.Component {

	render() {
		return (
			<Grid>
				<Panel header={this.props.charger.name}>
					<Row>
						<Col md={4}>
							<h4>Amenities</h4>
							<dl>
								<dt><i className="fa fa-cutlery"></i> Eat</dt>
								<dd>Panera, Burger King, Chipotle</dd>

								<dt><i className="fa fa-shopping-bag"></i> Shopping</dt>
								<dd>CVS, Safeway</dd>

								<dt><i className="fa fa-play-circle"></i> Entertainment</dt>
								<dd>Regal Cinemas</dd>
							</dl>
						</Col>
						<Col md={4}>
							<h4>Convenience</h4>
							<dl>
								<dt>I-95</dt>
								<dd><i className="fa fa-car"></i> Along the way</dd>

								<dt>State Route 267</dt>
								<dd>8 min.</dd>
							</dl>
						</Col>
						<Col md={4}>
							<h4>Features</h4>
							<dl>
								<dt># of stalls</dt>
								<dd>{this.props.charger.stall_count}</dd>

								<dt>Average kW</dt>
								<dd>102</dd>

								<dt>Max kW</dt>
								<dd>132</dd>
							</dl>
						</Col>
					</Row>
				</Panel>
			</Grid>
		);
	}

}

export default ChargerInfo;
