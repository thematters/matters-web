Feature: Login and logout
  Test functionalities of login components.

  Scenario: Login
    Given I visit home page
    Then the header should be unlogged status
    When I click the login button in the header
    Then the login modal should be visible
    When I fill up the login form
    When I click the login button
    Then the header should be logged status

  Scenario: Logout
    Given I visit home page
    Then the header should be logged status
    When I move mouse to the user avatar in the header
    Then the user drop down should be visible
    When I click the logout button in drop down menu
    Then the header should be unlogged status
