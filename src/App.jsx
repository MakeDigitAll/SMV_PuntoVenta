import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./views/login/Login.jsx";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import Home from "./views/home/Home.jsx";
import User from "./views/user/User.jsx";
import ProductList from "./views/products/ProductList.jsx";
import VerAlmacen from "./views/warehouses/Viewwarehouse.jsx"


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/settings/user",
          element: <User />,
        },
        {
          path: "/Products/ProductList",
          element: <ProductList/>
        },
        {
          path:"/home/VerAlmacen",
          element: <VerAlmacen />
        },
        {
          path:"/home/:id/VerAlmacen",
          element: <VerAlmacen />
        }

        

      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
