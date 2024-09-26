import React, { useEffect } from 'react'
import navjs from './navscript'
import gsap from 'gsap'
function Nav() {
   useEffect(()=>{
    setTimeout(()=>{
        navjs();
    } , 100)
   } , [])
  return (
    <div>
      <nav id="nav">
        <input type="checkbox" id="check" />
        <label htmlFor="check">
            <i  className="fas fa-bars float-left" id="btn"></i>
            <i  className=" float-left fas fa-times" id="cancle"></i>
        </label>
        <p id="lname">AlgoAnims</p>
        <i id="modebtn" className="ri-moon-clear-line"></i>
        <button id="login">Login</button>
        <img id="profile" src="/frontend/main/AlgoAnims main project/public/profile-icon.jpg" alt="" style= {{display: 'none'}} />
    
     <ul id="list">
             <li id="topic">Graph</li>
                <li>BFS traversal</li>
                <li>DFS traversal</li>
                <li>Prim's Algorithm</li>
                <li >Kruskal's Algorithm</li>
                <li >Dijkstra's Algorithm</li>

            <li id="topic">Tree</li>
                <li >Inorder traversal</li>
                <li>Postorder traversal</li>
                <li >Preorder traversal</li>
                <li >Level-order traversal</li>
                <li>BST-insertion</li>
                <li >BST-deletion</li>
                <li id="topic">Searching</li>
                <li>Linear</li>
                <li>Binary </li> 

            <li id="topic">Sorting</li>
                <li >Insertion</li>
                <li >Bubble</li>
                <li >Selection</li>
                <li >Merge</li>
               
                <li >Quick</li>
                <li >Quick</li>
                <li>Quick</li>

           
        </ul>
    </nav>
    </div>
  )
}

export default Nav
