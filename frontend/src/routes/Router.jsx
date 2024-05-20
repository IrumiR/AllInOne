import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import ServiceProviders from "../pages/ServiceProviders/ServiceProviders";
import ServiceProviderDetails from "../pages/ServiceProviders/ServiceProviderDetails";
import Products from "../pages/Products/Products";
import MyAccount from "../Dashboard/user-account/MyAccount";
import Dashboard from "../Dashboard/serviceprovider-account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

import { Routes, Route } from "react-router-dom";
import ProductDetails from "../pages/Products/ProductDetails";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/serviceproviders" element={<ServiceProviders />} />
      <Route
        path="/serviceproviders/:id"
        element={<ServiceProviderDetails />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["customer"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/serviceproviders/profile/me"
        element={
          <ProtectedRoute allowedRoles={["serviceprovider"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
