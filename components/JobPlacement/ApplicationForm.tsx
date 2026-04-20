"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

interface ApplicationFormProps {
  jobTitle?: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, we would use FormData to send fields and the file to an API
    console.log("Submitting:", { ...formData, fileName: file?.name });
    
    toast.success("Application submitted successfully!");
    // Reset form
    setFormData({ name: "", email: "", phone: "", linkedin: "", message: "" });
    setFile(null);
  };

  return (
    <section className="py-16 md:py-24 bg-alabaster">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-solid-8 p-8 md:p-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-black mb-4">
              Apply for {jobTitle || "our open positions"}
            </h2>
            <p className="text-gray-600">
              Please fill out the form below and upload your latest CV/Resume. 
              Our team will review your application and get back to you soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (234) 567-890"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/johndoe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Resume Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload CV/Resume * (PDF, DOCX)
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  required
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${file ? 'border-green bg-green/5' : 'border-gray-300 group-hover:border-purple bg-gray-50'}`}>
                  {file ? (
                    <div className="text-green font-medium">
                      Selected: {file.name}
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <p className="mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs">PDF, DOCX up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Letter / Additional Message
              </label>
              <textarea
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us why you are a great fit for GFI..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none transition-all resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-purple text-white font-bold rounded-lg hover:bg-black shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
