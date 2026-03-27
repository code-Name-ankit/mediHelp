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
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;