import React from "react";
// React Router components import karein
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Aapke saare components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import NearbyStores from "./components/NearbyStores";
import Features from "./components/Features";
import ExpertAdvice from "./components/ExpertAdvice";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import SearchPage from "./components/SearchPage/SearchPage"; //  Search Page component
import StoreDetailPage from "./components/StoreDetailPage/StoreDetail"; //  Store Detail Page component
import CheckoutPage from "./components/CheckoutPage/CheckoutPage"; //  Checkout Page component
import AuthForm from "./components/auth/AuthForm"; // Authentication Form component
import About from "./components/About"; // About Page component
import FeaturesPage from "./components/Features"; // Features Page component
import Contact from "./components/Contact"; // Contact Page component
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <Routes>
          {/* --- HOME ROUTE --- */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <HowItWorks />
                <NearbyStores />
                <Features />
                <ExpertAdvice />
                <Testimonials />
              </>
            }
          />

          {/* --- SEARCH RESULTS ROUTE --- */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:id" element={<StoreDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<AuthForm mode="login" />} />
          <Route path="/register" element={<AuthForm mode="register" />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
