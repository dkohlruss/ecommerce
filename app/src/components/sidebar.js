import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../css/interior.css';

class Sidebar extends Component {
	render() {
		return (
			<div class="col-sm-2">
				<ul class="list-unstyled interior-nav-title">
					INTERIOR NAV
					<li class="interior-nav-item">Sample 1</li>
					<li class="interior-nav-item">Sample 2</li>
					<li class="interior-nav-item">Sample 3</li>
				</ul>

				<ul class="list-unstyled interior-nav-title">
					INTERIOR NAV
					<li class="interior-nav-item">Sample 1</li>
					<li class="interior-nav-item">Sample 2</li>
					<li class="interior-nav-item">Sample 3</li>
				</ul>

				<ul class="list-unstyled interior-nav-title">
					INTERIOR NAV
					<li class="interior-nav-item">Sample 1</li>
					<li class="interior-nav-item">Sample 2</li>
					<li class="interior-nav-item">Sample 3</li>
				</ul>
			</div>
		);
	}
}

export default Sidebar;
