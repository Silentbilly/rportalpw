Feature: User Authentication tests

  Background:
    Given User navigates to the application

  Scenario: Login with successfull message
    When User enters valid username and password and clicks submit button
    Then The successfull login message should appear

  Scenario: Users is logged in
    When User enters valid username and password and clicks submit button
    And Clicks on user dropdown menu
    Then User name should be in user dropdown menu

  Scenario: Users is logged out
    When User enters valid username and password and clicks submit button
    And Clicks on user dropdown menu
    And Clicks on logout option
    Then The successfull logout message should appear

  Scenario: Login with wrong credentials
    When User enters invalid username "<username>" and password "<password>" and clicks submit button
    Then The bad credentials login message should not appear for "<username>" and ""
    And The bad credentials login message should not appear for "" and "<password>"
    But The bad credentials login message should appear for "<username>" and "<password>"

  Examples:
    | username      | password        |
    | wrongName     | wrongPassword   |