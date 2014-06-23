casper.test.begin('font picker: font list', function (test) {
    casper.start('http://localhost:8099/test/e2e/test.html', function () {
        test.assertTitle('Test Page');
        //should Display "Times New Roman" by default
        test.assertSelectorHasText('.bfh-selectbox-option', 'Times New Roman');
        test.assertNotVisible('.bfh-selectbox-options');
    });

    casper.then(function () {
        this.click('.bfh-selectbox-option');
        test.assertVisible('.bfh-selectbox-options');
        test.assertElementCount('.bfh-selectbox-options ul li', 48);
        test.assertExists('.bfh-selectbox-options ul li a[data-option="Use Custom Font"]');
        test.assertExists('.bfh-selectbox-options ul li a[data-option="More Fonts..."]');
    });


    //more fonts dialog
    casper.then(function () {
      test.assertNotVisible('.google-fonts.modal');
      this.click('.bfh-selectbox-options ul li a[data-option="More Fonts..."]');
      test.assertExists('.bfh-selectbox-options ul li a[data-option="More Fonts..."]');
      test.assertVisible('.google-fonts.modal');

      test.assertElementCount('.google-fonts.modal .modal-body a.list-group-item', 624);

    });


    casper.run(function() {
        test.done();
    });
});
