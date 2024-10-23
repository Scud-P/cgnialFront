import React, { useState } from 'react';
import DistribColumnChart from './DistribColumnChart';
import DistribQuarterColumnChart from './DistribQuarterColumnChart'
import DistribCasesColumnChart from './DistribCasesColumnChart';

const SalesMenu = () => {
  const [selectedChart, setSelectedChart] = useState('');

  // Handle button click to display a specific chart
  const handleChartSelection = (chartType) => {
    setSelectedChart(chartType);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 bg-light sidebar">
          <div className="position-sticky">
            <div className="list-group list-group-flush">
              <h5 className="list-group-item">Distributeurs</h5>
              <button 
                className="list-group-item list-group-item-action"
                onClick={() => handleChartSelection('distributorByYear')}
              >
                Par année ($)
              </button>
              <button 
                className="list-group-item list-group-item-action"
                onClick={() => handleChartSelection('distributorByQuarter')}
              >
                Par trimestre ($)
              </button>
              <button 
                className="list-group-item list-group-item-action"
                onClick={() => handleChartSelection('casesByYear')}
              >
                Par année (caisses)
              </button>
              <h5 className="list-group-item mt-3">Détaillants</h5>
              <button 
                className="list-group-item list-group-item-action"
                onClick={() => handleChartSelection('retailerByYear')}
                disabled // Disable until the component is ready
              >
                Par année
              </button>
              <button 
                className="list-group-item list-group-item-action"
                onClick={() => handleChartSelection('retailerByQuarter')}
                disabled // Disable until the component is ready
              >
                Par trimestre
              </button>
            </div>
          </div>
        </nav>

        {/* Main content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="chart-container mt-4">
            {selectedChart === 'distributorByYear' && <DistribColumnChart />}
            {selectedChart === 'distributorByQuarter' && <DistribQuarterColumnChart/>}
            {selectedChart === 'casesByYear' && <DistribCasesColumnChart />}

            {/* Commented out the below charts as they are not implemented yet */}
            {/* {selectedChart === 'retailerByYear' && <RetailerSalesChart />} */}
            {/* {selectedChart === 'retailerByQuarter' && <RetailerSalesChart period="quarter" />} */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesMenu;
