import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import user from "../../redux/user/reducer";
import Login from "./index";

function renderWithRedux(
  ui,
  { initialState, store = createStore(user, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store
  };
}

test("render with redux data", () => {
  const { getByText } = renderWithRedux(<Login />, {
    initialState: { user: { isLoggedIn: false } }
  });
  expect(getByText("Username")).toBeInTheDocument();
});

test("should handle uname onChange", () => {
  const { getByText, getByPlaceholderText } = renderWithRedux(<Login />, {
    initialState: { user: { isLoggedIn: false } }
  });

  const inputField = getByPlaceholderText("Username");
  fireEvent.change(inputField, { target: { value: "test" } });
  expect(getByText("Username")).toBeInTheDocument();
});

test("should handle login route", () => {
  const props = {
    history: { push: () => {} }
  };
  const { getByText } = renderWithRedux(<Login {...props} />, {
    initialState: { user: { isLoggedIn: true } }
  });

  expect(getByText("Username")).toBeInTheDocument();
});
