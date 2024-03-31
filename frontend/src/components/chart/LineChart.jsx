// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const ChartComponent = ({ data }) => {
//   const pieChartRef = useRef(null);
//   const lineChartRef = useRef(null);

//   useEffect(() => {
//     // Destroy any existing Chart instances for pie chart
//     if (pieChartRef.current && pieChartRef.current.chart) {
//       pieChartRef.current.chart.destroy();
//     }

//     // Prepare data for pie chart
//     const pieChartData = {
//       labels: data.map(item => item.Name),
//       datasets: [{
//         data: data.map(item => item.ResourceRecordSetCount),
//         backgroundColor: data.map((item, index) => getColor(index)),
//       }]
//     };

//     // Initialize pie chart
//     const pieCtx = pieChartRef.current.getContext('2d');
//     pieChartRef.current.chart = new Chart(pieCtx, {
//       type: 'pie',
//       data: pieChartData
//     });

//     // Prepare data for line chart (example data)
//     const lineChartData = {
//       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//       datasets: [{
//         label: 'Sales',
//         data: [65, 59, 80, 81, 56, 55],
//         borderColor: 'blue',
//         borderWidth: 1
//       }]
//     };

//     // Initialize line chart
//     const lineCtx = lineChartRef.current.getContext('2d');
//     lineChartRef.current.chart = new Chart(lineCtx, {
//       type: 'line',
//       data: lineChartData
//     });

//   }, [data]);

//   const getColor = (index) => {
//     // Your color logic here
//     const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];
//     return colors[index % colors.length];
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//       <div style={{ width: '45%' }}>
//         <canvas ref={pieChartRef}></canvas>
//       </div>
//       <div style={{ width: '45%' }}>
//         <canvas ref={lineChartRef}></canvas>
//       </div>
//     </div>
//   );
// };

// export default ChartComponent;
