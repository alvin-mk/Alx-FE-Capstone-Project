// src/components/ErrorMessage.jsx
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-200 text-red-800 p-3 rounded-md mb-5">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
