import { START_GAME, END_GAME } from "../constants";
import * as api from "../api/requests";

// Start new game async thunk
export const startGame = (category, difficulty, limit) => async (dispatch) => {
  const { data } = await api.getQuestions(category, difficulty, limit);
  dispatch({ type: START_GAME, payload: data });
};

// End game thunk
export const endGame = (navigate) => (dispatch) => {
  dispatch({ type: END_GAME });
  navigate("/");
};
