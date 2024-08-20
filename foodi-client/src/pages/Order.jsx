// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import { Link } from "react-router-dom";

// const Order = () => {
//   const { user, loading } = useAuth();
//   const token = localStorage.getItem("access_token");

//   const { refetch, data: orders = [], isLoading, isError, error } = useQuery({
//     queryKey: ["orders", user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       const res = await fetch(`http://localhost:6001/payments?email=${user?.email}`,
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (!res.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return res.json();
//     },
//   });

//   // Log orders data to ensure it is being fetched correctly
//   console.log("Orders:", orders);

//   // Format date function
//   const formatDate = (createdAt) => {
//     const createdAtDate = new Date(createdAt);
//     return createdAtDate.toLocaleDateString(); // Adjust options as needed
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="relative max-w-screen-2xl container mx-auto xl:px-24 px-4">
//       {/* Background Blur Effect */}
//       <div className="absolute inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-10">
//         <h2 className="text-white text-4xl font-bold">Coming Soon</h2>
//       </div>

//       {/* Existing Content */}
//       <div className="relative z-20">
//         {/* banner */}
//         <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
//           <div className="py-28 flex flex-col items-center justify-center">
//             {/* content */}
//             <div className="text-center px-4 space-y-7">
//               <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
//                 Track Your All<span className="text-green"> Orders</span>
//               </h2>
//             </div>
//           </div>
//         </div>

//         {/* table content */}
//         <div>
//           <div className="overflow-x-auto">
//             <table className="table text-center">
//               {/* head */}
//               <thead className="bg-green text-white rounded-sm">
//                 <tr>
//                   <th>#</th>
//                   <th>Order Date</th>
//                   <th>Transition ID</th>
//                   <th>Price</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((item, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{formatDate(item.createdAt)}</td>
//                     <td className="font-medium">{item.transitionId}</td>
//                     <td>${item.price}</td>
//                     <td>{item.status}</td>
//                     <td>
//                       <button className="btn btn-sm border-none text-orange-400 bg-transparent">
//                         Contact
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//               {/* foot */}
//             </table>
//           </div>
//           <hr />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Order;
