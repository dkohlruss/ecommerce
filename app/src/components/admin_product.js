import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { fetchProduct, fetchUser } from '../actions';

class AdminProduct extends Component {
	constructor(props) {
		super(props);
		this.props.fetchProduct(this.props.match.params.page);
	}

	renderField(field) {
		return (
			<div className="form-group">
				<label>{field.label}</label>
				<input className="form-control" type="text" {...field.input} />
			</div>
		);
	}

	render() {
		console.log(this.props);
		if (
			this.props.user &&
			(this.props.user.level === 1 || this.props.user.data.user.level === 1)
		) {
			return (
				<form>
					<Field
						name="name"
						label="Product Name"
						component={this.renderField}
					/>
				</form>
			);
		} else {
			return <span>You do not have access to this area.</span>;
		}
	}
}

function mapStateToProps(state) {
	return {
		initialValues: state.product,
		user: state.user
	};
}

AdminProduct = reduxForm({
	form: 'AdminProductForm' // name of the form
})(AdminProduct);

AdminProduct = connect(mapStateToProps, { fetchProduct, fetchUser })(
	AdminProduct
);

export default AdminProduct;

// export default connect(mapStateToProps, { fetchProduct, fetchUser })(
// 	AdminProduct
// );
