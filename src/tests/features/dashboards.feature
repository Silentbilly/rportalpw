@dashboards
Feature: Dashboards tests

    Background: 
        Given User clicks on 'Add New Dashboard' button
        And In popup user enters dashboard's name and description and clicks 'Add' button

    Scenario: User is able to create a dashboard via UI
        Then Dashboard is created

    Scenario: User is able to remove a dashboard via UI
        When User clicks on Delete button
        And User clicks on Delete button in popup
        Then Dashboard deleted message is appeared