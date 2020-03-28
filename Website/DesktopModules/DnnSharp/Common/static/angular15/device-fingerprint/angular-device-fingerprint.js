(function (angular) {
    'use strict';

    angular.module('devicefingerprint', [])
        .directive('devicefingerprint', [
            function () {
                return {
                    restrict: 'EA',
                    scope: {
                        devFpOpts: '@',
                        updateField: '&'
                    },
                    link: function (scope, element, attrs) {
                        if (typeof Fingerprint2 === 'function') {
                            scope.devFpOpts = JSON.parse(scope.devFpOpts);
                            new Fingerprint2(scope.devFpOpts).get(function (result, components) {
                                // result is the hash that we save, 
                                // components is the object with every information included for fingerprinting
                                scope.ngModel = result;
                                element.attr("data-val", result);
                                scope.updateField({ field: attrs.afField, val: result });
                            });
                        }
                    }
                }
            }
        ])
})(window.dnnsfAngular15 || window.angular);