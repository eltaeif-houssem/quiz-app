import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { endGame } from "../../../actions/game";

import "./GameOver.css";
const GameOver = ({ score }) => {
  const questions = useSelector((state) => state.game.questions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newGameHandler = () => {
    dispatch(endGame(navigate));
  };
  return (
    <div className="gameover">
      <h1>Game Over</h1>
      <h3>Your final score is {(score / questions.length) * 100}%</h3>
      <button onClick={newGameHandler}>Play again?</button>
    </div>
  );
};

export default GameOver;
