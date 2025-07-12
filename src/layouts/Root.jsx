import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

export const Root = () => {
    return (
        <>
            <Navbar />
            <main className="pt-[65px]">
                <Outlet></Outlet>
            </main>

            <Footer />
        </>
    )
}
