import { motion } from 'framer-motion';
import React from 'react';

// Define the fadeIn function
const fadeIn = (direction, delay) => {
    return {
        hidden: {
            y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
            x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
        },
        show: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: 'tween',
                duration: 1.2,
                delay: delay,
                ease: [0.25, 0.25, 0.25, 0.75],
            }
        }
    };
};

const categoryItems = [
    {id: 1, title: "Main Dish", despriction: "(20+ dishes)", image: "/images/home/category/img1.jpg"},
    {id: 2, title: "Grocery", despriction: "(Packet Item)", image: "/images/home/category/img2.png"},
    {id: 3, title: "Icre-Cream", despriction: "(Every-Type)", image: "/images/home/category/img3.png"},
    {id: 4, title: "Browse All", despriction: "(50+ Items)", image: "/images/home/category/img4.png"}
]

const Catagories = () => {
    return (
        <motion.div    
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{once: false, amount: 0.5}}
            className={`max-w-screen-2xl container mx-auto xl:px-24 px-4 py-16 `}>
            <div className='text-center'>
                <p className='text-red uppercase tracking-wide font-semibold text-lg'>Customer Favorites</p>
                <h2 className='title font-patrick'>Popular Categories</h2>
            </div>

            {/* category cards */}
            <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12 '>
                {categoryItems.map((item, i) => (
                    <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 transition-all duration-300 z-10'>
                        <div className='w-full mx-auto flex items-center justify-center'><img src={item.image} alt="" className='bg-new1 p-5 rounded-full w-28 h-28' /></div>
                        <div className='mt-5 space-y-1'>
                            <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
                            <p className='text-secondary text-sm'>{item.despriction}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}

export default Catagories;
