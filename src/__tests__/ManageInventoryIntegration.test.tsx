import { App } from "../App";

describe("Manage Inventory Page", () => {
  it("Shows inventory and lists products", () => {
    cy.intercept("GET", `${process.env.API_URL}/product/all`, {
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
      ],
    });
    cy.mount(<App />, "/");

    cy.get("select[name=product-name]").should("be.visible");
    cy.get("option").contains("Product 4").should("exist");
    cy.get("option").contains("Product 5").should("exist");
    cy.get("input[name=product-quantity]").should("be.visible");

    cy.get("li")
      .contains("Product 1")
      .get("input#inventory-1")
      .should("have.value", "10");
    cy.get("li")
      .contains("Product 2")
      .get("input#inventory-2")
      .should("have.value", "20");
    cy.get("li")
      .contains("Product 3")
      .get("input#inventory-3")
      .should("have.value", "30");
  });

  it("Shouldn't overwrite other quantity inputs when adding new product", () => {
    cy.intercept("GET", `${process.env.API_URL}/product/all`, {
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
      ],
    });
    cy.mount(<App />, "/");

    cy.get("li")
      .contains("Product 3")
      .get("input#inventory-3")
      .clear()
      .type("333");

    cy.get("select[name=product-name]").select("Product 4");
    cy.get("input[name=product-quantity]").type("40");
    cy.get("button[type=submit]").contains("Add product").click();

    cy.get("li")
      .contains("Product 3")
      .get("input#inventory-3")
      .should("have.value", "333");
  });

  it("Shows error message when saving inventory fails", () => {
    cy.intercept("GET", `${process.env.API_URL}/product/all`, {
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
      ],
    });
    cy.intercept("POST", `${process.env.API_URL}/inventory`, {
      statusCode: 400,
      body: {
        error: "Some of the inventory items are missing in the products list",
      },
    });
    cy.mount(<App />, "/");

    cy.get("button[type=submit]").contains("Save inventory").click();

    cy.get("p")
      .contains("Some of the inventory items are missing in the products list")
      .should("be.visible");
  });
});
