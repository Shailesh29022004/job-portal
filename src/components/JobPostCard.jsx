import React from "react";

const JobPostCard = ({ job }) => (
  <div className="job-post-card">
    <h3>{job.title}</h3>
    <p>Company: {job.company}</p>
    <p>Location: {job.location}</p>
    <p>Applications: {job.applicationsCount || 0}</p>
  </div>
);

export default JobPostCard;
