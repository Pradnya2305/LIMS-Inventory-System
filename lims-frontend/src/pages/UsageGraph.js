import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function UsageGraph() {
  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await axios.get('http://localhost:5000/api/analytics/usage', {
          headers: { Authorization: `Bearer ${token}` }
        });

        // ✅ Add this line to see the raw API data
        console.log("Fetched usage data:", res.data);

        const labels = res.data.map(item => item.name);
        const values = res.data.map(item => item.totalUsed);

        setGraphData({
          labels,
          datasets: [{
            label: 'Quantity Used (Last 30 Days)',
            data: values,
            backgroundColor: 'rgba(0, 123, 255, 0.6)'
          }]
        });
      } catch (error) {
        console.error("Error fetching usage graph data:", error);
      }
    };

    fetchData();
  }, []);

  if (!graphData) return <div className="text-center mt-5">Loading graph...</div>;

  return (
    <div className="container mt-4">
      <h4>Component Usage - Last 30 Days</h4>
      <Bar data={graphData} />
    </div>
  );
}

export default UsageGraph;
