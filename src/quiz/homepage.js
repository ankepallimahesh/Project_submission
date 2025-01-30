import React, { useEffect, useState } from "react";
import { Card, Button, ProgressBar, Container } from "react-bootstrap";
import Spinner from 'react-bootstrap/Spinner';

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = () => {
    setLoading(true);
    fetch("https://thingproxy.freeboard.io/fetch/https://api.jsonserve.com/Uw5CrX")
      .then((res) => res.json())
      .then((data) => {
        console.log("The data:", data);
        if (data.questions) {
          setQuestions(data.questions);
        } else {
          console.error("Invalid API response structure");
        }
        setLoading(false); 
      })
      .catch((err) => {
        console.error("Error fetching quiz data:", err);
        setLoading(false); 
      });
  };

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option.description);
    if (option.is_correct) setScore((prevScore) => prevScore + 4);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        const newIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(newIndex);
        setStatus(((newIndex) / questions.length) * 100);
      } else {
        setQuizCompleted(true);
        setStatus(100);
      }
      setSelectedAnswer(null);
    }, 400);
  };

  const handleStartQuiz = () => {
    setStartQuiz(true);
    fetchQuestions(); 
  };

  return (
    <div>
      {startQuiz ? (
        <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
          <Card className="w-100 max-w-2xl p-4 shadow-lg bg-white rounded-2xl">
            <Card.Body>
              {loading ? (
                <Spinner animation="border" role="status" className="d-flex justify-content-center align-items-center" style={{ position: "absolute", top: "50%", left: "50%" }} />
              ) : quizCompleted ? (
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                  <p className="text-lg">Your Score: {score} points</p>
                  <Button onClick={() => window.location.reload()} className="mt-4">
                    Restart Quiz
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="mb-4">
                    <ProgressBar now={status} label={`${Math.round(status)}%`} />
                  </div>
                  <h2 className="text-xl font-semibold">{questions[currentQuestionIndex]?.description}</h2>
                  <div className="mt-4">
                    {questions[currentQuestionIndex]?.options.map((option, index) => (
                      <Button
                        key={index}
                        variant={
                          selectedAnswer === option.description
                            ? option.is_correct
                              ? "success"
                              : "danger"
                            : "secondary"
                        }
                        className="d-block w-100 text-left mt-2"
                        onClick={() => handleAnswerClick(option)}
                      >
                        {option.description}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      ) : (
        <div className="d-flex align-items-center justify-content-center min-vh-30">
          <Button onClick={handleStartQuiz} className="mt-4">
            Start Quiz
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
