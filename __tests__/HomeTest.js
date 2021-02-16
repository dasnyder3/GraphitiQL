import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MyApp from "../pages/_app.js";

test("Check for Getting Started Text", () => {
  const { getByText } = render( MyApp );
  expect(getByText("Connect to a database")).toBeInTheDocument();
});