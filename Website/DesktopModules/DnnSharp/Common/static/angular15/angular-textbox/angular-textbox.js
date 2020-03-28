(function (angular) {
    "use strict";
    angular.module("angulartextbox", [])
        .directive('angulartextbox', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                scope: false,
                link: function (scope, element, attrs) {
                    
                    if (attrs['autocomplete']) {
                        element.devbridgeAutocomplete({
                            paramName: 'query',
                            serviceUrl: attrs.autocomplete,
                            deferRequestBy: attrs.deferRequestBy || 300,
                            transformResult: function (response) {
                                return {
                                    suggestions: $.map($.parseJSON(response), function (dataItem) {
                                        return { value: dataItem.Text, data: dataItem.Value };
                                    })
                                };
                            },
                            onSelect: function (suggestion) {
                                $timeout(function () {
                                    var autocompleteField = scope.form.fields[element.attr('data-af-field')];
                                    autocompleteField.value = suggestion.value;
                                    autocompleteField.data = suggestion.data;

                                    autocompleteField.onChange && autocompleteField.onChange(scope.form);
                                });
                            }
                        });
                    }

                    if (element.attr('type') == 'password') {
                        element.css('display', 'inline-block');
                        scope.showPassword = function (event) {
                            var eventTarget = $(event.currentTarget);
                            eventTarget.closest('.field-container').find('input[type="password"]').attr('type', 'text');
                            eventTarget.css('display', 'none');
                            eventTarget.siblings('button').css('display', 'inline-block');
                        };
                        scope.hidePassword = function (event) {
                            var eventTarget = $(event.currentTarget);
                            eventTarget.closest('.field-container').find('input[type="text"]').attr('type', 'password');
                            eventTarget.css('display', 'none');
                            eventTarget.siblings('button').css('display', 'inline-block');
                        };
                    };
                }
            };
        }])
})(window.dnnsfAngular15 || window.angular);
