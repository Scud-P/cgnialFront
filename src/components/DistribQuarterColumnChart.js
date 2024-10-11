import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_URL = 'http://localhost:8080';

const DistributorSalesChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  // Define your own colors for each quarter
  const colors = [
    '#FF6384', // Q1
    '#36A2EB', // Q2
    '#FFCE56', // Q3
    '#4BC0C0', // Q4
  ];

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${API_URL}/distributorSales/byDistributorByYearByQuarter`);
        const salesData = response.data;
        processChartData(salesData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    const processChartData = (data) => {
      const distributors = data.map(distributor => distributor.distributor);
      const years = [...new Set(data.flatMap(d => d.yearlySales.map(y => y.year)))];

      const datasets = [];

      // Create a dataset for each quarter
      for (let quarter = 1; quarter <= 4; quarter++) {
        datasets.push({
          label: `Q${quarter}`,
          data: distributors.flatMap(distributor => {
            const salesForDistributor = data.find(d => d.distributor === distributor);
            const sales = salesForDistributor.yearlySales.map(yearlySales => {
              const quarterlySale = yearlySales.quarterlySales.find(q => q.quarter === quarter);
              return quarterlySale ? quarterlySale.sales : 0;
            });
            return sales; // Return an array of sales for each year
          }),
          backgroundColor: colors[quarter - 1],
        });
      }

      // Update chartData
      setChartData({
        labels: distributors.flatMap(distributor => years.map(year => `${distributor} - ${year}`)),
        datasets,
      });

      setLoading(false);
    };

    fetchSalesData();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Ventes par distributeur par année</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                stacked: true, // Enable stacking on y-axis
              },
              x: {
                stacked: true, // Enable stacking on x-axis
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default DistributorSalesChart;
