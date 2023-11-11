import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="container-fluid mt-4">
      {/* remove height and color from the css when you add components */}

      <div className="row justify-content-center">
        <div className="left">Display Maps</div>

        <div className="right">Settings</div>
      </div>
    </div>
  );
};

export default HomePage;
