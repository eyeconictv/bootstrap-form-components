"use strict";

describe("addGoogleFont", function() {
  var $fontPicker;

  before(function() {
    // Initialize the plugin.
    var fontPicker = document.createElement("div");

    document.body.appendChild(fontPicker);

    $fontPicker = $(fontPicker).fontPicker({
      font: "Times New Roman"
    });
  });

  it("should add a Google font to the dropdown", function() {
    expect($fontPicker.find("li.google-font a[data-option='Anton']").length).to.equal(0);

    $fontPicker.data("plugin_fontPicker").addGoogleFont("Anton", false);

    expect($fontPicker.find("li.google-font a[data-option='Anton']").length).to.equal(1);
  });

  it("should not add a Google font to the dropdown if it has already been added", function() {
    expect($fontPicker.find("li.google-font a[data-option='Anton']").length).to.equal(1);

    $fontPicker.data("plugin_fontPicker").addGoogleFont("Anton", false);

    expect($fontPicker.find("li.google-font a[data-option='Anton']").length).to.equal(1);
  });

  it("should select a newly added font", function() {
    $fontPicker.data("plugin_fontPicker").addGoogleFont("Nixie One", true);

    expect($fontPicker.find(".bfh-selectbox-option").data("option")).to.equal("Nixie One");
    expect($fontPicker.find(".font-family").val()).to.equal("Nixie One");
  });

  it("should not select a newly added font", function() {
    $fontPicker.data("plugin_fontPicker").addGoogleFont("Poly", false);

    expect($fontPicker.find(".bfh-selectbox-option").data("option")).to.not.equal("Poly");
    expect($fontPicker.find(".font-family").val()).to.not.equal("Poly");
  });
});
