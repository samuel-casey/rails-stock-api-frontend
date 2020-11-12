import React, { useEffect } from 'react';
import Chart from 'chart.js';

const BarChart = ({ stock }) => {
	let symbolId;

	if (stock === 'AAPL') {
		symbolId = 1;
	} else if (stock === 'GOOG') {
		symbolId = 2;
	} else if (stock === 'TSLA') {
		symbolId = 3;
	}

	useEffect(() => {
		const makeAPICall = async () => {
			try {
				const res = await fetch(
					`http://localhost:3000/stocks/${stock ? symbolId : 1}`
				);
				const json = await res.json();
				console.log('BarChart - json', json);
				const formattedBarData = prepareBarData(json);
				createBarChart(formattedBarData);
			} catch (err) {
				console.error(err);
			}
		};
		makeAPICall();
	}, [stock]);

	const prepareBarData = (data) => {
		const barChartData = {
			labels: [],
			datasets: [
				{
					label: "Day's Avg. Price USD",
					data: [],
					borderColor: '#DDCCFF',
					borderWidth: '2',
					backgroundColor: '#DDCCFF30',
				},
			],
		};

		data.average_prices.forEach((price) => {
			barChartData.labels.push(price.date);
			barChartData.datasets[0].data.push(price.price_USD);
		});
		return barChartData;
	};

	const createBarChart = (data) => {
		const canvas = document.querySelector('#barChart');
		const tempsChart = new Chart(canvas, {
			type: 'bar',
			data: data,
		});
	};

	return (
		<>
			<h1>{stock} Bar Chart</h1>
			<canvas id='barChart' width='300' height='100'></canvas>
		</>
	);
};

export default BarChart;

function addZeroes(value) {
	let newValue = value;
	if (value < 10) {
		newValue = `0${value}`;
	}

	return newValue;
}
