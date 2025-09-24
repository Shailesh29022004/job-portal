import React, { createContext, useState } from "react";

const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore",
    type: "Full-time",
    salary: 1200000,
    description: "Work on building user-friendly interfaces using React and modern web technologies."
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Flipkart",
    location: "Pune",
    type: "Internship",
    salary: 300000,
    description: "Create modern UI/UX designs for web & mobile applications with a focus on user experience."
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "Infosys",
    location: "Hyderabad",
    type: "Part-time",
    salary: 600000,
    description: "Build scalable backend APIs using Node.js, Express, and MongoDB."
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "TCS",
    location: "Delhi",
    type: "Full-time",
    salary: 800000,
    description: "Analyze business data, create reports, and provide actionable insights to improve operations."
  },
  {
    id: 5,
    title: "Digital Marketing Specialist",
    company: "Amazon",
    location: "Mumbai",
    type: "Full-time",
    salary: 900000,
    description: "Develop and manage marketing campaigns, optimize content, and improve brand visibility."
  },
  {
    id: 6,
    title: "Cloud Engineer",
    company: "Microsoft",
    location: "Chennai",
    type: "Full-time",
    salary: 1500000,
    description: "Manage cloud infrastructure, deployment pipelines, and ensure security and scalability."
  },
  {
    id: 7,
    title: "Software Engineer Intern",
    company: "Byju's",
    location: "Gurgaon",
    type: "Internship",
    salary: 250000,
    description: "Assist in software development, testing, and debugging tasks in an agile environment."
  },
  {
    id: 8,
    title: "HR Executive",
    company: "Accenture",
    location: "Noida",
    type: "Part-time",
    salary: 400000,
    description: "Support recruitment, employee engagement, and organizational development processes."
  },
  {
    id: 9,
    title: "Machine Learning Engineer",
    company: "IBM",
    location: "Bangalore",
    type: "Full-time",
    salary: 1800000,
    description: "Design and implement machine learning algorithms, models, and data pipelines."
  },
  {
    id: 10,
    title: "Content Writer",
    company: "Zomato",
    location: "Pune",
    type: "Part-time",
    salary: 350000,
    description: "Write SEO-optimized content for blogs, product descriptions, and marketing campaigns."
  }
];

export const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    return JSON.parse(localStorage.getItem("jobs")) || initialJobs;
  });

  const addJob = (newJob) => {
    const updatedJobs = [newJob, ...jobs];
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };

  const deleteJob = (id) => {
    setJobs((prev) => {
      const updated = prev.filter((job) => job.id !== id);
      localStorage.setItem("jobs", JSON.stringify(updated)); 
      return updated;
    });
  };

  const updateJob = (updatedJob) => {
    setJobs((prev) => {
      const updated = prev.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      );
      localStorage.setItem("jobs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <JobsContext.Provider value={{ jobs, setJobs, addJob, deleteJob, updateJob }}>
      {children}
    </JobsContext.Provider>
  );
}
