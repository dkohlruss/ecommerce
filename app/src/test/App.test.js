import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { expect } from 'chai';

describe('App.js', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<App />, div);
	});
});
