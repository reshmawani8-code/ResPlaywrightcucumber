Feature: Add To Cart
Scenario: Add product to cart
  Given user is logged in
  When user adds "Sauce Labs Backpack" to cart
  And user goes to cart
  Then product "Sauce Labs Backpack" should be visible in cart