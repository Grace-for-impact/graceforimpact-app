"use client";

import React from "react";

const JobHero = () => {
  return (
    <div className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24 bg-purple overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
            Job Placement Program
          </h1>
          <p className="text-lg text-gray-100 md:text-xl lg:text-2xl leading-relaxed">
            Grace for Impact is committed to empowering individuals by connecting 
            them with meaningful career opportunities in health, education, and 
            sustainable development. Start your journey with us today.
          </p>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default JobHero;
