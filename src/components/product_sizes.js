import React, { Component } from 'react';

class ProductSizes extends Component {
	getSizes() {
		let sizes = this.props.products.size;

		return (
			<select
				name="size"
				key={`size${this.props.products.name}`}
				className="product-select product-size-select"
				defaultValue="size"
				onChange={event => {
					this.props.handleChange(event.target.value);
				}}
			>
				<option key="defaultSize" value="size" disabled>
					Size
				</option>
				{!sizes || !Array.isArray(sizes) || sizes.length < 1 || !sizes[0] ? (
					<option key={'nosize'} value={'No Size'}>
						No Size
					</option>
				) : (
					sizes.map(size => {
						return (
							<option key={size} value={size}>
								{size}
							</option>
						);
					})
				)}
			</select>
		);
	}

	render() {
		if (this.props.products) {
			let sizes = this.getSizes();
			return <div className="col-12 text-center">{sizes}</div>;
		} else {
			return null;
		}
	}
}

export default ProductSizes;
