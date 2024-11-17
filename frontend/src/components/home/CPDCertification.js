import React from "react";
import "./CPDCertification.css";

const CPDCertification = () => {
  return (
    <div className="cpd-certification-container">
      <div className="cpd-certification-content">
        <h2 className="cpd-certification-title">
          Rehabilified: Now a CPD-Approved and Certified Provider
        </h2>
        <p className="cpd-certification-description">
          We are thrilled to announce that Rehabilified has officially achieved CPD 
          (Continuing Professional Development) approval, solidifying our commitment 
          to delivering high-quality and impactful training programs.
        </p>
        <p className="cpd-certification-description">
          As a CPD-approved provider, our courses meet rigorous professional standards, 
          ensuring that they contribute meaningfully to the continuous learning and 
          development of professionals across various fields.
        </p>
      </div>
      <div className="cpd-certification-image">
        <img
          src="/images/cpd_approved.jpg"
          alt="CPD Certified Badge"
          className="cpd-image"
        />
        <img
          src="/images/cpd_provider.jpg"
          alt="Training Program"
          className="cpd-image secondary-image"
        />
      </div>
    </div>
  );
};

export default CPDCertification;
