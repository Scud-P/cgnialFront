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
  const [selectedQuantity, setSelectedQuantity] = useState('oneHundredQty'); // Default quantity type

  // Define your own colors
  const colors = [
    '#FF6384', // Color for distributor 1
    '#36A2EB', // Color for distributor 2
    '#FFCE56', // Color for distributor 3
    '#4BC0C0', // Color for distributor 4
  ];

  // Map of quantity field names to product names
  const quantityOptions = {
    oneHundredQty: 'Farine de Riz Brun Bio 6x1kg',
    oneHundredTwoQty: 'Farine de Sarrasin Bio 6x1kg',
    oneHundredThreeQty: 'Farine de Pois-Chiches Bio 6x700g',
    oneHundredFourQty: 'Fécule de Tapioca Bio 6x1kg',
    oneHundredFiveQty: 'Farine de Millet Bio 6x1kg',
    oneHundredEightQty: 'Farine de Noix-de-Coco Bio 6x700g',
    oneHundredTenQty: 'Farine de Quinoa Bio 6x700g',
    oneHundredElevenQty: 'Farine de Gourgane Bio 6x700g',
    oneHundredTwelveQty: 'Farine de Pois Jaune Bio 6x700g',
    oneHundredThirteenQty: 'Farine de Lin Bio 6x400g',
    oneHundredFourteenQty: 'Farine de Chanvre Bio 6x400g',
    oneHundredFifteenQty: 'Farine d\'Avoine Bio 6x800g',
    oneHundredSeventeenQty: 'Farine d\'Amaranthe Bio 6x700g',
    oneHundredTwentyFiveQty: 'Mélange tout-usage Bio 6x1kg',
    oneHundredTwentySixQty: 'Mélange à Crêpes Bio 6x700g',
    oneHundredTwentySevenQty: 'Mélange Pain Multgrains Bio 6x700g',
    oneHundredTwentyEightQty: 'Mélange Pain de Ménage Bio 6x700g',
    oneHundredThirtyQty: 'Mélange à Muffins Bio 6x700g',
    oneHundredThirtyOneQty: 'Nouveau Mélange tout-usage bio 6x1kg',
    twoHundredQty: 'Farine de Riz Brun Bio 4x2kg',
    twoHundredTwoQty: 'Farine de Sarrasin Bio 4x2kg',
    twoHundredFourQty: 'Fécule de Tapioca Bio 4x2kg',
    twoHundredFiveQty: 'Farine de Millet Bio 4x2kg',
    twoHundredTwentyFiveQty: 'Mélange tout-usage Bio 4x2kg',
  };
  

  useEffect(() => {
    // Function to fetch and process data
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${API_URL}/distributorCases/byDistributorByYear`);
        const salesData = response.data;
        processChartData(salesData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    // Function to process the fetched data into Chart.js format
    const processChartData = (data) => {
      const years = [...new Set(data.flatMap(distributor => distributor.casesByYear.map(s => s.year)))];

      const datasets = years.map((year, yearIndex) => ({
        label: year.toString(), // Each dataset represents a year
        data: data.map(distributor => {
          const hundredCasesForYear = distributor.casesByYear.find(s => s.year === year);
          return hundredCasesForYear ? hundredCasesForYear[selectedQuantity] : 0; // Use selectedQuantity here
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
  }, [selectedQuantity]); // Fetch DTO from backend when selectedQuantity changes

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Ventes par distributeur par an</h2>

      {/* Dropdown for selecting quantity type */}
      <div className="mb-4 text-center">
        <label htmlFor="quantitySelect" className="mr-2">Select Quantity Type:</label>
        <select
          id="quantitySelect"
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(e.target.value)}
          className="form-select"
        >
          {Object.keys(quantityOptions).map((qtyKey, index) => (
            <option key={index} value={qtyKey}>
              {quantityOptions[qtyKey]} {/* Display product name */}
            </option>
          ))}
        </select>
      </div>

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
