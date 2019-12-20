import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import user from "../../redux/user/reducer";
import Header from "./index";

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
  const { getByText } = renderWithRedux(<Header />, {
    initialState: { user: { user: { name: "luke" } } }
  });
  expect(getByText("STAR WARS")).toBeInTheDocument();
});

test("should handle button click", () => {
  const { getByText } = renderWithRedux(<Header />, {
    initialState: { user: { user: { name: "luke" } } }
  });

  const button = getByText("logout");
  fireEvent.click(button);
  expect(getByText("logout")).toBeInTheDocument();
});
