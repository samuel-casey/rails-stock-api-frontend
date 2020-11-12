import React, { useState, useEffect } from 'react';
import BarChart from './components/BarChart.js';
import LineChart from './components/LineChart.js';
import './App.css';

function App() {
	const [location, setLocation] = useState({});
	return (
		<div className='App'>
			<h1>Stock Prices in November</h1>
			<BarChart />
			<LineChart />
		</div>
	);
}

export default App;
