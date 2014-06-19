casper.test.begin('font picker: font list', 3, function (test) {
    casper.start('http://localhost:8099/test/e2e/test.html', function () {
        test.assertTitle('Test Page');
        test.assertSelectorHasText('h1', 'Test!');
    });

    casper.then(function () {
      //TODO
        this.click('button');
        test.assertSelectorHasText('h1', 'New title');
    });

    casper.run(function() {
        test.done();
    });
});
