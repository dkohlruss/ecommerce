import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { fetchProduct, fetchUser, submitNew } from '../actions';

class AdminProductNew extends Component {
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

	formSubmit(values) {
		this.props.submitNew(values, () => {
			this.props.history.push('/ecommerce/admin/');
		});
	}

	render() {
		const { handleSubmit } = this.props;

		if (
			this.props.user &&
			(this.props.user.level === 1 || this.props.user.data.user.level === 1)
		) {
			return (
				<form onSubmit={handleSubmit(this.formSubmit.bind(this))}>
					<Field
						name="name"
						label="Product Name"
						component={this.renderField}
					/>
					<Field
						name="designer"
						label="Designer"
						component={this.renderField}
					/>
					<Field
						name="category"
						label="Category"
						component={this.renderField}
					/>
					<Field name="price" label="Price" component={this.renderField} />
					<Field
						name="description"
						label="Description"
						component={this.renderField}
					/>
					<Field
						name="size"
						label="Product Sizes (separate with comma)"
						component={this.renderField}
					/>
					<Field
						name="stock"
						label="In Stock by Size (separate with comma)"
						component={this.renderField}
					/>
					<button type="submit" className="btn btn-primary" />
				</form>
			);
		} else {
			return <span>You do not have access to this area.</span>;
		}
	}
}

function mapStateToProps(state) {
	return {
		user: state.user
	};
}

AdminProductNew = reduxForm({
	form: 'AdminProductFormNew' // name of the form
})(AdminProductNew);

AdminProductNew = connect(mapStateToProps, {
	fetchProduct,
	fetchUser,
	submitNew
})(AdminProductNew);

export default AdminProductNew;
