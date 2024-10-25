import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ totalSolved,totalQuestions,label ,Labels = ['Solved','Unsolved']}) => {
  const chartData = {
    labels: Labels, // You can adjust based on your data
    datasets: [
      {
        label: {label},
        data: [totalSolved, totalQuestions - totalSolved], // Example data
        backgroundColor: ['orange', 'blue'], // You can set custom colors here
        hoverBackgroundColor: ['orange', 'blue'],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: '#000000',
        },
      },
      tooltip: {
        bodyColor: '#00FF00', // Change tooltip text color
        titleColor: '#ffffff', // Change tooltip title text color
      },
    },
  };

  return (
    <div style={{ width: '300px', height: '300px', margin:'15px', }}  >
      <div className='text-center  text-lg'
        style={{ fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}
      >{label}</div>  
      <Pie data={chartData} options={chartOptions} width={300} height={300} />
    </div>
  );
};

export default PieChart;
