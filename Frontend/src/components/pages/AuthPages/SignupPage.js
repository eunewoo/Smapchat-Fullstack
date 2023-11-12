import React from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const handleRouteToHome = () => navigate("/");
  return (
    <div className="container-fluid text-white">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <p>LoginPage</p>
          <button className="btn btn-primary mt-3" onClick={handleRouteToHome}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
