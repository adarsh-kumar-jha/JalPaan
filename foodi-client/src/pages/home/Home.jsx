import React from 'react';
import Banner from '../../components/Banner';
import Catagories from './Catagories';
import SpecialDishes from './SpecialDishes';
import Testimonals from './Testimonals';
const Home = () => {
  return (
    <div>
     <Banner />
     <Catagories />
     <SpecialDishes />
     <Testimonals />
    </div>
  )
}

export default Home
