Feature: Add new product

I want to add new products to the list of products

@focus
Scenario: Add new product
    Given I am on the new product page
    When I fill the form to add a product
    And I submit the form
    Then I see the added product in the list of products
