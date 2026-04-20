"use client";

import React from "react";
import JobCard from "./JobCard";

const mockJobs = [
  {
    id: 1,
    title: "Project Coordinator (Health)",
    location: "Lagos, Nigeria",
    type: "Full-time",
    category: "Health",
    description: "Coordinate healthcare outreach programs and ensure effective delivery of medical services to underserved communities.",
  },
  {
    id: 2,
    title: "Educational Field Officer",
    location: "Nairobi, Kenya",
    type: "Contract",
    category: "Education",
    description: "Support local schools with resource allocation and teacher training programs under the GFI excellence initiative.",
  },
  {
    id: 3,
    title: "Sustainable Agriculture Specialist",
    location: "Accra, Ghana",
    type: "Full-time",
    category: "Agriculture",
    description: "Lead community training on sustainable farming techniques and resource management to improve food security.",
  },
  {
    id: 4,
    title: "Administrative Assistant",
    location: "Dallas, Texas",
    type: "Part-time",
    category: "Admin",
    description: "Provide administrative support to the GFI headquarters team, managing communications and documentation.",
  },
];

const JobList = () => {
  return (
    <section className="py-16 md:py-24 bg-alabaster">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-black md:text-4xl mb-4">
            Available Positions
          </h2>
          <p className="text-gray-600 font-medium">
            Join our mission to create a lasting impact. Browse through our current openings 
            and apply for the role that fits your passion and skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {mockJobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobList;
