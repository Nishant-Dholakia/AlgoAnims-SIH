import React from 'react'
import Nav from '../../navigation/Nav.jsx'

import { Outlet } from 'react-router-dom'
import Footer from '../../Footer/Footer.jsx'


function HomeMain() {
    return (
        <>
            <div className='min-h-[100vh]'>
                <Nav />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default HomeMain
