import React, { useEffect,useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Include the default styles
import '../../heatMap/heatMap.css'
function LeetHeatMap({values}) {
    const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
console.log(values);
  useEffect(()=>
{
    const end = new Date(values[values.length - 1].date);
        const initialDate = new Date();
        initialDate.setDate(end.getDate() - 365);
        
        setStartDate(initialDate.toISOString().split('T')[0]);
        setEndDate(end);

},[])
function RankOf(value) {
    if (value === 0) {
      return 0; // No activity (optional)
    } else if (value <= 5) {
      return 1; 
    } else if (value <= 10) {
      return 2; 
    } else if (value <= 15) {
      return 3; 
    } else if (value <= 20) {
      return 4; 
    } else if (value <= 25) {
      return 5; 
    } else if (value <= 30) {
      return 6; 
    } else {
      return 7; 
    }
  }
  return (
    <div className='w-full text-center mt-9'>

      <h2 className='dark:text-white text-xl font-bold w-full align-middle'>Heatmap</h2>
      
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
  )
}

export default LeetHeatMap