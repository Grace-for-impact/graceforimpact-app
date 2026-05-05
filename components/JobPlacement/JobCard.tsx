"use client";

import React from "react";
import { FaLocationArrow, FaClock } from "react-icons/fa";
import Link from "next/link";

interface JobCardProps {
  _id: string;
  title: string;
  location: string;
  type: string;
  category: string;
  description: string;
}

const JobCard: React.FC<JobCardProps> = ({
  _id,
  title,
  location,
  type,
  category,
  description,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-solid-13 hover:shadow-solid-7 transition-all duration-300 p-6 md:p-8 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="px-3 py-1 bg-purple/10 text-purple text-xs font-semibold rounded-full uppercase tracking-wider">
          {category}
        </span>
        <div className="flex items-center text-gray-500 text-sm italic">
          <FaClock className="mr-1" />
          {type}
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-black mb-3 hover:text-purple transition-colors duration-200">
        {title}
      </h3>

      <div className="flex items-center text-gray-600 mb-4 text-sm font-medium">
        <FaLocationArrow className="mr-2 text-orange" />
        {location}
      </div>

      <p className="text-gray-600 line-clamp-3 mb-6 flex-grow">
        {description}
      </p>

      <Link 
        href={`/job-placement/apply?id=${_id}&job=${encodeURIComponent(title)}`}
        className="w-full py-3 bg-purple text-white font-bold rounded-lg hover:bg-black transition-colors duration-300 shadow-lg text-center"
      >
        Apply Now
      </Link>
    </div>
  );
};

export default JobCard;
