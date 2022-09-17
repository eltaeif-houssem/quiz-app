import { START_GAME, END_GAME } from "../constants";
const initialState = { status: false, questions: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_GAME:
      return { status: true, questions: action.payload };

    case END_GAME:
      return { status: false, questions: [] };

    default:
      return state;
  }
};

export default reducer;
