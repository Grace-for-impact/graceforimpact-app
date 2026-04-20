"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ApplicationForm from "@/components/JobPlacement/ApplicationForm";
import JobHero from "@/components/JobPlacement/JobHero";

const ApplicationPageContent = () => {
  const searchParams = useSearchParams();
  const jobTitle = searchParams.get("job") || "";

  return (
    <main>
      <div className="bg-purple pt-32 md:pt-40 pb-12 md:pb-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Become part of a global movement dedicated to health, education, and lasting impact.
          </p>
        </div>
      </div>
      <ApplicationForm jobTitle={jobTitle} />
    </main>
  );
};

const JobApplyPage = () => {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <ApplicationPageContent />
    </Suspense>
  );
};

export default JobApplyPage;
