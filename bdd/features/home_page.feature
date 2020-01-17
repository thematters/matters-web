Feature: Home Page Feed
  Test functionalities of home page feed components.

  Scenario: Load Matters Today
    Given I visit home page
    Then the Matters Today title should be visible
    Then the Matters Today description should visible
    When I click the Matters Today's cover
    Then the Article page should be visible

  Scenario: Load Hottest Feed
    Given I visit home page
    Then the hottest list should be visible
    Then the article title and description in hottest list should be visible
    When I scroll down to the end of the hottest list
    Then the load more button should be visible
    When I click the load more button
    Then more hottest articles are loaded

  Scenario: Load ICYMI Feed
    Given I visit home page
    Then the ICYMI list should be visible
    Then the article title in ICYMI list should be visible
    When I click the ICYMI article title
    Then the Article page should be visible

  Scenario: Load Topics Feed
    Given I visit home page
    Then the topics list should be visible
    Then the article title in topics list should be visible
    When I click the topics article title
    Then the Article page should be visible

  Scenario: Load Authors Feed
    Given I visit home page
    Then the authors list should be visible
    Then the author name in auhtors list should be visible
    When I click the authors name
    Then the User page should be visible

  Scenario: Load Tags Feed
    Given I visit home page
    Then the tags list should be visible
    Then the tag name in tags list should be visible
    When I click the tags name
    Then the Tag page should be visible
