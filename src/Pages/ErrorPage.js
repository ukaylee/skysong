import React from "react";

function ErrorPage({ error }) {
  return (
    <>
      <div>An error has occurred!</div>
      <div>Error: {error}</div>
    </>
  );
}

export default ErrorPage;
