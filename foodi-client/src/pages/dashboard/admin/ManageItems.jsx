import React, { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { useTheme } from "../../../hooks/ThemeContext";
import { FaRupeeSign } from "react-icons/fa";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = menu.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteItem = async (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await axiosSecure.delete(`/menu/${item._id}`);
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.name} has been deleted`,
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Unable to delete the item.",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handlePagination = (type) => {
    if (type === "prev") {
      setCurrentPage(currentPage - 1);
    } else if (type === "next") {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div
      className={`w-full md:w-[870px] mx-auto px-4 font-patrick ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <h2
        className={`text-2xl font-semibold my-4 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Manage All <span className="text-green">Menu Items!</span>
      </h2>
      <div className="overflow-x-auto">
        <table
          className={`table w-full ${isDarkMode ? "text-white" : "text-black"}`}
        >
          <thead>
            <tr
              className={`${
                isDarkMode ? "bg-black text-gray-300" : "bg-green text-black"
              }`}
            >
              <th>#</th>
              <th>Image</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr
                key={item._id}
                className={`${
                  isDarkMode
                    ? "bg-black hover:bg-gray-600"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <td>{index + 1}</td>
                <td>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td>{item.name}</td>
                <td className="flex ">
                  <FaRupeeSign />
                  <span className="-mt-1">{item.price} </span>
                </td>
                <td>
                  <Link to={`/dashboard/update-menu/${item._id}`}>
                    <button
                      className={`btn btn-ghost ${
                        isDarkMode
                          ? "bg-green text-white"
                          : "bg-green text-white"
                      }`}
                    >
                      <FaEdit />
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteItem(item)}
                    className={`btn btn-ghost ${
                      isDarkMode ? "bg-green text-white" : "bg-green text-white"
                    }`}
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : <FaTrashAlt />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePagination("prev")}
          className={`btn btn-outline ${
            isDarkMode ? "text-white bg-black" : "text-black border-gray-500"
          }`}
          disabled={currentPage === 1}
        >
          <FaArrowLeft /> Prev
        </button>
        <button
          onClick={() => handlePagination("next")}
          className={`btn btn-outline ${
            isDarkMode
              ? "text-white border-gray-500"
              : "text-black border-gray-500"
          }`}
          disabled={indexOfLastItem >= menu.length}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ManageItems;
