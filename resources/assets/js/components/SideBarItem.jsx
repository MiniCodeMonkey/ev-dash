import React, { PropTypes } from 'react';

class SideBarItem extends React.Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		path: PropTypes.string.isRequired,
		active: PropTypes.bool,
		onClick: PropTypes.func
	}

	render() {
		return (
			<li className={this.props.active ? 'active' : ''}>
				<a href="#" onClick={event => this.goToUrl(event, this.props.path)}>{ this.props.title }</a>
			</li>
		);
	}

	goToUrl = (event, path) => {
		event.preventDefault();
		this.props.onClick(path);
	}

}

export default SideBarItem;
