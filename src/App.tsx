import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainLayout from "./layouts/MainLayout";

import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import CaseStudies from "./pages/CaseStudies";
import NotFound from "./pages/NotFound";
import Shop from "./pages/Shop";
import Checkout from "./pages/Checkout";
import ContactUs from "./pages/ContactUs";
import BrandDetail from "./pages/BrandDetail";
import OrderSuccess from "./pages/OrderSuccess";
import ProductPage from "./pages/Products";
import Brand from "./pages/Brand";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import RefundPolicy from "./pages/RefundPolicy";
import Gallery from "./pages/Gallery";

import HVACApplicationsDetailPage from "./pages/HVACApplicationsDetailPage";
// Contexts
import { UserAuthProvider } from "./context/AuthContext";
import { AuthProvider } from "./context/AdminAuthContext";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogs from "./pages/admin/AdminBlogs";
import AdminServices from "./pages/admin/AdminServices";
import AdminBrands from "./pages/admin/AdminBrands";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminBookings from "./pages/admin/AdminBookings";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ToastContainer position="top-right" autoClose={3000} />

      <BrowserRouter>
        <Routes>
          <Route element={
            <UserAuthProvider>
              <MainLayout />
            </UserAuthProvider>
          }>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/brand/:slug" element={<BrandDetail />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/brands" element={<Brand />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/service/:slug" element={<ServiceDetailPage />} />
            <Route path="/hvac-applications" element={<HVACApplicationsDetailPage />} />
            <Route path="/hvac-applications/:slug" element={<HVACApplicationsDetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
          </Route>

          {/* Admin routes wrapped with AuthProvider */}
          <Route path="/admin/login" element={
            <AuthProvider>
              <AdminLogin />
            </AuthProvider>
          } />

          <Route path="/admin" element={
            <AuthProvider>
              <AdminLayout />
            </AuthProvider>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="brands" element={<AdminBrands />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
