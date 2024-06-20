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
});

When("I add a product", () => {
    randomInt = getRandomInt(1, 100);
    cy.get("select[name=product-name]").select("shampoo");
    cy.get("input[name=product-quantity]").type(randomInt.toString());
    cy.get("button[type=button]").contains("Add product").click();
});

When("I save the inventory", () => {
    cy.get("button[type=submit]").contains("Save inventory").click();
});

Then("the inventory should be updated with the new product", () => {
    cy.get("li").contains("shampoo").contains(randomInt);
});
