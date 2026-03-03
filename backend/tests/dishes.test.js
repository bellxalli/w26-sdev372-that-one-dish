import { jest } from "@jest/globals";

const mockQuery = jest.fn();

await jest.unstable_mockModule("../db.js", () => ({
  pool: {
    query: mockQuery,
  },
}));

const { default: app } = await import("../server.js");

import request from "supertest";

describe("Dishes API", () => {
  beforeEach(() => {
    mockQuery.mockReset();
  });

  describe("GET /api/dishes", () => {
    it("returns all dishes", async () => {
      const fakeDishes = [
        { id: 1, dish_name: "Pizza" },
        { id: 2, dish_name: "Sushi" },
      ];

      mockQuery.mockResolvedValue([fakeDishes]);

      const res = await request(app).get("/api/dishes");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(fakeDishes);
      expect(mockQuery).toHaveBeenCalledWith("SELECT * FROM dishes");
    });

    it("returns 500 on DB error", async () => {
      mockQuery.mockRejectedValue(new Error("DB failure"));

      const res = await request(app).get("/api/dishes");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: "Database query failed" });
    });
  });

  describe("POST /api/dishes", () => {
    it("creates a dish", async () => {
      mockQuery.mockResolvedValue([{}]);

      const res = await request(app)
        .post("/api/dishes")
        .field("dish_name", "Burger")
        .field("cuisine", "American")
        .field("dish_details", "Beef burger")
        .field("restaurant_name", "Burger Place")
        .field("restaurant_address", "123 Main St");

      expect(res.statusCode).toBe(201);
      expect(res.body).toEqual({ message: "Dish added" });
      expect(mockQuery).toHaveBeenCalled();
    });

    it("returns 500 if insert fails", async () => {
      mockQuery.mockRejectedValue(new Error("Insert failed"));

      const res = await request(app)
        .post("/api/dishes")
        .field("dish_name", "Burger")
        .field("cuisine", "American")
        .field("dish_details", "Beef burger")
        .field("restaurant_name", "Burger Place")
        .field("restaurant_address", "123 Main St");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({ error: "Failed to add dish" });
    });
  });
});