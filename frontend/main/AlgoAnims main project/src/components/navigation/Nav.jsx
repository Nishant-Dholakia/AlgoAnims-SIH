import React, { useEffect, useRef, useState } from 'react'
// import navjs from './navscript'
import gsap from 'gsap'
import './Nav.css';
import 'remixicon/fonts/remixicon.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Nav() {

  setTimeout(() => {
    // console.log("lagi")
    document.getElementById('modebtn').addEventListener('click', () => {
      let a = document.body.style.backgroundColor;
      let cards = document.getElementsByClassName('card');
      let n = document.getElementById('nav');
      let list = document.getElementById('list');

      if (a === 'white' || a === '' || a === 'rgb(255, 255, 255)') {
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        n.style.backgroundColor = 'black';

        list.style.backgroundColor = 'rgba(0, 0, 0, 0.274)';
        list.style.backdropFilter = 'blur(10px)';

        for (let i = 0; i < cards.length; i++) {
          cards[i].style.backgroundColor = "black";
        }
      } else {
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        n.style.backgroundColor = 'white';

        list.style.backgroundColor = 'rgba(165, 42, 42, 0.045)';
        list.style.backdropFilter = 'blur(10px)';

        for (let i = 0; i < cards.length; i++) {
          cards[i].style.backgroundColor = "white";
        }
      }
    });


    document.getElementById('login').addEventListener('click', () => {
      let a = document.getElementById('login');
      a.style.display = 'none';
      let b = document.getElementById('profile');
      b.style.display = 'block';
    });
  }, 100)

  return (
    <div className='fixed'>
      <nav id="nav">
        <input type="checkbox" id="check" />
        <label htmlFor="check">
          <i className="fa fa-bars float-left" id="btn"></i>
          <i className="fa fa-times float-left" id="cancle"></i>

        </label>
        <p id="lname">AlgoAnims</p>
        <i id="modebtn" className="ri-moon-clear-line"></i>

        <NavLink to="login">
          <button id="login">Login</button>
        </NavLink>

        <img id="profile" src="/frontend/main/AlgoAnims main project/public/profile-icon.jpg" alt="" style={{ display: 'none' }} />

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
