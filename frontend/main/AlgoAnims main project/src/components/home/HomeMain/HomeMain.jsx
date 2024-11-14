import React from 'react'
import Nav from '../../navigation/Nav.jsx'

import { Outlet } from 'react-router-dom'
import Footer from '../../Footer/Footer.jsx'


function HomeMain() {
    return (
        <>
        <Nav/>
        <Outlet/>
        <Footer/>
        </>
    )
}

export default HomeMain
