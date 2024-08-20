import React from "react";
import { Routes, Route ,useLocation} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import Admin from "./pages/Admin";
import DeleteProduct from "./pages/DeleteProduct";
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/createProduct";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import AdminNavbar from "./components/AdminNavbar";

function App() {
  
  const location=useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  return (
    <>
    {isAdminRoute? <AdminNavbar/> : <Navbar/>}
    <Routes>
      <Route path="/"
          element={
            <Home />
          } />
      <Route path="/cart"
          element={
            <Cart/>
          } />

          <Route path="/success"
          element={
            <Success/>
          } />
          <Route path="/cancel"
          element={
            <Cancel/>
          } />
          <Route path="/shop"
          element={
            <Shop/>
          } />
          <Route path="/register"
          element={
            <Register/>
          } />
          <Route path="/login"
          element={
            <Login/>
          } />
      <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes/>
            </ProtectedRoute>
          }
        />
    </Routes>
    {isAdminRoute? "" : <Footer/>}
      
    </>
  )
}
const AdminRoutes = () => { 
  return (
    <Routes>
       <Route path="/" element={<Admin/>} />
      <Route path="/product/create" element={<CreateProduct/>} />
      <Route path="/product/edit/:id" element={<EditProduct/>} />
      <Route path="/product/delete/:id" element={<DeleteProduct/>} /> 
    </Routes>
  );
};

export default App
