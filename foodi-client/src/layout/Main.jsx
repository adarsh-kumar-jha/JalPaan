import React from 'react';
import { Outlet } from "react-router-dom";
import "../App.css";
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";
const Main = () => {
  return (
    <div>
    <Navbar/>
    <div className='min-h-screen'>
    <Outlet/>
    </div>
    <Footer/>
    
    </div>

  )
}

export default Main
