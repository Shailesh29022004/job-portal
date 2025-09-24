import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { JobsContext } from "../context/JobsContext"; 


export default function JobCard({ job, onSave, onView, onDelete }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { updateJob } = useContext(JobsContext); 

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...job });

  

  const handleView = () => {
    if (!user) {
      navigate("/login"); 
      return;
    }
    navigate(`/job/${job.id}`);
  };

  const handleSave = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    onSave(job);
  };


  const handleDelete = () => {
    if (!user || user.role !== "admin") {
      alert("Only admins can delete jobs!");
      return;
    }
    if (window.confirm(`Are you sure you want to delete "${job.title}"?`)) {
      onDelete(job.id);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    if (!user || user.role !== "admin") {
      alert("Only admins can edit jobs!");
      return;
    }

    const updatedJob = { ...formData, id: job.id }; 
    updateJob(updatedJob); 
    setIsEditing(false);
  };

  return (
    <div className="tital">
      {isEditing ? (
        <>
          <input name="title" value={formData.title} onChange={handleChange} />
          <input name="company" value={formData.company} onChange={handleChange} />
          <input name="location" value={formData.location} onChange={handleChange} />
          <input name="type" value={formData.type} onChange={handleChange} />
          <input name="salary" value={formData.salary} onChange={handleChange} />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3 className="to">{job.title}</h3>
          <p className="companay">{job.company} - {job.location}</p>
          <p className="type">{job.type}</p>
          <p className="salary">₹{job.salary}</p>
          <p>{job.description}</p>

          <div className="onview">
            <button onClick={handleView}>View Details</button>
            <button onClick={handleSave} className="bd">Save</button>

            {user?.role === "admin" && (
              <>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete} className="delete-btn">Delete</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
