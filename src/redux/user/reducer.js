import types from "./types";

const initialState = {
  isLoggedIn: false,
  user: null
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        ...{
          isLoggedIn: action.isLoggedIn,
          user: action.user
        }
      };
    case types.USER_LOGOUT:
      return {
        ...state,
        ...{
          isLoggedIn: false,
          user: null
        }
      };
    default:
      return state;
  }
}
