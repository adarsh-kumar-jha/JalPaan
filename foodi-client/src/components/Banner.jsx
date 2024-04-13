import React from "react";
import bannerImg from "/images/home/banner.jpg";
import backGround from "/images/home/canteenmenu.jpg";
// motion
import { motion } from 'framer-motion';
// variants
import { fadeIn } from '../variants';

const Banner = () => {

  
  
  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% `} style={{ backgroundImage: `url(${bannerImg})`, backgroundSize: 'cover', backgroundPosition: 'center', marginTop: '70px',borderRadius: '5%'  }}>
      <motion.div    
      variants={fadeIn("right",0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{once:false,amount:0.5}}
      
      
      className={`py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8  `} >
        
     

        {/* img */}
        <div className="md:w-1/2">
          
          <img src={backGround}  className="mt-4   " alt="" />
          
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-sm w-64">
              <img src="/images/home/b-food1.png" alt=""  className="rounded-2xl"/>
              <div className="space-y-1">
                <h5>Spring noodles</h5>
                <div className="rating rating-sm">
              
                <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                
                </div>
                <p className="text-red">Rs 100.00</p>
              </div>
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl md:flex items-center gap-3 shadow-sm w-64 hidden">
              <img src="/images/home/b-food1.png" alt=""  className="rounded-2xl"/>
              <div className="space-y-1">
                <h5 >Spring noodles</h5>
                <div className="rating rating-sm">
                <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                
                </div>
                <p className="text-red">Rs 100.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug text-white">
        Ashish Bhaiya ka <span className="italic">lazeez</span> <span className="text-green  font-hindi">खाना खजाना</span>
          </h2>
          <p className=" font-patrick text-[#4A4A4A] text-3xl text-white ">
            CaNtEEn mei nahi hai SEAT <span className="italic text-green text-5xl"> आरू दा  </span> ka khana hai HIT!!
          </p>
          <button className="bg-green font-semibold btn text-white px-8 py-3 rounded-full">
            Order Now
          </button>
        </div>
        

      </motion.div>
    </div>
  );
};

export default Banner;
