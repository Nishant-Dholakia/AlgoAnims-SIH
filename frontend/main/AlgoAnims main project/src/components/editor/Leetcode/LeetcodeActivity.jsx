import React, { useEffect, useState } from 'react'
import PieChart from '../pieChart/PieChart';
import { useSelector } from 'react-redux';

function LeetcodeActivity() {
    const leetcode = useSelector((state) => state.leetcode);
    const [leetdata,setLeetData] = useState({});
    useEffect(()=>{
        const call = async ()=>{
            
                console.log("entered");
                const apicall = await fetch(leetcode);
                const obj = await apicall.json();
                setLeetData(obj);
        }
            call();
    },[])
    
    console.log(leetdata);

  return (
    <>
        <div>
            <div>
                <strong>
                    Rating : {leetdata.ranking}
                </strong>
            </div>
            <div>
                <strong>
                    Contribution Points : {leetdata.contributionPoints}
                </strong>
            </div>
            {
                leetdata.reputation ? <div><strong>
                Reputation : {leetdata.reputation}
                </strong></div> : null
            }
                
        
            
        </div>

        <div className='flex flex-wrap w-full'>
            <PieChart 
                totalQuestions={leetdata.totalQuestions}
                totalSolved={leetdata.totalSolved}
                label={'Overall'}
            />
            <PieChart 
                totalQuestions={leetdata.totalEasy}
                totalSolved={leetdata.easySolved}
                label={'Easy'}
            />
            <PieChart 
                totalQuestions={leetdata.totalMedium}
                totalSolved={leetdata.mediumSolved}
                label={'Medium'}
            />
            <PieChart 
                totalQuestions={leetdata.totalHard}
                totalSolved={leetdata.hardSolved}
                label={'Hard'}
            />
             <PieChart 
                totalQuestions={100}
                totalSolved={leetdata.acceptanceRate}
                label={'Acceptance Rate'}
                Labels = {['Accepted','Not Accepted']}
            />
        </div>




    </>

  )
}

export default LeetcodeActivity