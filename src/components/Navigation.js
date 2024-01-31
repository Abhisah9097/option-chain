import React from "react";
import { Link } from "react-router-dom";
import Select from "react-select";


function Navigation({options, expiryDate, updateExpiryDate, optionIndexs, optionIndex, updateOptionIndex }) {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container d-flex">
          <div className="d-flex justify-content-between">
            <h4 className="navbar-brand">
              {expiryDate?.label || "Loading.."}
            </h4>
            <Select className="select-style" value={expiryDate} onChange={(value) => updateExpiryDate(value)} options={options} />
          </div>
          <div className="d-flex justify-content-between">
            <h4 className="navbar-brand">
              {optionIndex?.label || "Loading.."}
            </h4>
            <Select className="select-style" value={optionIndex} onChange={(value) => updateOptionIndex(value)} options={optionIndexs} />
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navigation;