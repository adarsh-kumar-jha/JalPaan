import React from "react";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { useTheme } from "../../../hooks/ThemeContext";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { isDarkMode } = useTheme(); // Get dark mode status from the custom hook
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${user.name} is an Admin Now!`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };

  const handleDeleteUser = (user) => {
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
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          console.log(res);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1000, // 1 second (1000 milliseconds)
            showConfirmButton: false, // Hide the confirm button
          });
          refetch();
        });
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 10, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    tap: { scale: 0.8 },
  };

  const textVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div>
      <div className="flex justify-between mx-4 my-4">
        <h2 className={`text-2xl ${isDarkMode ? "text-green" : "text-black"}`}>All Users</h2>
        <h2 className={`text-2xl ${isDarkMode ? "text-green" : "text-black"}`}>Total Users: {users.length}</h2>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <motion.table
          className={`table table-zebra md:w-[870px] ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* head */}
          <motion.thead
            className={`${isDarkMode ? "bg-green text-white" : "bg-green text-white"}`}
            variants={headerVariants}
          >
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </motion.thead>
          <motion.tbody
            className="font-patrick text-lg"
          >
            {users.map((user, index) => (
              <motion.tr
                key={user._id}
                variants={rowVariants}
                className={`${index % 2 === 0 ? (isDarkMode ? 'bg-gray-500 ' : 'bg-gray-200') : (isDarkMode ? 'bg-green text-black' : 'bg-white')}`}
              >
                <motion.th variants={textVariants}>{index + 1}</motion.th>
                <motion.td variants={textVariants}>{user.name}</motion.td>
                <motion.td variants={textVariants}>{user.email}</motion.td>
                <motion.td variants={textVariants}>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <motion.button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-xs btn-circle bg-indigo-500"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <FaUsers className="text-white" />
                    </motion.button>
                  )}
                </motion.td>
                <motion.td variants={textVariants}>
                  <motion.button
                    onClick={() => handleDeleteUser(user)}
                    className="btn bg-orange-500 btn-xs"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FaTrashAlt className="text-white" />
                  </motion.button>
                </motion.td>
              </motion.tr>
            ))}
          </motion.tbody>
        </motion.table>
      </div>
    </div>
  );
};

export default Users;
