 import React, { useState, useContext } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { JobsContext } from "../context/JobsContext";

export default function JobDetails() {
  const { id } = useParams();
  const { jobs } = useContext(JobsContext);


  const user = JSON.parse(localStorage.getItem("user"));

  
  if (!user) return <Navigate to="/login" replace />;

  
  const job = jobs?.find(j => Number(j.id) === Number(id));
  if (!job) return <p>Job not found!</p>;

  const [applied, setApplied] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", resume: null });

  
  const handleApply = () => {
    setShowForm(true);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setApplied(true);
    setShowForm(false);

    
    const applications = JSON.parse(localStorage.getItem("applications")) || {};
    if (!applications[user.email]) applications[user.email] = [];
    applications[user.email].push(job);
    localStorage.setItem("applications", JSON.stringify(applications));

    alert(`Applied for ${job.title} at ${job.company}`);
  };

  const handleChange = (e) => {
    if (e.target.type === "file") setFormData({ ...formData, resume: e.target.files[0] });
    else setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="job-details-container">
      <Link to="/"><button>← Back to Jobs</button></Link>

      <h1>{job.title}</h1>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Type:</strong> {job.type}</p>
      <p><strong>Salary:</strong> ₹{job.salary}</p>
      <p>{job.description}</p>

      <button onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply Now"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <h3>Application Form</h3>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleChange} required />
          <button type="submit">Submit Application</button>
        </form>
      )}
    </div>
  );
}

  

