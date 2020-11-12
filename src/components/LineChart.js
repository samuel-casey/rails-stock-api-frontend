import React, { useEffect } from 'react';
import Chart from 'chart.js';

const LineChart = ({ stock }) => {
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
				console.log('LineChart - json', json);
				const formattedLineData = prepareLineData(json);
				createLineChart(formattedLineData);
			} catch (err) {
				console.error(err);
			}
		};
		makeAPICall();
	}, [stock]);

	const prepareLineData = (data) => {
		const lineChartData = {
			labels: [],
			datasets: [
				{
					label: "Day's Avg. Price (USD)",
					data: [],
					borderColor: '#FFB3B3',
					backgroundColor: '#FFB3B330',
				},
			],
		};

		data.average_prices.forEach((price) => {
			lineChartData.labels.push(price.date);
			lineChartData.datasets[0].data.push(price.price_USD);
		});

		return lineChartData;
	};

	const createLineChart = (data) => {
		const canvas = document.querySelector('#lineChart');
		const tempsChart = new Chart(canvas, {
			type: 'line',
			data: data,
		});
	};

	return (
		<>
			<h1>{stock} Line Chart</h1>
			<canvas id='lineChart' width='300' height='100'></canvas>
		</>
	);
};

export default LineChart;

function addZeroes(value) {
	let newValue = value;
	if (value < 10) {
		newValue = `0${value}`;
	}

	return newValue;
}
