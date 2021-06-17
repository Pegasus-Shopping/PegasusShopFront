import React from "react";
import ReactDom from "react-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  render, fireEvent, waitFor, screen,
} from "@testing-library/react";

// import "@testing-library/just-dom/extend-expect";
// import App from "../Client/src/Components/App";
function App() {
  return <div>Hello World</div>;
}

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get("/greeting", (req, res, ctx) =>
    // respond using a mocked JSON body
    res(ctx.json({ greeting: "hello there" }))),
);
beforeAll(() => {
  console.log("New Test!");
  server.listen();
});
test("loads and stuff", () => {
  render(<App />);
  screen.debug();
});
