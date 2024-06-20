import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

// Scenario: Add a product
//     Given I am on the new product page
//     When I fill the form to add a product
//     And I submit the form
//     Then I see the added product in the list of products

let name: string;

Given("I am on the new product page", () => {
  cy.visit("/products/new");
});

When("I fill the form to add a product", () => {
  name = "Product I Just Added " + Math.random();
  cy.get("input[name=name]").type(name);
});

When("I submit the form", () => {
  cy.get("button[type=submit]").click();
});

Then("I see the added product in the list of products", () => {
  cy.get("li").contains(name);
});
