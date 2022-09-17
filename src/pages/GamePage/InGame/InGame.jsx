// IMPORT CORE MODULE
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// IMPORT STYLES
import Question from "./Question/Question";

const InGame = ({ setScore, setInGame }) => {
  const game = useSelector((state) => state.game);
  // Define states
  const [question, setQuestion] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (game.status) {
      const newSuggestions = game.questions[question].incorrectAnswers;
      const correctAnswer = game.questions[question].correctAnswer;
      const answerPos = Math.floor(Math.random() * 4);

      newSuggestions.splice(answerPos, 0, correctAnswer);
      setSuggestions(newSuggestions);
    }
  }, [game, question]);

  return (
    <div className="ingame">
      <Question
        question={question}
        suggestions={suggestions}
        setQuestion={setQuestion}
        setScore={setScore}
        setInGame={setInGame}
      />
    </div>
  );
};

export default InGame;
