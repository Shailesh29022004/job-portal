import React from "react";
import { Link } from "react-router-dom";
import heroimage from "../assets/jobs.png";

export default function HeroSection({ onExplore }) {
  return (
    <section className="find">
      <div className="most">
        <div className="start">
          <h1 className="text1">Find the most exciting startup jobs</h1>
          <p className="subtext">
            Explore thousands of opportunities from top companies and build your dream career.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={onExplore}>
              Explore Jobs
            </button>
            <Link to={"/post-job"}>
              <button className="btn-secondary">Post a Job</button>
            </Link>
          </div>
          <div className="benefits">
            <h2>Why Choose JobFinder?</h2>
            <ul>
              <li>Trusted by 10,000+ companies</li>
              <li>Find jobs that match your skills</li>
              <li>Easy and fast application process</li>
            </ul>
          </div>
        </div>
        <div className="heroimg">
          <img src={heroimage} alt="Hero" />
        </div>
      </div>
    </section>
  );
}
