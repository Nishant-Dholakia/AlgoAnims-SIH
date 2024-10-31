import React, { useEffect, useState } from 'react'
import PieChart from '../pieChart/PieChart';
import { useSelector } from 'react-redux';
import LeetHeatMap from './LeetHeatMap';
import LoadingPage from '../../LoadingPage';

function LeetcodeActivity() {
    const leetcode = useSelector((state) => state.leetcode);
    const [leetdata,setLeetData] = useState({});
    const [heatmap,setHeatmap] = useState([]);
    const call = async ()=>{
        
            console.log("entered");
            const apicall = await fetch(leetcode);
            const obj = await apicall.json();
            console.log(obj);
            setLeetData(obj);
        }
    useEffect(()=>{
            call();
    },[])
    useEffect(() => {
        const formatDate = (milliseconds) => {
            const date = new Date(milliseconds);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1); // Months are 0-based
            const day = String(date.getDate());
            // console.log(date)
            return `${year}-${month}-${day}`;
        };
        if(leetdata)
        {

            if(leetdata.status === 500)
                call();
            else if (leetdata.submissionCalendar) {
                for (const [timestamp, submissions] of Object.entries(leetdata.submissionCalendar)) {
                    console.log(`Timestamp: ${timestamp}, Submissions: ${submissions}`);
                    setHeatmap(prev => [...prev,{date : formatDate(timestamp*1000),value : submissions}]);
                }
            }
        }
    }, [leetdata]);
    
    
    console.log(leetdata,heatmap);

  return leetdata && leetdata.status !== 500 ? (<div>

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

                <div className='flex flex-wrap gap-6'>
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
                { heatmap.length && <LeetHeatMap values = {heatmap} />}
               </div>) : <LoadingPage /> 
               }


export default LeetcodeActivity