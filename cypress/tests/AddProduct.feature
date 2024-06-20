Feature: Add new product

If I am on the new product page I want to be able to add a new product

@focus
Scenario: Add new product
    Given I am on the new product page
    When I fill the form to add a product
    And I submit the form
    Then I see the added product in the list of products
