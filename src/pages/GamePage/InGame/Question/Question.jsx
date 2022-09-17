import { useState } from "react";
import { useSelector } from "react-redux";

import "./Question.css";

const Question = ({
  question,
  suggestions,
  setScore,
  setInGame,
  setQuestion,
}) => {
  const game = useSelector((state) => state.game);
  const [choice, setChoice] = useState(null);
  const [answered, setAnswered] = useState(false);

  const answerQuestionHandler = () => {
    if (choice === null) {
      /* Set a snack here*/
      return;
    }

    if (suggestions[choice] === game.questions[question].correctAnswer) {
      setScore((state) => state + 1);
    }

    if (question === game.questions.length - 1) {
      setInGame(false);
      return;
    }

    setAnswered(true);
  };
  const nextQuestionHandler = () => {
    setChoice(null);
    setAnswered(false);
    setQuestion((state) => state + 1);
  };

  return (
    <div className="question">
      <h1 className="question-title">{game.questions[question].question}</h1>
      <div className="question-suggestions">
        {suggestions.map((item, key) => (
          <div
            className={`suggestion ${choice === key && "active"} ${
              answered &&
              ((item === game.questions[question].correctAnswer && "correct") ||
                "incorrect")
            }`}
            key={key}
            onClick={() => setChoice(key)}
          >
            {item}
          </div>
        ))}
      </div>
      {!answered ? (
        <button className="answer-question-btn" onClick={answerQuestionHandler}>
          Answer
        </button>
      ) : (
        <button className="next-question-btn" onClick={nextQuestionHandler}>
          Next question
        </button>
      )}
    </div>
  );
};

export default Question;
