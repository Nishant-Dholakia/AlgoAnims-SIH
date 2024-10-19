import React, { useEffect, useState } from 'react'
import PieChart from '../pieChart/PieChart';
import { useSelector } from 'react-redux';

function LeetcodeActivity() {
    const leetcode = useSelector((state) => state.leetcode);
    const [leetdata,setLeetData] = useState({});
    useEffect(()=>{
        const call = async ()=>{

            const apicall = await fetch(leetcode);
                const obj = await apicall.json();
            setLeetData(obj);
        }
        call();
        // console.log(leetdata);
    },[])


  return (
    <div className='flex flex-wrap w-full'>
        <PieChart 
            totalQuestions={leetdata.totalQuestions}
            totalSolved={leetdata.totalSolved}
            label={'Overall : '}
        />
        <PieChart 
            totalQuestions={leetdata.totalEasy}
            totalSolved={leetdata.easySolved}
            label={'Easy : '}
        />
        <PieChart 
            totalQuestions={leetdata.totalMedium}
            totalSolved={leetdata.mediumSolved}
            label={'Medium : '}
        />
        <PieChart 
            totalQuestions={leetdata.totalHard}
            totalSolved={leetdata.hardSolved}
            label={'Hard : '}
        />

    </div>
  )
}

export default LeetcodeActivity