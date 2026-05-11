"use client";

import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Loader2 } from "lucide-react";

const JobList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch only active jobs for Grace For Impact
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/jobs?company=Grace For Impact&status=Active`
        );
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 text-purple animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold">
            {error}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium">
            No open positions at the moment. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <JobCard key={job._id} {...job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobList;
