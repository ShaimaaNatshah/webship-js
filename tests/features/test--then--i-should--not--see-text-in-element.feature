Feature: An example to test whether an element contains a certain text or not
  As a tester
  I want to be able to check an element contains a certain text or not

  Scenario: Check an element if it contains a specific text
    Given I am on "/test--then--i-should--not--see-text-in-element.html"
    When I fill in "Username" with "user1"
    And I fill in "Password" with "1234"
    Then I should see "user1" in the "#uname" element
    When I fill in "uname" with: by attr
    And I fill in "Password" with:
    Then I should not see "user1" in the "#uname" element

  Scenario: Check an element if it does not contain a specific text
    Given I am on "/test--then--i-should--not--see-text-in-element.html"
    And I fill in "Username" with "user2"
    Then I should not see "user1" in the "#uname" element