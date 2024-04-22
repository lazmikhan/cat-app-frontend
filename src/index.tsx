import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MantineProvider } from '@mantine/core';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Homepage from './components/HomePage/Homepage';
import { Notifications } from '@mantine/notifications';
import Header from './commons/Header/Header';
import { DoubleNavbar } from './commons/DoubleNavbar/DoubleNavbar';
import Head from './commons/Head/Head';
import Adopt from './components/Adopt/Adopt';
import Missing from './components/Missing/Missing';
import AddPost from './components/AddPost/AddPost';
import Shop from './components/Shop/Shop';
import AdoptionDetails from './commons/AdoptionDetails/AdoptionDetails';
import { ActiveProvider } from './utils/withHeader/ActiveContext';
import MissingDetails from './commons/MissingDetails/MissingDetails';
import Profile from './components/Profile/Profile';
import Donation from './components/Donation/Donation';
import Doctor from './components/Doctor/Doctor';
import AddMissingPost from './components/AddPost/AddMissingPost';
import Manage from './components/Manage/Manage';
import { ModalsProvider } from '@mantine/modals';
import Admin from './components/Admin/Admin';
import AdminLayout from './components/Admin/AdminLayout';
import Dashboard from './components/Admin/Dashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Header>
      <Homepage></Homepage>
    </Header>
,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/admin",
    element:
    

<Admin></Admin>

   
,
    errorElement:<div><h1>404 not found</h1></div>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "settings",
        element: <div>Hello etting</div>,
      },]
  },
  {
    path: "/register",
    element:<Register></Register>,
  },
  {
    path: "/login",
    element:<Login></Login>,
  },
  {
    path: "/adopt",
    element:
      <Header>
      <Adopt></Adopt>
    </Header>
,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/adopt/:id",
    element:
      <Header>
      <AdoptionDetails></AdoptionDetails>
    </Header>
  ,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/missing/:id",
    element:
      <Header>
      <MissingDetails></MissingDetails>
    </Header>
  ,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/missing",
    element:
      <Header>
      <Missing></Missing>
    </Header>
    ,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/addMissing",
    element:
      <Header>
      <AddMissingPost></AddMissingPost>
    </Header>
    ,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/manage",
    element:
      <Header>
      <Manage></Manage>
    </Header>
    ,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/doctor",
    element:
      <Header>
      <Doctor></Doctor>
    </Header>
    ,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/donate",
    element:
      <Header>
      <Donation></Donation>
    </Header>
    ,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/profile",
    element:
      <Header>
      <Profile></Profile>
    </Header>
    ,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/add-post",
    element:
      <Header>
      <AddPost></AddPost>
    </Header>
,
    errorElement:<div><h1>404 not found</h1></div>
  },
  {
    path: "/shop",
    element:
      <Header>
      <Shop></Shop>
    </Header>
 ,
    errorElement:<div><h1>404 not found</h1></div>
  },
],


);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <React.StrictMode>
      
      <MantineProvider >
      <Notifications />
      <ModalsProvider>
<ActiveProvider>
      <RouterProvider router={router} />
      </ActiveProvider>
      </ModalsProvider>
    </MantineProvider>
 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
