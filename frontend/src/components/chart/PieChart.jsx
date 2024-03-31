import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ data }) => {
  const pieChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    // Destroy any existing Chart
    if (pieChartRef.current && pieChartRef.current.chart) {
      pieChartRef.current.chart.destroy();
    }

    // Prepare data for pie chart
    const pieChartData = {
      labels: data.map((item) => item.Name),
      datasets: [
        {
          data: data.map((item) => item.ResourceRecordSetCount),
          backgroundColor: data.map((item, index) => getColor(index)),
        },
      ],
    };

    // Initialize pie chart
    const pieCtx = pieChartRef.current.getContext('2d');
    pieChartRef.current.chart = new Chart(pieCtx, {
      type: 'pie',
      data: pieChartData,
    });
  }, [data]);

  useEffect(() => {
    // Destroy any existing Chart instances for line chart
    if (lineChartRef.current && lineChartRef.current.chart) {
      lineChartRef.current.chart.destroy();
    }

    // Prepare data for line chart
    const lineChartData = {
      labels: data.map((item) => item.Name),
      datasets: [
        {
          label: 'Records of DNS Each domain',
          data: data.map((item) => item.ResourceRecordSetCount),
          borderColor: 'blue',
          borderWidth: 2,
          backgroundColor: 'white',
        },
      ],
    };

    // Initialize line chart
    const lineCtx = lineChartRef.current.getContext('2d');
    lineChartRef.current.chart = new Chart(lineCtx, {
      type: 'line',
      data: lineChartData,
    });
  }, [data]);

  const getColor = (index) => {
    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#496989',
      '#58A399',
      '#A8CD9F',
      '#E2F4C5',
      '#007F73',
      '#ac769d',
      '#fa8aa0',
      '#76885B',
      '#E178C5',
      '#9BB0C1',
      '#FCDC2A',
    ];
    return colors[index % colors.length];
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      <div
        style={{
          width: '45%',
          height: '50vh',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '1px 1px 15px 1px #c9bfbf'
        }}
      >
        <canvas ref={pieChartRef}></canvas>
      </div>
      <div
        style={{
          width: '45%',
          height: '50vh',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '1px 1px 15px 1px #c9bfbf'
        }}
      >
        <canvas ref={lineChartRef}></canvas>
      </div>
    </div>
  );
};

export default PieChart;
