import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ totalSolved,totalQuestions,label ,Labels = ['Solved','Unsolved'],colors = ['orange', 'blue'],dataValues = [totalSolved, totalQuestions - totalSolved]}) => {
  const chartData = {
    labels: Labels, // You can adjust based on your data
    datasets: [
      {
        label: {label},
        data: dataValues, // Example data
        backgroundColor: colors, // You can set custom colors here
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
    <div style={{ width: '300px', height: '300px' }}  >
      <div className='text-center  text-lg'
        style={{ fontWeight: 'bold', fontStyle: 'italic', textDecoration: 'underline' }}
      >{label}</div>  
      <Pie data={chartData} options={chartOptions} width={300} height={300} />
    </div>
  );
};

export default PieChart;
