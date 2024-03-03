import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";


const Cards = ({ item }) => {
 const {name, image, price, recipe, _id} = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const {users}=  useContext(AuthContext)
  // add to cart
  const handleAddtoCart = (item)=> {
    if(user && user?.email){
      const cartItem = {menuItemId: _id,name,quantity:1,image,price,email:user.email};
      // console.log(cartItem);
       fetch('http://localhost:6001/carts')
      .then(res=>res.json())
      .then((data) => {
       console.log(data);
      });
    
    }
  }

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  

  return (
    <div to={`/menu/${item._id}`} className="card shadow-xl relative mr-5 md:my-5">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFilled ? "text-red1" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img src={item.image} alt="Shoes" className="hover:scale-105 transition-all duration-300 md:h-72 rounded-full" />
        </figure>
      </Link>
      <div className="card-body">
       <Link to={`/menu/${item._id}`}><h2 className="card-title">{item.name}!</h2></Link>
        <p>Description of the item</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">Rs. </span> {item.price}
          </h5>
          <button className="btn bg-green text-white" onClick={()=> handleAddtoCart(item)}>Add to Cart </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
