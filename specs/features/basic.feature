Feature: Show main page
  As a user, I want to see the main page

  Scenario: Show the main page
    Given The application starts from the route {'/'}
    Then I can see the text {'Main example'}
