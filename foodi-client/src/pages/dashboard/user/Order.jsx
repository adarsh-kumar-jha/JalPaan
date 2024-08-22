import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useTheme } from "../../../hooks/ThemeContext";

const Order = () => {
  const token = localStorage.getItem("access_token");
  const { isDarkMode } = useTheme();
  const { refetch, data: orders = [], isLoading, isError, error } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:6001/payments/payments`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-20">
      {/* banner */}
      <div className="bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          <div className="text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track Your All<span className="text-green"> Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Coming Soon Overlay */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
  <div className="text-center">
    <h1 className="text-white font-patrick text-4xl md:text-6xl sm:text-6xl lg:text-6xl mb-4">
      Coming Soon...
    </h1>
    
    <button className="py-1 mt-5  ">
  <Link
    to="/"
    className={`inline-block -mt-1 px-4 py-2 text-lg font-medium   rounded-lg transition-colors duration-300 ease-in-out ${isDarkMode ? "bg-green text-white" : "text-white bg-green"}`}
  >
    Back to Home
  </Link>
  <Link
    to="/dashboard"
    className={`inline-block -mt-1 px-4 py-2 ml-4 text-lg font-medium text-black bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-300 ease-in-out ${isDarkMode ? "bg-green text-white" : "text-white bg-green"}`}
  >
    Back to Dashboard
  </Link>
</button>

  </div>
</div>

      {/* table content */}
      <div className="mt-8 relative">


  <div className="overflow-x-auto relative z-0">
    <table className="table text-center">
      {/* head */}
      <thead className="bg-green text-white rounded-sm">
        <tr>
          <th>#</th>
          <th>Order Date</th>
          <th>Transition ID</th>
          <th>Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{formatDate(item.createdAt)}</td>
            <td className="font-medium">{item.transitionId}</td>
            <td>${item.price}</td>
            <td>{item.status}</td>
            <td>
              <button className="btn btn-sm border-none text-orange-400 bg-transparent">
                Contact
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
<hr />

    </div>
  );
};

export default Order;
