// IMPORT CORE MODULE
import { useState, useEffect } from "react";
import { getCategories } from "../../api/requests";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { startGame } from "../../actions/game";
import formHandler from "./formHandler";

// Import styles
import "./HomePage.css";

// IMPORT COMPONENTS
import { Slider } from "@mui/material";
import Snack from "../../components/Snack";

// DEFINE VARS
const initialSnack = {
  open: false,
  severity: "",
  message: "",
};
const DIFFICULTIES = ["easy", "medium", "hard"];

const HomePage = () => {
  const gameStatus = useSelector((state) => state.game.status);
  const dispatch = useDispatch();

  // Define states
  const [snack, setSnack] = useState(initialSnack);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({
    catName: "",
    parsedCat: "",
  });
  const [difficulty, setDifficulty] = useState("");
  const [limit, setLimit] = useState(5);

  const [showCat, setShowCat] = useState(false);
  const [showDiff, setShowDiff] = useState(false);

  // Get all the categories
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCategories();
      const dataKeys = Object.keys(data);
      const TAB = [];
      for (let i = 0; i < dataKeys.length; i++) {
        TAB.push({
          catName: dataKeys[i],
          data: [data[dataKeys[i]]],
        });
      }
      setCategories(TAB);
    };
    fetchData();
  }, []);

  // Handle the category value
  const handleCatValue = (catIdx) => {
    setCategory({
      catName: categories[catIdx].catName,
      parsedCat: categories[catIdx].data.join(","),
    });
    setShowCat(false);
  };

  // Handle the difficulty value
  const handleDifficulty = (diff) => {
    setDifficulty(diff);
    setShowDiff(false);
  };

  const handleChange = (event, newValue) => {
    setLimit(newValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!formHandler(category, difficulty, limit, setSnack)) {
      return;
    }
    dispatch(startGame(category, difficulty, limit));
  };

  // Close snack handler
  const closeSnackHandler = () => {
    setSnack({ ...snack, open: false });
  };

  return gameStatus ? (
    <Navigate to="/game" />
  ) : (
    <div className="homepage">
      <p className="homepage-title">Welcome to the game</p>
      <form className="homepage-form" onSubmit={submitHandler}>
        <div className="select category-select">
          <div
            className="selected-text"
            onClick={() => {
              setShowCat(!showCat);
              setShowDiff(false);
            }}
          >
            <span>
              {category.catName ? category.catName : "Select a category"}
            </span>
            <i className="fa-solid fa-caret-down"></i>
          </div>

          <ul className={`select-items ${showCat && "active"}`}>
            {categories.map((item, idx) => (
              <li
                className="select-item"
                onClick={() => handleCatValue(idx)}
                key={idx}
              >
                {item.catName}
              </li>
            ))}
          </ul>
        </div>
        {/* Difficuly box */}
        <div className="select difficulty-select">
          <div className="selected-text" onClick={() => setShowDiff(!showDiff)}>
            <span>{difficulty ? difficulty : "Select a difficulty"}</span>
            <i className="fa-solid fa-caret-down"></i>
          </div>

          <ul className={`select-items ${showDiff && "active"}`}>
            {DIFFICULTIES.map((item, idx) => (
              <li
                className="select-item"
                onClick={() => handleDifficulty(item)}
                key={idx}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="limit">
          <p>How many questions do you want?</p>
          <Slider
            defaultValue={5}
            aria-label="Default"
            valueLabelDisplay="auto"
            min={5}
            max={20}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Start</button>
      </form>
      <Snack snack={snack} closeSnack={closeSnackHandler} />
    </div>
  );
};

export default HomePage;
