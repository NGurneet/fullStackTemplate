import React from "react";

const ErrorComponent = () => {
  throw new Error("This is a test error");
  return <div>No error here!</div>;
};

export default ErrorComponent;
