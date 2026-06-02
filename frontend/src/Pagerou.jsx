import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Routing from "./Routing";
import Dashboard from "./Dashboard";
import Foodcat from "./Foodcat";
import Foodqty from "./Foodqty";
import  Menu  from "./Menu";
import Login from "./login/Login";
import ProtectedRoute from "./Protectedroute"; // we’ll make this next

const router=createBrowserRouter([
   {
       path:"/",
       element:<Login/>,
   },
//    {
//     path:"logout",
//     element:<LogoutButton/>,
// },
   {
    path:"dashboard",

    element: (
      <ProtectedRoute>
      <Routing/>  
            </ProtectedRoute>

    ),
  },
       
       {
         path:"menucard",
         element:<Dashboard/>,
       },
   ])
  const Pagerou=()=>{
    return <RouterProvider router={router}></RouterProvider>
  };
  export default Pagerou
  