import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { fetchProduct, fetchUser } from '../actions';

class AdminProduct extends Component {
	render() {
		return null;
	}
}

function mapStateToProps(state) {
	return {
		product: state.product,
		user: state.user
	};
}

export default connect(mapStateToProps, { fetchProduct, fetchUser })(
	AdminProduct
);
