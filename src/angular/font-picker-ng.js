angular.module('risevision.widget.common.fontpicker', [])
  .directive('fontPicker', ['$log', function ($log) {
    return {
      restrict: 'A',
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
        var prefix = attrs.fontPickerPrefix || stripLast(attrs.id, '-font');
        var picker = $elm.data('font-picker');
        $elm.fontPicker({
          'font' : $scope.getAdditionalParams(
            prefix + '-font', attrs.fontPickerDefaultFont),
            showCustom: true,
            showMore: true
        });

        $selectbox = $elm.find('div.bfh-selectbox');
        $selectbox.bfhselectbox($selectbox.data());

        //load i18n text translations after ensuring i18n has been initialized
        // i18nLoader.get().then(function () {$elm.i18n();});

        $scope.$on('collectAdditionalParams', function () {
          $log.debug('Collecting params from', prefix, picker);
          $scope.setAdditionalParams(prefix + '-font', picker.getFont());
        });
      }
    };
  }]);
