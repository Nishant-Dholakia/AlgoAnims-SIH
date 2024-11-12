import React, { useEffect, useRef, useState } from 'react'
import { randomArray , drawtree } from './array'
import { setTheme } from 'binary-tree-visualizer'
import { animation } from './sorting'


const Heapsort = () => {
    setTheme({
        fontSize : 16,
        strokeColor : "#111"
        
    })

    const [insert, setinsert] = useState(0)
    const [arr, setArr] = useState([]);
    const arrRef = useRef([]);
    const [start , setstart] = useState(false);
    const arrDivRef = useRef(null)
    const rootRef = useRef(null)

    useEffect(() => {
        setTheme({
            radius : 36
        })
        let array = randomArray();
        setArr(array)
        arrRef.current = array
        const root = drawtree(document.querySelector("canvas") , arrRef.current);
        rootRef.current = root;
    }, [])

    useEffect(()=>{
        if(start){
            console.log(arrRef.current)
            let allDivs = arrDivRef.current.querySelectorAll("div");
            
            if(rootRef.current){
                animation(allDivs , document.querySelector("#heap") , arrRef.current ,rootRef.current);
            }
        }
    } , [start])

    return (
        <>
            <h1>Heap Sort</h1>
            <div 
            ref={arrDivRef}
            className='flex flex-wrap justify-center '>
                {arr.map((ele, idx) => {
                    return <>
                        <div className='p-4 text-black bg-white border-black border-2'
                            key={idx}
                        >
                            <h3 key={idx}>{ele}</h3>
                        </div>
                    </>
                })}
            </div>

           <button
           onClick={()=>{
            setstart((prev)=>!prev)
           }}
           className='p-2 bg-green-400 rounded-md'>Start</button>
           <canvas id='heap' className='w-1/2 h-1/2 bg-zinc-300'></canvas>
        </>
    )
}

export default Heapsort