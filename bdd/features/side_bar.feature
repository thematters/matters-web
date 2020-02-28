Feature: Side Bar
  Test functionalities of side bar components.

  Scenario: Load Matters Today
    Given I visit home page
    Then the Side Bar is visible


  Scenario: Don't Miss Section Test
    Given the Cannot Miss section is visible
    When I click the fisrt article
    Then the first article page should be visible
    Then go back to previous page
    Given the Cannot Miss section is visible
    When I click the first author
    Then the author page should be visible

  Scenario: Hashtag Section Test
    Then go back to previous page
    When I scroll down to the hashtag section
    Given the hashtag section is visible
    When I click the first hashtag
    Then the first hashtag page should be visible
    Then go back to previous page
    Given the hashtag section is visible
    When I click check all hashtag button
    Then the all hashtag page should be visible

Scenario: Hot Topics Test
    Then go back to previous page
    When I scroll down to the hot topics section
    Given the hot topics section is visible
    When I click the first hot topic
    Then the first topic page should be visible
    Then go back to previous page
    Given the hot topics section is visible
    When I click the all hot topics button
    Then the all hot topics page should be visible

Scenario: Active Authors Test
    Then go back to previous page
    When I scroll down to the active authors section
    Given the active authors section is visible
    When I click the first active author
    Then the author page should be visible
    Then go back to previous page
    Given the hot topics section is visible
    Given the sign-in button is visible
    When I click the follow button
    Then the require sign-in notification should be visible
