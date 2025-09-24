
import React, { useState, useContext } from "react";
import { JobsContext } from "../context/JobsContext";

const PostJob = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { jobs, addJob } = useContext(JobsContext);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    if (!title || !company || !location || !description) {
      setMessage(" All fields are required");
      return;
    }

    const newJob = {
      id: Date.now(),
      title,
      company,
      location,
      type,
      salary: Number(salary) || 0,
      description,
      postedBy: user?.name || "Admin",
    };

    addJob(newJob);
    setMessage(" Job posted successfully!");
    setTitle("");
    setCompany("");
    setLocation("");
    setType("Full-time");
    setSalary("");
    setDescription("");
  };

  return (
    <div className="post-job-container">
      <h2>Post a New Job</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handlePost}>
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={e => setCompany(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
        />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
        </select>
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <button type="submit">Post Job</button>
      </form>

      <h3>All Jobs</h3>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            {job.title} at {job.company} (Posted by: {job.postedBy})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostJob;
