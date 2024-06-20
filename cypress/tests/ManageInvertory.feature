Feature: Manage invertory

I want to be able to update invertory

@focus
Scenario: Add products to inventory
    Given I am on inventory page
    When I add a product
    And I save the inventory
    Then the inventory should be updated with the new product

@focus
Scenario: Change product quantity
    Given I am on inventory page and there is a product
    When I change product quantity
    And I save the inventory
    Then the inventory should be updated with the updated quantity of that product

@focus
Scenario: Reset inventory
    Given I am on inventory page and there is a product
    When I reset the inventory
    Then the inventory should be empty