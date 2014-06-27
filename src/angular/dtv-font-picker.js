angular.module('risevision.widget.common.fontpicker', [])
  .directive('fontPicker', ['$log', function ($log) {
    return {
      restrict: 'AE',
      scope: false,
      require: '?ngModel',
      template: '<div class="the-picker"></div>',
      link: function ($scope, elm, attrs, ngModel) {
        var stripLast = function (str, strToStrip) {
          var index = str.indexOf(strToStrip);
          if(index >= 0) {
            str = str.substring(0, str.lastIndexOf(strToStrip));
          }
          return str;
        };

        var $selectbox, picker;
        var $elm = $(elm).find('div.the-picker');

        //initialize only if not yet initialized
        if(!$elm.data('plugin_fontPicker')) {
          $elm.fontPicker({
            font : attrs.defaultFont || 'Verdana',
            blank: false,
            showCustom: true,
            showMore: true
          });

          picker = $elm.data('plugin_fontPicker');
        }
        if(ngModel) {
          ngModel.$render = function () {
            if(ngModel.$modelValue) {
              picker.setFont(ngModel.$modelValue);
            }
          };
        }

        // $selectbox = $elm.find('div.bfh-selectbox');
        // $selectbox.bfhselectbox($selectbox.data());

        //load i18n text translations after ensuring i18n has been initialized
        // i18nLoader.get().then(function () {$elm.i18n();});

        $scope.$on('collectAdditionalParams', function () {
          $log.debug('Collecting params from', attrs.id);
          if(ngModel) {
            ngModel.$setViewValue(picker.getFont());
          }
        });
      }
    };
  }]);
