import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Include the default styles
import "./heatMap.css";
import LoadingPage from '../LoadingPage';
function MyHeatmap ({values})  {
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();

  
  useEffect(() => {

        const end = new Date(values[values.length - 1].date);
        const initialDate = new Date();
        initialDate.setDate(end.getDate() - 365);
        
        setStartDate(initialDate.toISOString().split('T')[0]);
        setEndDate(end);

  }, []); 

  function RankOf(value) {
    if (value === 0) {
      return 0; // No activity (optional)
    } else if (value <= 10) {
      return 1; // Very Low (1-10)
    } else if (value <= 20) {
      return 2; // Low (11-20)
    } else if (value <= 30) {
      return 3; // Moderate (21-30)
    } else if (value <= 40) {
      return 4; // High (31-40)
    } else if (value <= 50) {
      return 5; // Very High (41-50)
    } else if (value <= 75) {
      return 6; // Extreme (51-75)
    } else {
      return 7; // Max (76+)
    }
  }

  return (
    <div>
      <div className='flex justify-center text-2xl mb-4'><h2 className='dark:text-white font-bold'> Heatmap</h2></div>
        <div className='jaytay'>
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
            showWeekdayLabels={true}
            classForValue={(value) => {
              if (!value || !value.value) {
                return 'color-empty';
              }
              return `color-scale-${RankOf(value.value)}`;
            }}
          />
        </div>
    </div>
  );
};

export default MyHeatmap;
