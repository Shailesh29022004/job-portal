import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import { JobsContext } from "../context/JobsContext";
import HeroSection from "./HeroSection";
import JobCard from "../components/JobCard";

export default function Home() {
  const { jobs, deleteJob } = useContext(JobsContext);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const jobsRef = useRef(null);

  const locationHook = useLocation();
  const queryParams = new URLSearchParams(locationHook.search);
  const searchQuery = queryParams.get("search")?.toLowerCase() || "";
  const category = queryParams.get("category") || "All";

  const [filterType, setFilterType] = useState("All");
  const [sortType, setSortType] = useState("Latest");
  const [visibleCount, setVisibleCount] = useState(4);

  const user = JSON.parse(localStorage.getItem("user"));

  
  useEffect(() => {
    let result = [...jobs];

    if (searchQuery) {
      result = result.filter(job =>
        job.title.toLowerCase().includes(searchQuery) ||
        job.company.toLowerCase().includes(searchQuery) ||
        job.location.toLowerCase().includes(searchQuery)
      );
    }

    if (category !== "All") result = result.filter(job => job.type === category);
    if (filterType !== "All") result = result.filter(job => job.type === filterType);

    if (sortType === "Salary") result = result.sort((a, b) => b.salary - a.salary);
    else if (sortType === "Oldest") result = result.sort((a, b) => a.id - b.id);
    else result = result.sort((a, b) => b.id - a.id);

    setFilteredJobs(result);
  }, [searchQuery, category, filterType, sortType, jobs]);

  const handleApply = (job) => {
    if (!user) return alert("Please login to apply");

    const applications = JSON.parse(localStorage.getItem("applications")) || {};
    if (!applications[user.email]) applications[user.email] = [];
    applications[user.email].push(job);
    localStorage.setItem("applications", JSON.stringify(applications));

    alert(`Applied for ${job.title}`);
  };

  const handleSave = (job) => {
    if (!user) return alert("Please login to save jobs");

    const saved = JSON.parse(localStorage.getItem("savedJobs")) || {};
    if (!saved[user.email]) saved[user.email] = [];
    if (!saved[user.email].find(j => j.id === job.id)) saved[user.email].push(job);
    localStorage.setItem("savedJobs", JSON.stringify(saved));

    alert(`Saved: ${job.title}`);
  };

  const loadMore = () => setVisibleCount(prev => prev + 4);
  const currentJobs = filteredJobs.slice(0, visibleCount);

  const handleFilter = (type) => setFilterType(type);
  const handleSort = (type) => setSortType(type);

  const handleExplore = () => {
    if (jobsRef.current) jobsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <HeroSection onExplore={handleExplore} />
      

         
      <div ref={jobsRef} className="jobs">
         <h1>Available Jobs</h1>
        <p>Explore jobs by category and find the perfect fit for you.</p>
        <div className="head"> 
        
        {["All", "Full-time", "Part-time", "Internship"].map(type => (
          <button
            key={type}
            onClick={() => handleFilter(type)}
            className={filterType === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
        <select value={sortType} onChange={e => handleSort(e.target.value)}>
          <option>Latest</option>
          <option>Oldest</option>
          <option>Salary</option>
        </select>
        </div>
      </div>

     
      <div className="jobcard">
        {currentJobs.length > 0 ? (
          currentJobs.map(job => (
            <JobCard
              key={job.id}
              job={job}
              onSave={() => handleSave(job)}
              onView={() => handleApply(job)}
              onDelete={() => deleteJob(job.id)}
              onUpdate={()=>handleUpdate(job)} 
            />
          ))
        ) : <p>No jobs found</p>}
      </div>
       {visibleCount < filteredJobs.length && (
      <button className="load-more" onClick={loadMore}>
       Load More
      </button>
)}

    </div>
  );
}
