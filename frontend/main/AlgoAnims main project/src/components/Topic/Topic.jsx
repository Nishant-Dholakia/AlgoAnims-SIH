import React, { useState, useEffect, useRef } from 'react';
import './topic.css';
import data from './data.json';
import { Link, useLocation } from 'react-router-dom';
import { getGlobalApi } from '../getGlobalApi'

function Topic() {
    const link = useLocation();
    const path = link.pathname;
    const [checked, setChecked] = useState(false)

    const [info, setInfo] = useState([]);
    const [topic, setTopic] = useState("");
    const widthRef = useRef(0);
    const totalqRef = useRef(0);
    const tickref = useRef(0);
    const topicRef = useRef("");

    let [score, setScore] = useState(0);

    useEffect(() => {
        if (path.includes("/graph")) {
            setTopic("Graph");
            topicRef.current = "graph";
            setInfo(data.graph);
            totalqRef.current = Object.keys(data.graph).length;

        } else if (path.includes("/tree")) {
            setTopic("Tree");
            topicRef.current = "tree";
            setInfo(data.tree);
            totalqRef.current = Object.keys(data.tree).length;
        } else if (path.includes("/binarysearchtree")) {
            setTopic("Binary Search Tree");
            topicRef.current = "binarysearchtree";
            setInfo(data.binarysearchtree);
            totalqRef.current = Object.keys(data.binarysearchtree).length;
        } else if (path.includes("/sort")) {
            setTopic("Sort");
            topicRef.current = "sort";
            setInfo(data.sort);
            totalqRef.current = Object.keys(data.sort).length;
        } else if (path.includes("/search")) {
            setTopic("Search");
            topicRef.current = "search";
            setInfo(data.search);
            totalqRef.current = Object.keys(data.search).length;
        }

        fetch(`${getGlobalApi()}/score/getscore`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({id : localStorage.getItem("id") , topic : topicRef.current})
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            let qname = [];
            let score = [];
            let totalscore = 0;
            data.score.forEach(item=>{
                qname.push(item.qname);
                score.push(item.score);
                totalscore += item.score;
            })
            tickref.current = totalscore;

            document.querySelector(".score").textContent = tickref.current;
            widthRef.current = (tickref.current / totalqRef.current) * 100;

            document.getElementById("progressbar").style.width = `${widthRef.current}%`;

            let idx = 0;
            document.querySelectorAll("input").forEach(item=>{
                item.checked = qname.includes(item.value) && score[idx++];
            })
        })

        // console.log(totalqRef.current)
    }, [path]);


    function handleChange(evt) {
        let temp = evt.target.checked ? 1 : -1;
        tickref.current += temp;
        console.log(tickref.current, score)
        
        document.querySelector(".score").textContent = tickref.current;
        widthRef.current = (tickref.current / totalqRef.current) * 100;

        document.getElementById("progressbar").style.width = `${widthRef.current}%`;

        fetch(`${getGlobalApi()}/score/update`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({id : localStorage.getItem("id") , topic : topicRef.current.toLowerCase() , qname : evt.target.value , checked : evt.target.checked})
        })
    }


    function Questions({ data }) {
        return (
            <div className='quecard'>
                <div className='outerglimpse'>
                    <img className='glimpse' src={data.img} alt="jjwn" />
                </div>
                <div className='rightglimpse'>
                    <div className='checkmain'>
                        <div className='quename'>
                            {data.qname}
                        </div>
                        <input

                            onClick={handleChange}
                            value={data.qname} name={data.qname} className='check w-5 cursor-pointer' type="checkbox" />
                    </div>
                    <div className='w-full rounded-2xl flex justify-center items-center h-full'>
                        <p >{data.discription}</p>
                    </div>
                    <div className='problem'>
                        Problem Practice: &nbsp; <a className='problink' href={data.problink} alt="bfs">{data.qname}</a> &nbsp; <img className='logo' src="/leetcode.svg" alt="" />
                    </div>
                    <div className='buttons'>
                        <Link className='Articlebtn' to={data.article}>
                            <img className='forinvert' src="/Article.svg" alt="*" />Article
                        </Link>
                        <Link className='Viewbtn' to={data.visualization}>
                            <img className='forinvert' src="/Visualization.svg" alt="" />
                            Visualization
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // console.log(info , typeof(info))
    return (
        <div className='mainbody body'>
            <div id="progressbar" className='progressbar h-2'></div>
            <div className='headbar flex justify-between items-center gap-10'>
                <h1>{topic}</h1>
                <p>
                    <span className='font-bold score'>0</span> / {totalqRef.current}
                </p>
            </div>
            <div className='listdiv'>
                {Object.keys(info).map((item, index) => (
                    <Questions data={info[item]} />
                ))}
            </div>
        </div>
    );
}

export default Topic;
