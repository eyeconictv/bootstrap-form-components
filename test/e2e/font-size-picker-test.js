casper.test.begin('font size picker: size list', function (test) {
  var e2ePort = require('system').env.E2E_PORT || 8099;

  casper.start('http://localhost:'+e2ePort+'/test/e2e/font-size-picker-test.html', function () {
    test.assertTitle('Font Size Picker - Test Page', "Page title is the one expected");
    test.assertSelectorHasText('.filter-option', '18', "Default size is 18");
  });


  casper.run(function() {
    test.done();
  });
});
