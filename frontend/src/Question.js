// src/components/Question.js
import React, { useState } from "react";

const Question = ({ data, handleAnswer }) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAnswer(userAnswer);  // Pass the user's answer back to Quiz component
    setUserAnswer("");         // Clear the input field for the next question
  };

  return (
    <div>
      <h2>{data.question}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Enter your answer"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Question;
