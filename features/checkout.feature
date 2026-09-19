Feature: Checkout
Scenario: Complete purchase
  Given user has product in cart
  When user proceeds to checkout
  And user enters checkout details
  And user finishes purchase
  Then order should be successful