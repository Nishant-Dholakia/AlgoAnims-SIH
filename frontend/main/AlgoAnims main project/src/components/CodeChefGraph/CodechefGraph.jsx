import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea
} from 'recharts';

const CodechefGraph = ({data}) => {
    const [ratings, setRatings] = useState([]);
  const [maxRating, setMaxRating] = useState(0);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
      setRatings(data.ratingData);
      let min = 10000;
      let max = 0;

      data.ratingData.forEach((element) => {
        min = Math.min(min, element.rating);
        max = Math.max(max, element.rating);
      });

      setMinRating(min - 200);
      setMaxRating(max + 200);
  }, []);


    return (
          <ResponsiveContainer width="100%" height={400} className='mr-5 mb-5'>
            <LineChart
              width={500}
              height={300}
              data={ratings}
              style={{ backgroundColor: 'white' }}
            >
              
              <XAxis dataKey="contestName" />
              <YAxis domain={[minRating, maxRating]} tickCount={10} />
              <Tooltip />
              <Legend />

              <ReferenceArea y1={1400} y2={1599} fill="#8FA98B" /> 
              <ReferenceArea y1={1600} y2={1799} fill="#7D8DCF" /> 
              <ReferenceArea y1={1800} y2={1999} fill="#856381" /> 
              <ReferenceArea y1={2000} y2={2199} fill="#C2A228" /> 
              <ReferenceArea y1={2200} y2={2499} fill="#CC9470" /> 
              <ReferenceArea y1={2500} y2={maxRating} fill="#B35E68" /> 


              <Line type="monotone" dataKey="rating" stroke="#8884d8"  />
            </LineChart>
          </ResponsiveContainer>
    )

  
}

export default CodechefGraph