import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Grid, Row, Col } from 'react-bootstrap';

class OverviewContainer extends React.Component {

	render() {
		return (
            <div>
                <h1 className="page-header">Dashboard</h1>

                <div className="row placeholders">
                    <div className="col-xs-6 col-sm-3 placeholder">
                        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
                        <h4>Label</h4>
                        <span className="text-muted">Something else</span>
                    </div>
                    <div className="col-xs-6 col-sm-3 placeholder">
                        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
                        <h4>Label</h4>
                        <span className="text-muted">Something else</span>
                    </div>
                    <div className="col-xs-6 col-sm-3 placeholder">
                        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
                        <h4>Label</h4>
                        <span className="text-muted">Something else</span>
                    </div>
                    <div className="col-xs-6 col-sm-3 placeholder">
                        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200" height="200" className="img-responsive" alt="Generic placeholder thumbnail" />
                        <h4>Label</h4>
                        <span className="text-muted">Something else</span>
                    </div>
                </div>

                <h2 className="sub-header">Section title</h2>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Header</th>
                                <th>Header</th>
                                <th>Header</th>
                                <th>Header</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1,001</td>
                                <td>Lorem</td>
                                <td>ipsum</td>
                                <td>dolor</td>
                                <td>sit</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
		);
	}

}

function select(state, props) {
	return {

	};
}

export default connect(select)(OverviewContainer);
