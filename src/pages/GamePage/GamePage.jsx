// IMPORT CORE MODULE
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import GameOver from "./GameOver/GameOver";

// IMPORT STYLES
import "./GamePage.css";
import InGame from "./InGame/InGame";

const GamePage = () => {
  const game = useSelector((state) => state.game);
  const [score, setScore] = useState(0);
  const [inGame, setInGame] = useState(true);

  return !game.status ? (
    <Navigate to="/" />
  ) : (
    <div className="gamepage">
      {inGame ? (
        <InGame setScore={setScore} setInGame={setInGame} />
      ) : (
        <GameOver score={score} />
      )}
    </div>
  );
};

export default GamePage;
