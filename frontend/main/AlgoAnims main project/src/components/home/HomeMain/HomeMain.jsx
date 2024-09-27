import React from 'react'
import Nav from '../../navigation/Nav'

import { Outlet } from 'react-router-dom'


function HomeMain() {
    return (
        <>
        <Nav/>
        <Outlet/>
        </>
    )
}

export default HomeMain
