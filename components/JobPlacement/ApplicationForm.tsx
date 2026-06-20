"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  User,
  GraduationCap,
  Briefcase,
  FileText,
  Plus,
  Trash2,
  Loader2,
  Upload,
  X
} from "lucide-react";

interface ApplicationFormProps {
  jobTitle?: string;
  jobId?: string;
}

interface EducationEntry {
  school: string;
  startDate: string;
  endDate: string;
  qualification: string;
  grade: string;
}

interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ jobTitle, jobId }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      dob: "",
      lga: "",
    },
    education: [
      { school: "", startDate: "", endDate: "", qualification: "", grade: "" } as EducationEntry
    ],
    experience: [
      { company: "", role: "", startDate: "", endDate: "", description: "" } as ExperienceEntry
    ],
    coverLetter: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const handleEducationChange = (index: number, field: keyof EducationEntry, value: string) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, education: updated }));
  };

  const handleExperienceChange = (index: number, field: keyof ExperienceEntry, value: string) => {
    const updated = [...formData.experience];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, experience: updated }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { school: "", startDate: "", endDate: "", qualification: "", grade: "" }]
    }));
  };

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", startDate: "", endDate: "", description: "" }]
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeStep < 4) {
      setActiveStep(prev => prev + 1);
      window.scrollTo({ top: 300, behavior: "smooth" });
      return;
    }

    if (!file) {
      toast.error("Please upload your CV/Resume");
      return;
    }

    setLoading(true);
    try {
      // 1. Upload CV to Cloudinary directly from frontend
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", file);
      cloudinaryData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "gfi_uploads");
      cloudinaryData.append("folder", "gfi_applications");

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: cloudinaryData,
        }
      );

      if (!cloudinaryRes.ok) {
        throw new Error("Failed to upload CV to cloud storage. Please try again.");
      }

      const cloudinaryResult = await cloudinaryRes.json();
      const resumeUrl = cloudinaryResult.secure_url;

      // 2. Submit the application to the backend with the Cloudinary URL
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          jobId,
          resumeUrl, // Send the URL returned from Cloudinary
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit application");
      }

      toast.success("Application submitted successfully!");
      setTimeout(() => {
        window.location.href = "/job-placement";
      }, 2000);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { id: 1, title: "Personal", icon: User },
    { id: 2, title: "Education", icon: GraduationCap },
    { id: 3, title: "Experience", icon: Briefcase },
    { id: 4, title: "Submit", icon: FileText },
  ];

  return (
    <section className="py-16 md:py-24 bg-alabaster">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-solid-8 overflow-hidden">
          {/* Progress Header */}
          <div className="bg-purple p-6 text-white">
            <div className="flex justify-between items-center max-w-md mx-auto">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-all ${activeStep >= step.id ? 'bg-white text-purple' : 'bg-white/20 text-white/50 border border-white/20'}`}>
                    <step.icon size={16} />
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${activeStep >= step.id ? 'text-white' : 'text-white/40'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-black mb-2">
                Apply for {jobTitle || "Vacancy"}
              </h2>
              <p className="text-gray-500 text-sm">Step {activeStep} of 4: {steps[activeStep - 1].title}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {activeStep === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.personalInfo.fullName}
                        onChange={handlePersonalChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple focus:ring-4 focus:ring-purple/5 outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.personalInfo.email}
                        onChange={handlePersonalChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple focus:ring-4 focus:ring-purple/5 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        required
                        value={formData.personalInfo.dob}
                        onChange={handlePersonalChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple focus:ring-4 focus:ring-purple/5 outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">LGA</label>
                      <input
                        type="text"
                        name="lga"
                        required
                        value={formData.personalInfo.lga}
                        onChange={handlePersonalChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple focus:ring-4 focus:ring-purple/5 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.personalInfo.phone}
                        onChange={handlePersonalChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple focus:ring-4 focus:ring-purple/5 outline-none transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Residential Address</label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.personalInfo.address}
                        onChange={handlePersonalChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple focus:ring-4 focus:ring-purple/5 outline-none transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-black text-purple uppercase tracking-[0.2em]">Institution #{index + 1}</span>
                        {formData.education.length > 1 && (
                          <button type="button" onClick={() => removeEducation(index)} className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <input
                          placeholder="Name of Institution"
                          required
                          value={edu.school}
                          onChange={(e) => handleEducationChange(index, "school", e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="date"
                            required
                            value={edu.startDate}
                            onChange={(e) => handleEducationChange(index, "startDate", e.target.value)}
                            className="px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium"
                          />
                          <input
                            type="date"
                            required
                            value={edu.endDate}
                            onChange={(e) => handleEducationChange(index, "endDate", e.target.value)}
                            className="px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            placeholder="Qualification (e.g. B.Sc)"
                            required
                            value={edu.qualification}
                            onChange={(e) => handleEducationChange(index, "qualification", e.target.value)}
                            className="px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium"
                          />
                          <input
                            placeholder="Grade (e.g. 2:1)"
                            required
                            value={edu.grade}
                            onChange={(e) => handleEducationChange(index, "grade", e.target.value)}
                            className="px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEducation}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-purple hover:text-purple transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add More Education
                  </button>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 relative group">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-black text-orange uppercase tracking-[0.2em]">Work Experience #{index + 1}</span>
                        {formData.experience.length > 1 && (
                          <button type="button" onClick={() => removeExperience(index)} className="text-red-400 hover:text-red-600 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            placeholder="Company Name"
                            required
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                            className="px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium"
                          />
                          <input
                            placeholder="Job Title"
                            required
                            value={exp.role}
                            onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                            className="px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="date"
                            required
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                            className="px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium"
                          />
                          <input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                            className="px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium"
                            placeholder="End Date (Leave blank if current)"
                          />
                        </div>
                        <textarea
                          placeholder="Description of duties and accomplishments..."
                          required
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 rounded-xl border border-white focus:border-purple outline-none shadow-sm font-medium resize-none"
                        />
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addExperience}
                    className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-xs uppercase tracking-widest hover:border-orange hover:text-orange transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={16} /> Add More Experience
                  </button>
                </div>
              )}

              {activeStep === 4 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 text-center">Cover Letter / Personal Statement</label>
                    <textarea
                      required
                      value={formData.coverLetter}
                      onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                      rows={6}
                      placeholder="Why do you want to join Grace For Impact?"
                      className="w-full px-6 py-4 rounded-2xl border border-gray-100 bg-gray-50 focus:bg-white focus:border-purple focus:ring-4 focus:ring-purple/5 outline-none transition-all font-medium resize-none shadow-inner"
                    />
                  </div>

                  <div className="p-10 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4 hover:border-purple transition-all group bg-gray-50/50 relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="h-16 w-16 bg-purple/10 rounded-2xl flex items-center justify-center text-purple group-hover:scale-110 transition-transform">
                      <Upload size={32} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-black">
                        {file ? file.name : "Upload your CV/Resume"}
                      </p>
                      <p className="text-sm text-gray-400 mt-1 font-medium">PDF or Word document (Max 5MB)</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="px-8 py-3 bg-white border border-gray-200 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-all shadow-sm">
                        {file ? "Change File" : "Select File"}
                      </div>
                      {file && (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setFile(null); }}
                          className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center pt-8 border-t border-gray-100 mt-12">
                <button
                  type="button"
                  onClick={() => activeStep > 1 && setActiveStep(prev => prev - 1)}
                  className={`px-8 py-4 text-gray-400 font-bold text-xs uppercase tracking-widest transition-all ${activeStep === 1 ? 'opacity-0 pointer-events-none' : 'hover:text-black'}`}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-12 py-4 bg-purple text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-purple/20 flex items-center gap-3"
                >
                  {loading ? <Loader2 size={20} className="animate-spin" /> : (activeStep === 4 ? <Upload size={20} /> : null)}
                  {activeStep < 4 ? "Continue" : (loading ? "Submitting..." : "Submit Application")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
