import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  function handleDeleteQuestion(deletedQuestionId) {
    setQuestions(questions.filter((question) => question.id !== deletedQuestionId));
  }

  function handleUpdateQuestion(updatedQuestion) {
    setQuestions(questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q)));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDeleteQuestion}
            onUpdate={handleUpdateQuestion}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;