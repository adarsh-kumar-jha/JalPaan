import React, { useContext, useState } from 'react';
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import useCart from '../../hooks/useCart';
const CartPage = () => {
  
  const [cart,refetch] = useCart();
  const {user} =useContext(AuthContext);
  const [cartItems, setcartItems] = useState([]);

  // calculate price
  const calculatePrice = (item) =>
  {
    return item.price * item.quantity;
  }
  
// handle increase fn
const handleIncrease = (item) =>
{
  // console.log(item._id)
  fetch(`http://localhost:6001/carts/${item._id}`,
  {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({quantity: item.quantity +1})
  })
  .then( res => res.json())
  .then(data =>
  {
    const updatedCart = cartItems.map((cartItem)=>
    {
       if(cartItem.id === item.id)
       {
        return {
        ...cartItem,
          quantity: cartItem.quantity + 1
        }
      
       }
    });
    refetch();
    setcartItems(updateCart);
  });
  refetch();
};




  // handleDecease function

const handleDecrease = (item) =>
{
  // console.log(item._id);
 if (item.quantity > 1)
 {
  fetch(`http://localhost:6001/carts/${item._id}`,
  {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    },
    body: JSON.stringify({quantity: item.quantity - 1})
  })
  .then( res => res.json())
  .then(data =>
  {
    const updatedCart = cartItems.map((cartItem)=>
    {
       if(cartItem.id === item.id)
       {
        return {
        ...cartItem,
          quantity: cartItem.quantity - 1
        }
      
       }
    });
    refetch();
    setcartItems(updateCart);
  });
  refetch();
 }
 else{
  alert("Item can't be zero")
 }
  
};


// calculation of total price
const cartSubTotal = cart.reduce((total,item)=>
{
  return total + calculatePrice(item);
},0);

const orderTotal = cartSubTotal;




  // handledelete btn

  const handleDelete = (item) =>
  {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
       fetch(`http://localhost:6001/carts/${item._id}`,
       {
        method: "DELETE"
     }).then(res => res.json()).then(data =>
       {
        if(data.deletedCount > 0)
        {
          refetch()
          Swal.fire(
            {
              title: "Deleted!",
              text: "Your file has been deleted",
              icon: "success",
              backdrop: `
              rgba(0,0,0,0.4)
              url("/images/5ABA.gif")
              bottom
              no-repeat`,
            }
          )
        }
       })
      }
    });
  }

  return (
    <div className='section-container '>

 {/* banner */}

 <div className={`relative bg-white from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%`}>
  {/* Video Background */}
  <video src="/images/meal9.mp4" autoPlay loop muted className="absolute  w-auto content-center ml-50 mt-19 h-auto "></video> 
  
  {/* Content */}
  <div className="relative z-10 py-32 flex flex-col items-center justify-center gap-8">
    {/* Text */}
    <div className="px-4 space-y-7 text-center text-black">
      <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
        <span className='text-green'>Items</span> Added <span className="italic">To</span> <span className="text-green font-hindi">खाना खजाना</span><span> Cart</span>
      </h2>
    </div>
  </div>
</div>

{/* table */}
       <div>
       <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead className='bg-green text-white rounded-sm'>
      <tr>
       <th>#</th>
        <th>Food</th>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        cart.map((item,index) => (
          <tr key={index}>
       <td>{index + 1}</td>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={item.image}
                 alt="" 
                 />
              </div>
            </div>
           
          </div>
        </td>
        <td className='font-medium'>
          {item.name}
        </td>
        
        <td>
         <button className='btn btn-xs' onClick={() => handleDecrease(item)}>-</button>
          <input type="number" value={item.quantity} 
            onChange={ () => console.log(item.quantity)}
          className=' w-10 mx-2 text-center overflow-hidden appearance-none'/>
          <button className='btn btn-xs' onClick={() => handleIncrease(item)}>+</button>

          {/* {item.quantity} */}
        </td>
        <td>₹ {calculatePrice(item).toFixed(2)}</td>
        <th>
          <button className="btn btn-ghost text-red  btn-xs" onClick={() => handleDelete(item)}>
           <FaTrash/>
            </button>
        </th>
      </tr>
        ))
      }
    </tbody>
    
    
  </table>
</div>
       </div>



{/* customer details */}
<div className='my-12 flex flex-col md:flex-row justify-between items-start'>
  <div className='md:w-1/2 space-y-3'>
    <h3 className='font-medium'>Customer Details</h3>
    <p>Name: {user?.displayName || "None"}</p>
    <p>Email: {user?.email}</p>
    <p>User_id: {user?.uid}</p>
  </div>
  <div className='md:w-1/2 space-y-3'>
  <h3 className='font-medium'>Shopping Details</h3>
  <p>Total Items: {cart.length}</p>
  <p>Total Price: ₹ {orderTotal.toFixed(2)}</p>
  <button className='btn bg-green text-white'>Procceed Checkout</button>




  </div>
</div>

    </div>
  )
}

export default CartPage