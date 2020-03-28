;
(function (angular) {
    angular.module('multipleChoiceGroup', [])
        .directive('multipleChoiceGroup', [function () {
            return {
                restrict: 'A',
                scope: {
                    classToAdd: '@',
                    numberOfColumnsForLabel: '@'
                },
                link: function (scope, element, attrs) {
                    var gridStyles = "grid-column-start: 1; grid-column-end: " + (Number(scope.numberOfColumnsForLabel) + 1) + ";";
                    dnnsf.createClass("." + scope.classToAdd + ".multiple-choice-group-container .multiple-choice-radio > :first-child", gridStyles);
                }
            }
        }]);

})(window.dnnsfAngular15 || window.angular);