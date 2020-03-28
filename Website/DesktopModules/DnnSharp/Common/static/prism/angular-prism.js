(function (angular) {
    angular.module('ngPrism', []).
    directive('prism', ['$timeout', '$sce', function ($timeout, $sce) {
        return {
            restrict: 'A',
            scope:{
              ngModel: '='
            },
            link: function ($scope, element, attrs) {
                element.ready(function () {
                    $timeout(function () {
                        Prism.highlightElement(element[0]);
                        $scope.$watch('ngModel', function (newVal, old) {
                          Prism.highlightElement(element[0]);
                        })
                    }, 0)
                });
            }
        }
    }]);
})(dnnsfAngular15 || angular)