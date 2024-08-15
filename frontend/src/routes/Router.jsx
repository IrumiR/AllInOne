import { Routes, Route } from "react-router-dom";


// page components
import HomePage from "@/pages/Home/HomePage";
import AboutPage from "@/pages/About/AboutPage";
import ContactPage from "@/pages/Contact/ContactPage";
import ServicesPage from "@/pages/Services/ServicesPage";
import NotFound from "@/pages/NotFound/NotFound";
import ServicesSinglePage from "@/pages/ServicesSingle/ServicesSinglePage";
import LoadingScreen from "@/pages/LoadingScreen/LoadingScreen";
import LoginPage from "@/pages/Login/LoginPage";
import ProductsPage from "@/pages/Products/ProductsPage";
import ProductsSinglePage from "@/pages/ProductsSingle/ProductsSinglePage";
import RegisterPage from "@/pages/Register/RegisterPage";
import ProfilePage from "@/pages/Profile/ProfilePage";
import CartPage from "@/pages/Cart/CartPage";
import OrderSuccess from "@/pages/OrderSuccess/OrderSuccess";

import DashboardPage from "@/pages/Dashboard/DashboardPage";
import ProfileSettings from "@/components/Dashboard/Profile/ProfileSettings";
import BusinessProfileSettings from "@/components/Dashboard/Profile/BusinessProfileSettings";

import CustomerOrders from "@/components/Dashboard/CustomerDashboard/CustomerOrders";
import CustomerOrderSingle from "@/components/Dashboard/CustomerDashboard/CustomerOrderSingle";

import ServicesProviderServiceAddEdit from "@/components/Dashboard/ServicesProviderDashboard/ServicesProviderServiceAddEdit";
import ServicesProviderServices from "@/components/Dashboard/ServicesProviderDashboard/ServicesProviderServices";

import ServicesProviderProducts from "@/components/Dashboard/ServicesProviderDashboard/ServicesProviderProducts";
import ServicesProviderProductsAddEdit from "@/components/Dashboard/ServicesProviderDashboard/ServicesProviderProductsAddEdit";
import ServicesProviderOrders from "@/components/Dashboard/ServicesProviderDashboard/ServicesProviderOrders";
import ServicesProviderBookings from "@/components/Dashboard/ServicesProviderDashboard/ServicesProviderBookings";

import SucessAlert from "@/components/PlaceholderComponents/SucessAlert";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services-list" element={<ServicesPage />} />
      <Route path="/services-single" element={<ServicesSinglePage />} />
      <Route path="/loading-screen" element={<LoadingScreen />} />
      <Route path="/alert" element={<SucessAlert />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products-single" element={<ProductsSinglePage />} />
      <Route path="/products/:id" element={<ProductsSinglePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/order-success" element={<OrderSuccess />} />

      <Route path="/dashboard/" element={<DashboardPage />} />
      <Route path="/profile/business-profile" element={<BusinessProfileSettings />} />


      <Route path="/dashboard/orders/" element={<ServicesProviderOrders />} />
      <Route path="/dashboard/orders/:id" element={<CustomerOrderSingle />} />
      <Route path="/dashboard/products/" element={<ServicesProviderProducts />} />
      <Route path="/dashboard/products/add/" element={<ServicesProviderProductsAddEdit />} />
      <Route path="/dashboard/products/:id" element={<ServicesProviderProductsAddEdit />} />
      <Route path="/dashboard/bookings/" element={<ServicesProviderBookings />} />
      
      <Route path="/dashboard/services/" element={<ServicesProviderServices />} />
      <Route path="/dashboard/services/add" element={<ServicesProviderServiceAddEdit />} />
      <Route path="/dashboard/services/:id" element={<ServicesProviderServiceAddEdit />} />


    {/* 404 page */}
      <Route path='*' element={<NotFound />} />
     
    </Routes>
  );
};

export default Router;
