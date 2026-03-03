import { jest, describe, it, expect, beforeEach } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddDish from "../components/AddDish";
import { MemoryRouter } from "react-router-dom";

// Mock navigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AddDish", () => {
  beforeEach(() => {
    fetch.mockClear();
    mockNavigate.mockClear();
    alert.mockClear();
  });

  it("submits form successfully", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AddDish />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/Cheese Burger/i), "Burger");
    await user.click(screen.getByRole("button", { name: /Add to Gallery/i }));

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(alert).toHaveBeenCalledWith("Dish added successfully!");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("shows error if request fails", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AddDish />
      </MemoryRouter>
    );

    await user.type(screen.getByPlaceholderText(/Cheese Burger/i), "Burger");
    await user.click(screen.getByRole("button", { name: /Add to Gallery/i }));

    expect(alert).toHaveBeenCalledWith(
      "Error adding dish. Check if backend is running on port 5000!"
    );
  });
});