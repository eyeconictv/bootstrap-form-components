if(typeof RiseVision === 'undefined') {
	var RiseVision = {Common: {}};
}

;(function (CONFIG, RiseVision) {
	RiseVision.Common.Utilities = (function() {
		function loadCustomFont(family, url, contentDocument) {
			var sheet = null;
			var rule = "font-family: " + family + "; " + "src: url('" + url + "');";

			if (contentDocument === null || typeof contentDocument === 'undefined') {
				contentDocument = document;
			}

			sheet = contentDocument.styleSheets[0];

			if (sheet !== null && typeof sheet !== 'undefined') {
				sheet.addRule("@font-face", rule);
			}
		}

		function loadGoogleFont(family, contentDocument, prefix) {

			if(!prefix) {
				prefix = CONFIG.GOOGLE_FONT_PREFIX || 'https://fonts.googleapis.com/css?family=';
			}

			if (contentDocument === null) {
				contentDocument = document;
			}

			var stylesheet = document.createElement("link");

			stylesheet.setAttribute("rel", "stylesheet");
			stylesheet.setAttribute("type", "text/css");
			stylesheet.setAttribute("href", prefix +
				family);

			if (stylesheet !== null) {
				contentDocument.getElementsByTagName("head")[0].appendChild(stylesheet);
			}
		}

		return {
			loadCustomFont: loadCustomFont,
			loadGoogleFont: loadGoogleFont,
		};
	})();

})(CONFIG, RiseVision);
