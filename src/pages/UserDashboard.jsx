import React from "react";

export default function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const applications = JSON.parse(localStorage.getItem("applications")) || {};
  const myApplications = applications[user.email] || [];

  return (
    <div className="user-dashboard">
      <h2>{user.name}'s Dashboard</h2>
      <h3>Applied Jobs</h3>
      {myApplications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        <ul>
          {myApplications.map(job => (
            <li key={job.id}>{job.title} at {job.company}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

