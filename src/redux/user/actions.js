import types from "./types";

const loginUser = (isLoggedIn, user) => ({
  type: types.USER_LOGIN,
  isLoggedIn,
  user
});

const logoutUser = () => ({
  type: types.USER_LOGOUT
});

export default {
  loginUser,
  logoutUser
};
