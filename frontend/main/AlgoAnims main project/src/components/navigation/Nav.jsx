
import './Nav.css';
import 'remixicon/fonts/remixicon.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link,NavLink } from "react-router-dom";
import { Reload } from '../../Functions/Reload';
import { useEffect ,useState} from 'react';
import { toast } from 'react-toastify';
import {getGlobalApi} from '../getGlobalApi'



// function Mode() {
     
  

// // document.getElementById('modebtn')?.addEventListener('click', () => {});

// }

function logout() {
  let conform = confirm("DO you want logout");

  if (conform) {

    localStorage.clear();
   
   
    // console.log("User logged out, localStorage cleared.");
    fetch(`${getGlobalApi()}/user/logout`, {
      method: 'POST',
      credentials : 'include'
    })
    localStorage.setItem("logout",true);
    Reload("logoutReload");
    
  }else{
    toast.error("user can't logout!")
  }

}

function Nav() {

  const [mode,setmode] = useState("light");
  useEffect(()=>{

    document.querySelector('html').classList.remove("light","dark");
    document.querySelector('html').classList.add(mode);
},[mode])
    

  // window.localStorage.removeItem("UserName");

  useEffect(() => {

      if(localStorage.getItem("logout") == "true"){
        toast.success("user logout!")
        localStorage.setItem("logout",false);
      }

  }, []);

  // setTimeout(() => {
    // document.getElementById('modebtn')?.addEventListener('click',
     function change() {
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
      
      // let in = 0;
      let Filter = document.querySelectorAll('.forinvert') ;
      Filter.forEach((Filter)=>{
        if(!Filter.style.filter)
          Filter.style.filter = 'invert(1)';
        else
          Filter.style.filter = '';
}
      )


      if(mode=="light")
        {
          setmode("dark")
        }
        else
        {
          setmode("light")
        }
      
    }


  

  return (
    <div className='fixed'>
      <nav id="nav" >
        <input type="checkbox" id="check" />
        <label htmlFor="check">
          <i className="fa fa-bars float-left" id="btn"></i>
          <i className="fa fa-times float-left" id="cancle"></i>

        </label>
        <NavLink to='/'><p id="lname">AlgoAnims</p></NavLink>
        <div >
         <i onClick={change} id="modebtn" className="ri-moon-clear-line ml-5"></i>
        </div>
        {!localStorage.getItem("UserName")
          ?
          
          <NavLink to="login">
            <button id="login">Login</button>
          </NavLink> :

          <div className="">
            <NavLink to="/profile">
              <img id='profile' src="/profile-icon.jpg" alt="pro" />
            </NavLink>

           <div className=''>
            <button
              onClick={logout}
              className='float-right relative top-8 font-bold px-2'>
              Logout
            </button>
            </div>
            
          </div>

        }

        <ul id="list" className='cursor-pointer'>
          <Link to={"/graph"}>
          <li id="topic">Graph</li>
          </Link>
          <li>BFS traversal</li>
          <li>DFS traversal</li>
          <li>Prim's Algorithm</li>
          <li >Kruskal's Algorithm</li>
          <li >Dijkstra's Algorithm</li>

          <li id="topic">Tree</li>
          <li><Link to="/tree/inorder">Inorder traversal</Link></li>
          <li> <Link to="/tree/postorder">Postorder traversal </Link> </li>
          <li > <Link to="/tree/preorder"> Preorder traversal </Link> </li>
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
