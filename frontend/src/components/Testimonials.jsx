import React from 'react';
import { Star } from 'lucide-react';
// Swiper Components aur Styles import karein
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  const reviews = [
    {
      name: "Jane Salinger",
      date: "Apr 11, 2024",
      rating: 5,
      text: "Highly recommend this app. Found my meds quickly and the delivery was incredibly fast!",
      image: "https://i.pravatar.cc/150?u=jane"
    },
    {
      name: "Readd Baron",
      date: "Jun 21, 2024",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, elit consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.",
      image: "https://i.pravatar.cc/150?u=readd"
    },
    {
      name: "Jolie Young",
      date: "Jul 21, 2024",
      rating: 5,
      text: "Verified economy security solutions and security verified stores. Very helpful and reliable service.",
      image: "https://i.pravatar.cc/150?u=jolie"
    }
  ];

  return (
    <section className="py-20 px-6 bg-[#fcfdfe]">
      <div className="max-w-6xl mx-auto text-center">
        
        {/* Section Header */}
        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-12 italic">
          Hear From Our Happy Users
        </h2>

        {/* --- Swiper Slider Container --- */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1} // Default for mobile
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            // Jab screen 768px se badi ho (Tablet/Desktop)
            768: {
              slidesPerView: 2,
            },
            // Jab screen 1024px se badi ho (Large Desktop)
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-14" // Pagination dots ke liye thodi space
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="h-full">
              <div 
                className="bg-[#EBF5FF]/60 backdrop-blur-sm p-8 rounded-[32px] border border-blue-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] transition-all text-left flex flex-col h-[280px] justify-between"
              >
                {/* User Info */}
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                  />
                  <div>
                    <h4 className="font-black text-slate-900 text-sm leading-tight">{review.name}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{review.date}</p>
                  </div>
                </div>

                {/* Rating Stars */}
                <div className="flex text-yellow-400 gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 text-[13px] leading-relaxed font-medium italic">
                  "{review.text}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- Custom CSS for Swiper Dots (Optional) --- */}
      <style jsx="true">{`
        .swiper-pagination-bullet-active {
          background: #1a3a5f !important;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;