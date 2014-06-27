angular.module('risevision.widget.common.fontpicker', [])
  .directive('fontPicker', ['$log', function ($log) {
    return {
      restrict: 'AE',
      scope: false,
      link: function ($scope, elm, attrs) {
        var stripLast = function (str, strToStrip) {
          var index = str.indexOf(strToStrip);
          if(index >= 0) {
            str = str.substring(0, str.lastIndexOf(strToStrip));
          }
          return str;
        };

        var $selectbox;
        var $elm = $(elm);
        var prefix = attrs.prefix || stripLast(attrs.id, '-font');

        $elm.fontPicker({
          'font' : $scope.getAdditionalParam(
            prefix + '-font', attrs.defaultFont),
            showCustom: true,
            showMore: true
        });

        var picker = $elm.data('plugin_fontPicker');


        // $selectbox = $elm.find('div.bfh-selectbox');
        // $selectbox.bfhselectbox($selectbox.data());

        //load i18n text translations after ensuring i18n has been initialized
        // i18nLoader.get().then(function () {$elm.i18n();});

        $scope.$on('collectAdditionalParams', function () {
          $log.debug('Collecting params from', prefix, picker);
          $scope.setAdditionalParam(prefix + '-font', picker.getFont());
        });
      }
    };
  }]);
