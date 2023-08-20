import { ADD_REUNION, FETCH_REUNIONS,DELETE_REUNIONS, UPDATE_REUNIONS } from '../constants/constants';

const initialState = {
  reunions: [],
};

const reunionReducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REUNION:
      return {
        ...state,
        reunions: [...state.reunions, action.payload],
      };
    case FETCH_REUNIONS:
      return {
        ...state,
        reunions: action.payload,
      };
      case UPDATE_REUNIONS:
      return {
        ...state,
        reunions: [...state.reunions, action.payload],
      };
    default:
      return state;
  }
};

export default reunionReducers;
