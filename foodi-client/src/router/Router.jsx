import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/menuPage/Menu";
import Signup from "../components/Signup";
import New from "../components/New";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import CartPage from "../pages/menuPage/CartPage";
import Login from "../components/Login";
import Order from "../pages/dashboard/user/Order";
import UserProfile from "../pages/dashboard/user/UserProfile";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItems from "../pages/dashboard/admin/ManageItems";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/menuPage/Payment";
import ManageBookings from "../pages/dashboard/admin/ManageBookings";
import About from "../components/About";
import ProfileClass from "../components/ProfileClass";
import Ai from "../components/Ai";
import ForgotPass from "../components/ForgotPass";

// import Order from "../pages/Order";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/menu",
          element: <Menu/>
        },
        {
          path:"/about",
          element:<About/>
        },
        {
          path:"/profile",
          element:<ProfileClass/>
        },
        {
          path:"/new",
          element: <New/>
        },
        {
          path:"/ai",
          element: <Ai/>
        },
        {
          path: "/order",
          element:<PrivateRoute><Order/></PrivateRoute>
        },
        {
          path: "/update-profile",
          element: <UserProfile/>
        },
        {
          path: "/cart-page",
          element: <CartPage/>
        },
        {
          path: "/process-checkout",
          element: <Payment/>
        },
      
      ]
    },
    {
      path: "/signup",
      element: <Signup/>
    },
  
    {
      path: "/login",
      element: <Login/>
    },
    {
     path:"/forgot",
     element:<ForgotPass/>
    },
    
    {
      path: 'dashboard',
      element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
      children: [
        {
          path: '',
          element: <Dashboard/>
        },
       
        {
          path: 'users',
          element: <Users/>
        },
        {
          path: 'add-menu',
          element: <AddMenu/>
        },
        {
          path: 'manage-items',
          element: <ManageItems/>
        },
        {
          path: 'update-menu/:id',
          element: <UpdateMenu/>,
          loader: ({ params }) => fetch(`http://localhost:6001/menu/${params.id}`)
        },
        {
          path: 'bookings',
          element: <ManageBookings/>
        },
        {
          path: 'order',
          element: <Order />
        }
      ]
    }
  ]);

  export default router;