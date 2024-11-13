import React, { useEffect } from 'react'
import './linear.css'
import { linearSerach } from './linear'

const Linear = () => {
    useEffect(() => {
       linearSerach();
    })
    return (
        <div className='body3'>
            
            <h1 id="heading">LINEAR SEARCH</h1>
            <p>Enter elements of the array (one by one)</p>
            <div class="element">
                <input className='border-2' type="text" id="arrayInput" />
                <button id="enterbtn" >ENTER</button>
            </div>
            <div class="container" id="numberContainer"></div>

            <p>Enter value which you want to find</p>

            <div class="element">
                <input className='border-2' type="text" id="value" />
                <button  id="searchbtn">SEARCH</button>
                <div id="confirmationModal" class="modal">
                    <div class="modal-content">
                        <span id="closeModal" class="close">&times;</span>
                        <h2 id="alertred">Alert!!</h2>
                        <p id="alertmessage"></p>
                    </div>
                </div>
            </div>
            <p id="message"></p>
        </div>
    )
}

export default Linear