import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

// Scenario: Add products to inventory
//     Given I am on inventory page
//     When I add a product
//     And I save the inventory
//     Then the inventory should be updated with the new product

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

let randomInt: number;

Given("I am on inventory page", () => {
  cy.visit("/");
  cy.get("button[type=button]").contains("Reset inventory").click();
});

When("I add a product", () => {
  randomInt = getRandomInt(1, 100);
  cy.get("select[name=product-name]").select("shampoo");
  cy.get("input[name=product-quantity]").clear().type(randomInt.toString());
  cy.get("button[type=submit]").contains("Add product").click();
});

When("I save the inventory", () => {
  cy.get("button[type=submit]").contains("Save inventory").click();
});

Then("the inventory should be updated with the new product", () => {
  cy.reload();
  cy.get("li")
    .get("input#inventory-1")
    .should("have.value", randomInt.toString());
});

// Scenario: Change product quantity
//     Given I am on inventory page and there is a product
//     When I change product quantity
//     And I save the inventory
//     Then the inventory should be updated with the updated quantity of that product

Given("I am on inventory page and there is a product", () => {
  randomInt = getRandomInt(1, 100);
  cy.visit("/");
  cy.get("button[type=button]").contains("Reset inventory").click();
  cy.get("select[name=product-name]").select("shampoo");
  cy.get("input[name=product-quantity]").clear().type(randomInt.toString());
  cy.get("button[type=submit]").contains("Add product").click();
  cy.get("button[type=submit]").contains("Save inventory").click();
});

When("I change product quantity", () => {
  cy.get("li")
    .contains("shampoo")
    .get("input#inventory-1")
    .clear()
    .type(randomInt.toString());
});

Then(
  "the inventory should be updated with the updated quantity of that product",
  () => {
    cy.get("button[type=submit]").contains("Save inventory").click();
    cy.reload();
    cy.get("li")
      .contains("shampoo")
      .get("input#inventory-1")
      .should("have.value", randomInt.toString());
  }
);

// Scenario: Reset inventory
//     Given I am on inventory page and there is a product
//     When I reset the inventory
//     Then the inventory should be empty

When("I reset the inventory", () => {
  cy.get("button[type=button]").contains("Reset inventory").click();
});

Then("the inventory should be empty", () => {
  cy.get("li").contains("shampoo").should("not.exist");
});
