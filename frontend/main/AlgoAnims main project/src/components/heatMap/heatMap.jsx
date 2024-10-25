import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Include the default styles
import "./heatMap.css";
import { useSelector } from 'react-redux';
import LoadingPage from '../LoadingPage';
function MyHeatmap ()  {
  const [values, setValues] = useState([]);
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
 
  // setUserName(localStorage.getItem("codechef"));
  const codechef = useSelector((state) => state.codechef);
  // const [codedata,setcodeData] = useState({});
  
  useEffect(() => {
    // Fetch data inside useEffect  
    
    const fetchData = async () => {
      try {



        const api = await fetch(codechef);
        const data = await api.json();

        const val = data.heatMap;
        setValues(val);

        // Set endDate and startDate based on fetched data
        const end = new Date(val[val.length - 1].date);
        const initialDate = new Date();
        initialDate.setDate(end.getDate() - 365);
        
        setStartDate(initialDate.toISOString().split('T')[0]);
        setEndDate(end);
        
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData(); // Call the async function inside useEffect
  }, []); // Empty dependency array so it runs only once on mount

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
      <h2 className='dark:text-white font-bold'>CodeChef heatmap</h2>
      {values.length !== 0 ? (
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
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default MyHeatmap;
