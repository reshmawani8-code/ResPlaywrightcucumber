Feature: Login
Scenario: Successful Login
  Given user is on login page
  When user enters username "standard_user"
  And user enters password "secret_sauce"
  And user clicks login button
  Then user should be on inventory page