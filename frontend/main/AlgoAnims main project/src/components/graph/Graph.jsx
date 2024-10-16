import React from 'react'
import './graph.css'

function Graph() {

    function Questions(){
        return(
            <>
             <div className='quecard' >
                <div className='outerglimpse'>
                <img className='glimpse' src="/public/GlimpseGraph.png" alt="jjwn" />
                </div>

              <div className='rightglimpse'>

                <div className='checkmain'>
                <div className='quename' >
                    BFS - Breath first Search
                </div>
                <input className='check' type="checkbox" />
                </div>


                {/* <div className='discription'>
                    <p> Breadth First Search (BFS) is a fundamental graph traversal algorithm. The algorithm starts from a given source and explores all reachable vertices from the given source. </p>
                </div> */}
                <div className='problem' >
                    Problem Practice: &nbsp; <a className='problink' href='https://leetcode.com/problem-list/breadth-first-search/' alt="bfs" > BFS </a> &nbsp; <img className='logo' src="/public/leetcode.svg" alt="" />
                </div>
                <div className='buttons'>
                        <button  className='Articlebtn' >
                            <img className='forinvert' src="/public/Article.svg" alt="*" />Article
                            
                        </button>
                        <button className='Viewbtn'>
                            <img className='forinvert' src="/public/Visualization.svg" alt="" />
                           Visualization
                        </button>
                 
                </div>
              </div>

              </div>
            </>
        )
    }
 



    return (
        <>
        <div className='mainbody'>
           <div className='headbar' >
            <h1>Graph</h1>
            
           </div>

           <div className='listdiv'>
            
           <Questions/>
           <Questions/>
           <Questions/>
           <Questions/>
           <Questions/>
           <Questions/>

            
             
           </div>
        </div>
        </>
    )
}

export default Graph;
