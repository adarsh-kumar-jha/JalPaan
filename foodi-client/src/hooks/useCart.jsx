import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["carts", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await fetch(
        `http://localhost:6001/carts?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (user?.email) {
      refetch();
    }
  }, [user, refetch]);

  return [cart, refetch];
};

export default useCart;
