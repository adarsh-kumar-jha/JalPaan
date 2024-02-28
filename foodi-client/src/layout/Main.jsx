import React from 'react';
import { Outlet } from "react-router-dom";
import "../App.css";
import Footer from '../components/Footer';
import Navbar from "../components/Navbar";

const Main = () => {
  
  return (
    
      <div className='bg-primaryBG'>
      <Navbar />
      <Outlet />
      <Footer />
        </div>

    

  )
}

export default Main
