Feature: Home Page Feed
  Test functionalities of home page feed components.

  Scenario: Load Matters Today
    Given I visit matters.news home page
    Then the Matters Today title should be visible
    Then the Matters Today description should visible
    When I click the Matters Today's cover
    Then the Article page should be visible
