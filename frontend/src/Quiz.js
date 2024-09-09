import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Question from "./Question";
import Result from "./Result";

const quizData = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Who is the CEO of Tesla?",
    answer: "Elon Musk",
  },
  {
    question: "What is the smallest planet in our solar system?",
    answer: "Mercury",
  },
];

const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [userAnswers, setUserAnswers] = useState([]); // To keep track of all user's answers

  const handleTimeout = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < quizData.length) {
      setCurrentIndex(nextIndex);
      setTimeLeft(180); // Reset timer for the next question
    } else {
      setShowResult(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    // Set up timer to decrement the timeLeft state by 1 every second
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          handleTimeout();
          return 0;
        }
      });
    }, 1000);

    // Cleanup the interval when the component unmounts or when the question changes
    return () => clearInterval(timer);
  }, [currentIndex, handleTimeout]);

  const handleAnswer = (userAnswer) => {
    // Store the user's answer in the state
    const updatedAnswers = [...userAnswers, { question: quizData[currentIndex].question, userAnswer }];
    setUserAnswers(updatedAnswers);

    // Send answer to the backend
    axios
      .post("http://localhost:8000/api/quiz", {
        question: quizData[currentIndex].question,
        userAnswer: userAnswer.trim(),
        correctAnswer: quizData[currentIndex].answer,
        isCorrect: userAnswer.trim().toLowerCase() === quizData[currentIndex].answer.toLowerCase(),
      })
      .then((response) => {
        console.log("Answer sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending answer:", error);
      })
      console.log(userAnswer);

    // Check if the answer is correct and update the score
    if (userAnswer.trim().toLowerCase() === quizData[currentIndex].answer.toLowerCase()) {
      setScore(score + 1);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < quizData.length) {
      setCurrentIndex(nextIndex);
      setTimeLeft(180); // Reset timer for the next question
    } else {
      setShowResult(true);
    }
  };

  return (
    <div>
      {showResult ? (
        <Result score={score} total={quizData.length} />
      ) : (
        <div>
          <Question data={quizData[currentIndex]} handleAnswer={handleAnswer} />
          <div>
            <p>
              Time Remaining: {Math.floor(timeLeft / 60)}:
              {timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
