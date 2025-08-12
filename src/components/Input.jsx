import React from "react";

export const Input = ({ label, type, value, onChange, name }) => (
  <div className="input-group">
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="input"
      name={name}
    />
  </div>
);  