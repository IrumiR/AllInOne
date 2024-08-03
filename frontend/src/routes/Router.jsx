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
      <Route path="/products-single" element={<ProductsSinglePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />

    {/* 404 page */}
      <Route path='*' element={<NotFound />} />
     
    </Routes>
  );
};

export default Router;
