import React, { useState,useEffect } from 'react'
import CodechefGraph from '../../CodeChefGraph/CodechefGraph'
import MyHeatmap from '../../heatMap/heatMap'
import { useSelector } from 'react-redux';
import LoadingPage from '../../LoadingPage';

function CodeChef() {

    const codechef = useSelector((state) => state.codechef);
    
    const [values,setValues] = useState({});
    const fetchData = async () => {
            const api = await fetch(codechef);
            const data = await api.json();
            setValues(data);     
    };

    useEffect(() => {
      fetchData();
    }, []);
    console.log(values);

    useEffect(()=>
    {
        if(values && values.status !== 200 && !values.heatMap && !values.ratingData)
            fetchData()
    },[values])

  return values && values.status === 200 && values.heatMap && values.ratingData ?
    (<div>
        <div className="details mb-4">
            <div className='flex gap-10'>
                <strong>
                    User Name : {values.name}
                </strong>
                <strong className='flex'>
                <img src={values.countryFlag} alt="" />
                    {values.countryName}
                </strong>
            </div>
            <div  className='flex justify-evenly '>
                <strong className='flex gap-3'>
                    <div>
                    Current Rating : {values.currentRating || 'N/A'}
                    </div>
                    <div>
                        {values.stars}
                    </div>
                </strong>
                <strong>
                    Maximum Rating : {values.highestRating || 'N/A'}
                </strong>
            </div>
            <div className='flex justify-evenly'>
                <strong>
                    Country Rank : {values.countryRank}
                </strong>
                <strong>
                Global Rank : {values.globalRank}
                </strong>
            </div>
        </div>
        <MyHeatmap values={values.heatMap}/>
        <CodechefGraph data={values}/>
    </div>) : 
    <LoadingPage />

  
}

export default CodeChef