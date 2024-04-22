import { MantineProvider, Text } from '@mantine/core';
import Register from './components/Register/Register';
import '@mantine/core/styles.css';
import Login from './components/Login/Login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element:<Register></Register>,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}