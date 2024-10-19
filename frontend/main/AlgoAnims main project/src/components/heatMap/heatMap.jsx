import React, { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; // Include the default styles
import "./heatMap.css";

function MyHeatmap ()  {
  const [values, setValues] = useState([]);
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [userName,setUserName]= useState(localStorage.getItem("codechef"));
 
  // setUserName(localStorage.getItem("codechef"));
  
  useEffect(() => {
    // Fetch data inside useEffect
    const fetchData = async () => {
      try {
        const api = await fetch(`https://codechef-api.vercel.app/handle/${userName}`);
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
      <h2 className='dark:text-white'>CodeChef HeatMap</h2>
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
        <div role="status">
        <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
      )}
    </div>
  );
};

export default MyHeatmap;
