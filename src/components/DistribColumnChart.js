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
      const datasets = data.map(distributor => ({
        label: distributor.distributor,
        data: years.map(year => {
          const salesForYear = distributor.salesByYear.find(s => s.year === year);
          return salesForYear ? salesForYear.sales : 0;
        }),
        backgroundColor: getRandomColor(),
      }));

      setChartData({
        labels: years,
        datasets: datasets,
      });

      setLoading(false);
    };

    fetchSalesData();
  }, []); // Fetch DTO from backend

  // Utility function to generate random colors for each distributor
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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
