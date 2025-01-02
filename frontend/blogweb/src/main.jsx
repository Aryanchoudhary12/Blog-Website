import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import Signup from './pages/signup'
import Signin from './pages/signin';
import Profile from './pages/profile.jsx';
import New from './pages/new.jsx';
import { MyContextProvider } from './pages/context.jsx';
import Blogs from './pages/blogs.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element:<App/>,
  },
  {
    path: "/blogs",
    element:<Blogs/>,
  },
  {
    path: "/signup",
    element:<Signup/>,
  },
  {
    path: "/signin",
    element:<Signin/>,
  },
  {
    path: "/profile",
    element:<Profile/>,
  }, {
    path: "/new",
    element:<New/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <MyContextProvider>
      <RouterProvider router={router}/>
    </MyContextProvider>
);
