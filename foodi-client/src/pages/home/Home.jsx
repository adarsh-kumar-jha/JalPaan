import React from 'react';
import Banner from '../../components/Banner';
import Catagories from './Catagories';
import SpecialDishes from './SpecialDishes';
import Testimonals from './Testimonals';
import OurServices from './OurServices';
const Home = () => {
  return (
    <div>
     <Banner />
     <Catagories />
     <SpecialDishes />
     <Testimonals />
     <OurServices />
    </div>
  )
}

export default Home
