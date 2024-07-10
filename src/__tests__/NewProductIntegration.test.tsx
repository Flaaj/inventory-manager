import { App } from "../App";

describe("New Product Page", () => {
  it("Displays error if backend returns error", () => {
    cy.intercept("PUT", "/product", {
      statusCode: 400,
      body: { error: "product name already exists" },
    });
    cy.mount(<App />, "/products/new");

    cy.get("input[name=name]").type("Shampoo");
    cy.get("button[type=submit]").click();

    cy.get("p").contains("product name already exists").should("be.visible");
  });

  it("Displays list of products and a success message", () => {
    cy.intercept("PUT", "/product", {
      statusCode: 200,
      body: [
        { name: "Shampoo" },
        { name: "Milk" },
        { name: "New Product I Just Added" },
      ],
    });
    cy.mount(<App />, "/products/new");

    cy.get("input[name=name]").type("New Product I Just Added");
    cy.get("button[type=submit]").click();

    cy.get("p").contains("Product added successfully").should("be.visible");
    cy.get("td").contains("Shampoo").should("be.visible");
    cy.get("td").contains("Milk").should("be.visible");
    cy.get("td").contains("New Product I Just Added").should("be.visible");
  });
});
