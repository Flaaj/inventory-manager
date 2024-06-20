Feature: Manage invertory

I want to be able to update invertory

@focus
Scenario: Add products to inventory
    Given I am on inventory page
    When I add a product
    And I save the inventory
    Then the inventory should be updated with the new product


@wip
Scenario: Change product quantity
    Given I am on inventory page
    When I change product quantity
    And I save the inventory
    Then the inventory should be updated with the updated quantity of that product

@wip
Scenario: Reset inventory
    Given I am on inventory page
    When I reset the inventory
    Then the inventory should be empty