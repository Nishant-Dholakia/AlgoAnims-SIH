import React, { useEffect } from 'react'
import { binarySearchscript } from './binary'
import './binary.css'


const BinarySearch = () => {
    useEffect(() => {
        binarySearchscript()
    })
    return (
        <>

            <div className='body'>
                {/* <div className="p-5"> */}
                    <h1 id="heading">BINARY SEARCH</h1>
                    <p>Enter elements of the array (one by one)</p>

                    <div className="element">
                        <input className='border-black border-2' type="text" id="arrayInput" />
                        <button id="searchbtn">ENTER</button>
                    </div>

                    <div id="numberContainer"></div>

                    <p>Enter value which you want to find</p>
                    <div className="element">
                        <input  type="text" className='border-black border-2' id="value" /><button className='searchbtn ' id="searchbtn">SEARCH</button>
                        <div id="confirmationModal" className="modal">
                            <div className="modal-content">
                                <span id="closeModal" className="close">&times;</span>
                                <h2 id="alertred">Alert!!</h2>
                                <p id="alertmessage"></p>
                            </div>
                        </div>
                    </div>

                    <p id="message"></p>
                </div>
            {/* </div> */}
        </>
    )
}

export default BinarySearch