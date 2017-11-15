import React, { Component } from 'react';

class ProductSizes extends Component {
	constructor(props) {
		super(props);

		this.sizes = this.getSizes();
	}

	getSizes() {
		let sizes = this.props.products.map(product => {
			return product.size;
		});

		return (
			<select
				name="size"
				key={`size${this.props.products[0].name}`}
				className="product-select product-size-select"
				defaultValue="size"
				onChange={event => {
					this.props.handleChange(event.target.value);
				}}
			>
				<option key="defaultSize" value="size" disabled>
					Size
				</option>
				{sizes.map(size => {
					if (!size) {
						return (
							<option key={'nosize'} value={'No Size'}>
								No Size
							</option>
						);
					}
					return (
						<option key={size} value={size}>
							{size}
						</option>
					);
				})}
			</select>
		);
	}

	render() {
		let sizes = this.getSizes();
		return <div className="col-12 text-center">{sizes}</div>;
	}
}

export default ProductSizes;
