import { createBrowserRouter } from "react-router";
import RootLayOut from "../RootLayOut/RootLayOut";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Authentication/Registration";
import Login from "../Pages/Authentication/Login";
import DonetionRequest from "../Pages/DonetionRequest";
import FundingSource from "../Pages/FundingSource";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayOut></RootLayOut>,
    children:[
        {
            index:true,
            element:<Home></Home>,
        
        },
        {
            path:'/register',
            element:<Registration></Registration>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
          path:'/donation-request',
          element:<DonetionRequest></DonetionRequest>
        },
        {
          path:'/funding',
          element:<FundingSource></FundingSource>
        },

    ]
  },
]);
