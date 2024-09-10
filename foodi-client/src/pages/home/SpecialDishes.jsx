import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Cards from "../../components/Cards";

// Define the fadeIn function
const fadeIn = (direction, delay) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      }
    }
  };
};

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipes(specials);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Show three slides at a time on large screens
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <motion.div 
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      className="max-w-screen-2xl container mx-auto xl:px-24 px-4 my-20 relative"
    >
      <div className='text-left'>
        <p className='subtitle'>Customer Favorites</p>
        <h2 className='title'>Popular Categories</h2>
      </div>

      <div className="md:absolute right-3 top-8 mb-10 md:mr-24 flex justify-end">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className="btn p-2 rounded-full mr-2 bg-gray-200 dark:bg-gray-400"
        >
          <FaAngleLeft className="h-8 w-8 p-1" />
        </button>
        <button
          className="bg-green btn p-2 rounded-full ml-2"
          onClick={() => slider?.current?.slickNext()}
        >
          <FaAngleRight className="h-8 w-8 p-1" />
        </button>
      </div>

      <Slider ref={slider} {...settings} className="overflow-hidden mt-10">
        {recipes.map((item, i) => (
          <Cards item={item} key={i} />
        ))}
      </Slider>
    </motion.div>
  );
};

export default SpecialDishes;
