import React from "react";

const Result = ({ score, total }) => {
  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>
        You scored {score} out of {total}.
      </p>
      <button onClick={() => window.location.reload()}>Restart Quiz</button>
    </div>
  );
};

export default Result;
