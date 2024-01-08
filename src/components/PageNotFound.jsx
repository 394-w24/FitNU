import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <p>It might have been moved or deleted.</p>
      <Link to="/" style={{ color: "#007bff", textDecoration: "none" }}>
        ← Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
