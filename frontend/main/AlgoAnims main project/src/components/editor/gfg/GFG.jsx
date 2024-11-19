import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingPage from '../../LoadingPage';
import PieChart from '../pieChart/PieChart';
import {getGlobalApi} from '../../getGlobalApi'

function GFG() {
  const gfg = useSelector(state => state.gfg);
  const [gfgData, setGfgData] = useState({});
  
  const call = async () => {
    console.log("entered");
    const uname = {
      name: localStorage.getItem("gfg")
    };

    try {
      const api = await fetch(`${getGlobalApi()}/api/gfg`, {
        method: 'post',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(uname)
      });
      const data = await api.json();
      setGfgData(data);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    call();
  }, []);

  useEffect(() => {
    if (gfgData.error) call();
  }, [gfgData]);

  return (
    <>
      {Object.keys(gfgData).length ? (
        <div>
          <div className='userDetails'>
            <div className='flex justify-evenly '>
              <strong>
                Institution : {gfgData.info ? gfgData.info.institution : 'N/A'}
              </strong>
              <strong>
                Institution Rank : 🏅{gfgData.info ? gfgData.info.instituteRank : 'N/A'}
              </strong>
            </div>
            
            <div  className='flex justify-evenly '>
              <strong>
                Current Streak : {gfgData.info ? gfgData.info.currentStreak : 'N/A'}
              </strong>
              <strong>
                  Max Streak : {gfgData.info ? gfgData.info.maxStreak : 'N/A'}
              </strong>
            </div>
            <div  className='flex justify-evenly '>
              <strong>
                Coding Score : {gfgData.info ? gfgData.info.codingScore : 'N/A'}
              </strong>
              <strong>
                Monthly Coding Score : {gfgData.info ? gfgData.info.monthlyCodingScore : 'N/A'}
              </strong>
            </div>
            <div>
              <strong>
                  Languages Used : {gfgData.info ? gfgData.info.languagesUsed : 'N/A'}
              </strong>

            </div>
          </div>
          {
            gfgData.solvedStats ? <div>
            <PieChart 
              label={'Overall Stats'}
              Labels = {['School','Basic','Easy','Medium','Hard']}
              dataValues={[gfgData.solvedStats.school.count,gfgData.solvedStats.basic.count,gfgData.solvedStats.easy.count,gfgData.solvedStats.medium.count,gfgData.solvedStats.hard.count]}
              colors = {['lightgreen','green','orange','orangered','red']}
            />
          </div> : null
          }
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}

export default GFG;
