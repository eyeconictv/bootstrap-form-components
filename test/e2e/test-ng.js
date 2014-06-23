(function() {

  "use strict";

  /* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

  var chai = require("chai");
  var chaiAsPromised = require("chai-as-promised");

  chai.use(chaiAsPromised);
  var expect = chai.expect;

  var fs = require("fs");

  browser.driver.manage().window().setSize(1024, 768);

  describe("font picker", function() {
    
    //a scenario where two products are added to the shopping cart
    describe("font list", function() {

      it("should load a list of files", function() {
        expect(element.all(by.css(".bfh-selectbox-options ul li")).count()).to.eventually.equal(48);
        var storageUsedInfoElem = element(by.css("div.storage-used-info"));
        expect(storageUsedInfoElem.getText()).to.eventually.equal("Storage Used: 412.9 KB");
      });
    });
  });
})();
