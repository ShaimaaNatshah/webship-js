const { Given } = require('@cucumber/cucumber');
const { When, Before } = require('@cucumber/cucumber');
const { Then } = require('@cucumber/cucumber');

/**
 * Opens homepage.
 * Example: Given I am on homepage
 * Example: Given I am on the homepage
 * 
 * @Given /^I am on( the)* homepage$/
 */
Given(/^I am on( the)* homepage$/, function (url) {
  return browser.url(browser.launch_url);
});

/**
 * Open specific page
 * Example: Given I am on "about-us.html"
 *
 * @Given /^I am on "([^"]*)?"$/
 */
Given(/^I am on "([^"]*)?"$/, function (url) {
  return browser.url(browser.launch_url + url);
});

/**
 * Go to homepage
 * Example: When I go to the homepage
 * Example: And I go to "/"
 *
 * @When /^I go to( the)* homepage$/
 */
When(/^I go to( the)* homepage$/, function () {
  return browser.url(browser.launch_url);
});

/**
 * Go to specific page
 * Example: When I go to "contact-us.html"
 *
 * @When /^I go to "([^"]*)?"$/
 */
When(/^I go to "([^"]*)?"$/, function (url) {
  return browser.url(browser.launch_url + url);
});

/**
 * Asserting a text in the page.
 * 
 * Example:
 * - Then I should see "Welcome"
 * - Then I should not see "Access denied"
 * 
 * @Then /^I should( not)* see "([^"]*)?"$/
 */
Then(/^I should( not)* see "([^"]*)?"$/, function (negativeCase, expectedText) {
  if (negativeCase) {
    return browser.assert.not.textContains('html', expectedText);
  }

  return browser.assert.textContains('html', expectedText);
});

/**
 * Moves forward one page in history
 * Example: When I move forward one page
 *
 * @When /^I move forward one page$/
 */
When(/^I move forward one page$/, function () {
  return browser.forward();
});

/**
 * Moves backward one page in history
 * Example: When I move backward one page
 *
 * @When /^I move backward one page$/
 */
When(/^I move backward one page$/, function () {
  return browser.back();
});

/**
 * Presses button with specified id|class|name|value
 * Example: When I press "Log In"
 * Example: And I press "Log In"
 *
 * @When /^I press "([^"]*)?"$/
 */
When(/^I press "([^"]*)?"$/, function (elementValue) {
  return browser.click("[value='" + elementValue + "']");
  // return browser.smartPressButton(elementValue);
});

/**
 * Clicks link with specified id|class|name|text
 * Example: When I click "Contact Us"
 * Example: And I click "aboutUs"
 *
 * @When /^I click "([^"]*)?"$/
 */
When(/^I click "([^"]*)?"$/, function (item) {
  browser.smartClickLink(item);
});

/**
 * Reloads current page
 * Example: When I reload the page
 * Example: And I reload the page
 *
 * @When /^I reload( the)* page$/
 */
When(/^I reload( the)* page$/, function (url) {
  return browser.refresh(browser.getCurrentUrl());
});

/**
 * Define the step of filling values in the form field specified by id|class|name|label.
 * Example: When I fill in "Username" with "John Smith"
 *
 * @When /^I fill in "([^"]*)?" with "([^"]*)?"$/
 */
When(/^I fill in "([^"]*)?" with "([^"]*)?"$/, function (field, value) {
  browser.smartFillTextInput(field, value);
});

/**
 * Fills in form field with specified id|class|name|label
 * Example: When I fill in "username" with:
 *
 * @When /^I fill in "([^"]*)?" with:$/
 */
When(/^I fill in "([^"]*)?" with:$/, function (field) {
  browser.smartFillTextInput(field, '');
});

/**
 * Fills in form field with specified id|class|name|label
 * Example: And I fill in "webshipco" for "username"
 *
 * @When /^I fill in "([^"]*)?" for "([^"]*)?"$/
 */
When(/^I fill in "([^"]*)?" for "([^"]*)?"$/, function (value, field) {
  browser.smartFillTextInput(field, value);
});

/**
 * Fills in form fields with provided table
 * Example: When I fill in the following:
 *              | username | webshipco |
 *              | password | 1234 |
 * Example: And I fill in the following"
 *              | username | webshipco |
 *              | password | 1234 |
 *
 * @When /^I fill in the following:$/
 */
When(/^I fill in the following:$/, function (table) {

  browser.smartFillTextInput(table.rawTable[0][0], table.rawTable[0][1]);
  table.rows().forEach(row => {
    browser.smartFillTextInput(row[0], row[1]);
  });
});

/**
 * Selects option in select field with specified id|class|name|label
 * Example: When I select "mercedes" from "Cars"
 *
 * @When /^I select "([^"]*)?" from "([^"]*)?"$/
 */
When(/^I select "([^"]*)?" from "([^"]*)?"$/, function (option, selectBox) {
  browser.smartSelectOption(option, selectBox);
});

/**
* Checks checkbox specified by id|class|name|label
* Example: When I check "Remember me"
*
* @When /^I check "([^"]*)?"$/
*/
When(/^I check "([^"]*)?"$/, function (item) {
  browser.smartCheckItem(item);
});

/**
* Unchecks checkbox specified by id|class|name|label
* Example: When I uncheck "Remember me"
*
* @When /^I uncheck "([^"]*)?"$/
*/
When(/^I uncheck "([^"]*)?"$/, function (item) {
  browser.smartUncheckItem(item);
});

/**
* Verify, that current page is the homepage
* Example: Then I should be on the homepage
*
* @Then /^I should be on( the)* homepage$/
*/
Then(/^I should be on( the)* homepage$/, function (url) {
  return browser.assert.urlEquals(browser.launch_url);
});

/**
* Verify, that current page path is equal to specified
* Example: Then I should be on "/"
* Example: And I should be on "/user/login"
* Example: And I should be on "http://google.com"
*
* @Then /^I should be on "([^"]*)?"$/
*/
Then(/^I should be on "([^"]*)?"$/, function (url) {
  return browser.assert.urlContains(url);
});

/**
* Checks, that HTML response contains specific text specified by id|class|name|label
* Example: Then the response should contain "Welcome visitor, How can I help you?"
* Example: Then the response should not contain "Error: Ambiguous messages that are unclear"
*
* @Then /^the response should contain "([^"]*)?"$/
*/
Then(/^the response should( not)* contain "([^"]*)?"$/, function (negativeCase, expectedText) {
  if (negativeCase) {
    return browser.assert.not.textContains('html', expectedText);
  }

  return browser.assert.textContains('html', expectedText);
});

/**
* Assert, that element contains a specific text value specified by id|class|name|label
* Example: Then I should see "John Smith" in the "Username" element
* Example: Then I should see "Joe Smith" in the "Username" element
*
* @Then /^I should( not)* see "([^"]*)?" in the "([^"]*)?" element$/
*/
Then(/^I should( not)* see "([^"]*)?" in the "([^"]*)?" element$/, function (negativeCase, expectedText, element) {
  return browser.assert.smartElementContains(negativeCase, expectedText, element);
});

/**
* Assert, that page contains text matching specified pattern
* Example: Then I should see text matching "Welcome visitor, How can I help you?"
* Example: Then I should not see text matching "Error: Ambiguous messages that are unclear"
*
* @Then /^I should( not)* see text matching "([^"]*)?"$/
*/
Then(/^I should( not)* see text matching "([^"]*)?"$/, function (negativeCase, expectedText) {
  if (negativeCase) {
    return browser.assert.not.textContains('html', expectedText);
  }

  return browser.assert.textContains('html', expectedText);
});

/**
 * Assert, that element exists on page specified by id|class|name|label
 * Example: Then I should see a "body" element
 *
 * @Then /^I should( not)* see a(n)* "([^"]*)?" element$/
 */
Then(/^I should( not)* see a(n)* "([^"]*)?" element$/, function (negativeCase, identification, element) {
  if (negativeCase) {
    return browser.verify.not.visible(element);
  }
  return browser.verify.visible(element);
});

/**
 * Assert, that element contains a specific CSS style specified by id|class|name|label|tag.
 * Example: Then the "body" element should contain "color:white;"
 *
 * @Then /^the "([^"]*)?" element should( not)* contain "([^"]*)?"$/
 */
Then(/^the "([^"]*)?" element should( not)* contain "([^"]*)?"$/, function (element, negativeCase, elementCss) {
  return browser.assert.smartElementContainsCss(element, negativeCase, elementCss);
});

/**
* Attaches file to field with specified id|class|name|label
* Example: When I attach the file "profileIcon.jpg" to "profileIconUpload"
*
* @When /^I attach the file "([^"]*)?" to "([^"]*)?"$/
*/
When(/^I attach the file "([^"]*)?" to "([^"]*)?"$/, function (fileUrl, element) {
  browser.smartUploadFile(fileUrl, element);
});

/**
 * Assert, that form field with specified id|class|name|label has specified value
 * Example: Then the "username" field should contain "John Smith"
 *
 * @Then /^the "([^"]*)?" field should( not)* contain "([^"]*)?"$/
 */
Then(/^the "([^"]*)?" field should( not)* contain "([^"]*)?"$/, function (field, negativeCase, expectedText) {
  return browser.assert.smartElementContains(negativeCase, expectedText, field);
});

/**
* Assert, that checkbox with specified id|class|name|label is should be checked
* Example: Then the "PrivacyPolicy" checkbox should be checked
*
* @Then /^the "([^"]*)?" checkbox should(not)* be checked$/
* 
*/
Then(/^the "([^"]*)?" checkbox should( not)* be checked$/, function (checkbox, negativeCase) {
  return browser.assert.smartCheckboxChecked(checkbox, negativeCase);
});

/**
* Check, whether the checkbox specified by id|class|name|label is checked or not.
* Example: Then the "Remember Me" checkbox is checked
*
* @Then /^the "([^"]*)?" checkbox is( not)* checked$/
* 
*/
Then(/^the "([^"]*)?" checkbox is( not)* checked$/, function (checkbox, negativeCase) {
  return browser.assert.smartCheckboxChecked(checkbox, negativeCase);
});

/**
* Assert, that checkbox with specified id|name|label|value is checked
* Example: Then the checkbox "PrivacyPolicy" should be checked
* Example: Then the checkbox "PrivacyPolicy" should not be checked
*
* @Then /^the checkbox "([^"]*)?" should(not)* be checked$/
* 
*/
Then(/^the checkbox "([^"]*)?" should( not)* be checked$/, function (checkbox, negativeCase) {
  return browser.assert.smartCheckboxChecked(checkbox, negativeCase);
});

/**
* Assert, that checkbox with specified id|name|label|value is checked
* Example: Then the checkbox "Remember Me" is checked
* Example: And the checkbox "Remember Me" is not checked
*
* @Then /^the checkbox "([^"]*)?" is( not)* checked$/
* 
*/
Then(/^the checkbox "([^"]*)?" is( not)* checked$/, function (checkbox, negativeCase) {
  return browser.assert.smartCheckboxChecked(checkbox, negativeCase);
});

/**
* Wait a specific number of seconds, or a max number of seconds 
until the element present.
* Example: When I wait 1 second
* Example: When I wait 5 seconds
* Example: When I wait max of 6 seconds
*
* @When /^I wait( max of)* "([^"]*)?" second(s)*$/
* 
*/
When(/^I wait( max of)* (\d*) second(s)*$/, function (maxof, number, withS) {
  var waitTime = number * 1000;
  if (maxof) {
    return browser.waitForElementPresent('body', waitTime);
  }
  return browser.pause(waitTime);
});

/**
* Wait a specific number of minutes, or a max number of minutes 
until the element present.
* Example: When I wait 1 minute
* Example: When I wait 5 minutes
* Example: When I wait max of 6 minutes
*
* @When /^I wait( max of)* "([^"]*)?" second(s)*$/
* 
*/
When(/^I wait( max of)* (\d*) minute(s)*$/, function (maxof, number, withS) {
  var waitTime = number * 60 * 1000;
  if (maxof) {
    return browser.waitForElementPresent('body', waitTime);
  }
  return browser.pause(waitTime);
});