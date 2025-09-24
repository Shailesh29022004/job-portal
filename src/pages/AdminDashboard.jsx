import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [applications, setApplications] = useState({});
  const [savedJobs, setSavedJobs] = useState({});

  useEffect(() => {
    const apps = JSON.parse(localStorage.getItem("applications")) || {};
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || {};
    setApplications(apps);
    setSavedJobs(saved);
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <section>
        <h3>All User Applications</h3>
        {Object.keys(applications).length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          Object.entries(applications).map(([email, jobs]) => (
            <div key={email}>
              <h4>{email}</h4>
              <ul>
                {jobs.map(job => (
                  <li key={job.id}>
                    {job.title} at {job.company}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>

      <section>
        <h3>All User Saved Jobs</h3>
        {Object.keys(savedJobs).length === 0 ? (
          <p>No saved jobs yet.</p>
        ) : (
          Object.entries(savedJobs).map(([email, jobs]) => (
            <div key={email}>
              <h4>{email}</h4>
              <ul>
                {jobs.map(job => (
                  <li key={job.id}>
                    {job.title} at {job.company}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

