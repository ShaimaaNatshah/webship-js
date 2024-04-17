module.exports.command = function (option, dropdownlist) {

  browser.findElement('css selector', 'select[name=' + dropdownlist + ']', function (result) {
    if (result.status === 0) {
      browser.waitForElementVisible('css selector', 'select[name="' + dropdownlist + '"]')
      .click('select[name="' + dropdownlist + '"]')
      .click(browser.element.findByText(option))
      .click('select[name="' + dropdownlist + '"]');
    }
  });
}