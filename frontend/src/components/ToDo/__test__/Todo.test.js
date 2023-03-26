import ToDo from "../ToDo.js";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Todo", () => {
  test("adding todo", () => {
    render(<ToDo />);
  });
});
