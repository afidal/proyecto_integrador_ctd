import React from "react";
import "./MockUp.css";
export const MockUpProduct = () => {
  return (
    <div className="card is-loading product-is-loading">
      <div className="mockUp-image"></div>
      
        <div className="mockUp-content">
            <div className="mockUp-category"></div>
          <div className="mockUp-title"></div>
          <div className="mockUp-location"></div>
          <div className="mockUp-description"></div>
          <div className="mockUp-button" ></div>
          <p></p>
        </div>
      
    </div>
  );
};
