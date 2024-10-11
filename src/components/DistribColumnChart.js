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

  // Define your own colors
  const colors = [
    '#FF6384', // Color for distributor 1
    '#36A2EB', // Color for distributor 2
    '#FFCE56', // Color for distributor 3
    '#4BC0C0', // Color for distributor 4
  ];

  useEffect(() => {
    // Function to fetch and process data
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${API_URL}/distributorSales/byDistributorByYear`);
        const salesData = response.data;
        processChartData(salesData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    // Function to process the fetched data into Chart.js format
    const processChartData = (data) => {
      const years = [...new Set(data.flatMap(distributor => distributor.salesByYear.map(s => s.year)))];

      const datasets = years.map((year, yearIndex) => ({
        label: year.toString(), // Each dataset represents a year
        data: data.map(distributor => {
          const salesForYear = distributor.salesByYear.find(s => s.year === year);
          return salesForYear ? salesForYear.sales : 0;
        }),
        backgroundColor: colors[yearIndex % colors.length], // Use colors array, cycling through if more years than colors
      }));

      setChartData({
        labels: data.map(distributor => distributor.distributor), // Labels are now the distributors
        datasets: datasets,
      });

      setLoading(false);
    };

    fetchSalesData();
  }, []); // Fetch DTO from backend

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Ventes par distributeur par an</h2>
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
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default DistributorSalesChart;
