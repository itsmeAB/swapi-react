import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import user from "../../redux/user/reducer";
import Home from "./index";

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
  const props = {
    history: { push: () => {} }
  };
  const { getByText } = renderWithRedux(<Home {...props} />, {
    initialState: { user: { user: { name: "luke" } } }
  });
  expect(getByText("STAR WARS")).toBeInTheDocument();
});

test("should handle search onChange", () => {
  const props = {
    history: { push: () => {} }
  };
  const { getByPlaceholderText } = renderWithRedux(<Home {...props} />, {
    initialState: { user: { user: { name: "luke" } } }
  });

  const searchInput = getByPlaceholderText("search here for planets...");
  fireEvent.change(searchInput, { target: { value: "al" } });
  expect(
    getByPlaceholderText("search here for planets...")
  ).toBeInTheDocument();
});

test("should handle search onClick", () => {
  const props = {
    history: { push: () => {} }
  };
  const { getByText } = renderWithRedux(<Home {...props} />, {
    initialState: { user: { user: { name: "luke" } } }
  });

  fireEvent.click(
    getByText((_content, element) => {
      return element.getAttribute("aria-label") === "icon: search";
    })
  );
});
