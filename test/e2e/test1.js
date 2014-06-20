casper.test.begin('font picker: font list', 5, function (test) {
    casper.start('http://localhost:8099/test/e2e/test.html', function () {
        test.assertTitle('Test Page');
        //should Display "Times New Roman" by default
        test.assertSelectorHasText('.bfh-selectbox-option', 'Times New Roman');
        test.assertNotVisible('.bfh-selectbox-options');
    });

    casper.then(function () {
      //TODO
        this.click('.bfh-selectbox-option');
        test.assertVisible('.bfh-selectbox-options');
        test.assertElementCount('.bfh-selectbox-options ul li', 48);
    });

    casper.run(function() {
        test.done();
    });
});
