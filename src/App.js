import React, { useState, useEffect } from 'react';
import BarChart from './components/BarChart.js';
import LineChart from './components/LineChart.js';
import './App.css';

function App() {
	const [stock, setStock] = useState('AAPL');
	const [formData, setFormData] = useState('AAPL');

	const handleSubmit = (e) => {
		e.preventDefault();
		setStock(formData);
	};

	const handleChange = (e) => {
		setFormData(e.target.value);
	};

	return (
		<div className='App'>
			<h1>Stock Prices in November</h1>
			<form onSubmit={handleSubmit}>
				<select onChange={handleChange} value={formData} name='symbol'>
					<option>AAPL</option>
					<option>GOOG</option>
					<option>TSLA</option>
				</select>
				<input type='submit' />
			</form>
			<BarChart stock={stock} />
			<LineChart stock={stock} />
		</div>
	);
}

export default App;
