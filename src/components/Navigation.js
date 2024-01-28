import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

function Navigation({options, expiryDate, updateExpiryDate }) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container">
          <div class="d-flex justify-content-end">
            <h4 className="navbar-brand">
              {expiryDate?.label || "Loading.."}
            </h4>
            <Select className="select-style" onChange={(value) => updateExpiryDate(value)} options={options} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;