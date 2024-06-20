import { App } from "../App";

describe("Manage Inventory Page", () => {
  it("Shows inventory and lists products", () => {
    cy.intercept("GET", `${process.env.API_URL}/products/all`, {
      statusCode: 200,
      body: [
        { name: "Product 1" },
        { name: "Product 2" },
        { name: "Product 3" },
        { name: "Product 4" },
        { name: "Product 5" },
      ],
    });
    cy.intercept("GET", `${process.env.API_URL}/inventory`, {
      statusCode: 200,
      body: [
        { name: "Product 1", quantity: 10 },
        { name: "Product 2", quantity: 20 },
        { name: "Product 3", quantity: 30 },
        { name: "Product 4", quantity: 40 },
        { name: "Product 5", quantity: 50 },
      ],
    });

    cy.mount(<App />, "/");
  });
});
