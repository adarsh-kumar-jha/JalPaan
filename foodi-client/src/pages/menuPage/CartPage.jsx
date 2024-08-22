import axios from "axios";
import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import useCart from "../../hooks/useCart";
import { useTheme } from "../../hooks/ThemeContext";
import paymentimage from "/images/payment.jpg";
const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState([]);
  const { isDarkMode } = useTheme();

  const calculateTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(
          `http://localhost:6001/carts/${item._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: item.quantity - 1 }),
          }
        );

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const cartSubtotal = Array.isArray(cart)
    ? cart.reduce((total, item) => {
        return total + calculateTotalPrice(item);
      }, 0)
    : 0;

  const orderTotal = cartSubtotal;

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:6001/carts/${item._id}`)
          .then((response) => {
            if (response) {
              refetch();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Deleted",
                showConfirmButton: false,
                backdrop: `
    rgba(0,0,0,0.4)
    url("/images/5ABA1.gif")
    bottom
    no-repeat`,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };
  const handleProceedToCheckout = () => {
    Swal.fire({
      text: "Share your payment details with us!",
      imageUrl: paymentimage,
      imageAlt: "Checkout Image",
      showCancelButton: true,
      confirmButtonText: "Share",
      cancelButtonText: "Cancel",
      customClass: {
        popup: `${
          isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
        } p-3 rounded-lg shadow-lg max-w-xs`,
        title: `${isDarkMode ? "text-white" : "text-black"}`,
        content: `${isDarkMode ? "text-gray-300" : "text-gray-800"}`,
        confirmButton: `bg-green hover:bg-green-700 text-white px-4 py-2 rounded-md w-full md:w-auto`,
        cancelButton: `bg-gray-800 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full md:w-auto`,
      },
      width: "280px",
      padding: "0.75rem",
    }).then((result) => {
      if (result.isConfirmed) {
        const phoneNumber = "7377237009";
        const message = encodeURIComponent("Check out my cart details!");
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        window.open(whatsappUrl, "_blank");
      }
    });
  };

  return (
    <div
      className={`section-container px-4 py-8 sm:px-6 lg:px-8 ${
        isDarkMode ? "bg-black text-white mt-20" : "bg-white text-black"
      }`}
    >
      {/* Title and Video in Flexbox */}
      <div
        className={`flex items-center justify-center gap-4  ${
          isDarkMode ? "sm:mb-10 md:mb-10 lg:mb-10" : "sm:mb-0 md:mb-0 lg:mb-0"
        }`}
      >
        {/* Video Section */}
        {!isDarkMode && (
          <video
            src="/images/meal9.mp4"
            autoPlay
            loop
            muted
            className="w-24 h-24 md:w-80 md:h-80 lg:w-50 lg:h-50  "
          ></video>
        )}

        {/* Text Section */}
        <div className="text-center">
          <h2 className="text-xs sm:text-2xl md:text-5xl font-bold leading-tight mt-5 sm:mt-20 lg:mt-20 md:mt-20 pr-10">
            <span className="text-green">Items</span> Added{" "}
            <span className="italic">To</span>{" "}
            <span className="text-green font-hindi">खाना खजाना</span>
            <span> Cart</span>
          </h2>
        </div>
      </div>

      {/* Cart table */}
      {Array.isArray(cart) && cart.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="table w-full min-w-full">
              {/* head */}
              <thead className="bg-green text-white rounded-sm">
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
                {cart.map((item, index) => (
                  <tr
                    key={index}
                    className={
                      isDarkMode
                        ? "bg-black text-white  "
                        : "bg-white text-black"
                    }
                  >
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item.image}
                            alt="Food"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td className="flex items-center">
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={() => console.log(item.quantity)}
                        className={`w-10 mx-2 text-center ${
                          isDarkMode
                            ? "bg-gray-900 text-white"
                            : "bg-white text-black"
                        }`}
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>₹ {calculateTotalPrice(item).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-sm border-none text-red bg-transparent"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr className="my-6" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center my-8 gap-6">
            <div className="md:w-1/2 space-y-2">
              <h3 className="text-lg font-semibold">Customer Details</h3>
              <p>Name: {user?.displayName || "None"}</p>
              <p>Email: {user?.email}</p>
              <p>
                User_id: <span className="text-sm">{user?.uid}</span>
              </p>
            </div>
            <div className="md:w-1/2 space-y-2">
              <h3 className="text-lg font-semibold">Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>
                Total Price:{" "}
                <span id="total-price">₹ {orderTotal.toFixed(2)}</span>
              </p>
              <button
                className="btn btn-md bg-green text-white px-6 py-2 mt-2"
                onClick={handleProceedToCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <p>Cart is empty. Please add products.</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
