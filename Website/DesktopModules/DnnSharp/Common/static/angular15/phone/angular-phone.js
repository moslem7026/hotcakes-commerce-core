//https://github.com/mareczek/international-phone-number
;
(function (angular) {
    "use strict";
    angular.module("phone", []).constant('ipnConfig', {
        allowExtensions: false,
        autoHideDialCode: true,
        autoPlaceholder: true,
        defaultCountry: "",
        geoIpLookup: true,
        nationalMode: false,
        numberType: "MOBILE",
        onlyCountries: void 0,
        preferredCountries: ['us', 'gb'],
        skipUtilScriptDownload: true,
        utilsScript: ""
    }).directive('phone', [
        '$timeout', 'ipnConfig', function ($timeout, ipnConfig) {
            return {
                restrict: 'A',
                require: '^ngModel',
                scope: {
                    ngModel: '=',
                    country: '=',
                    updateField: '&',
                    international: '@',
                    validation: '@',
                    initial: '@',
                    initialCountry: '@',
                    preferredCountries: '@',
                    field: '=',
                    registerControl: '&'
                },
                link: function (scope, element, attrs, ctrl) {
                    angular.merge(ipnConfig, {
                        customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
                            return (dnnsf.localization.phone && dnnsf.localization.phone.placeholder || "") + selectedCountryPlaceholder;
                        },
                        nationalMode: scope.international !== 'True',
                        initialCountry: scope.initialCountry.toLowerCase(),
                        preferredCountries: scope.preferredCountries.toLowerCase().split(',')
                    });

                    var validation = scope.validation === 'True';
                    var handleWhatsSupposedToBeAnArray, options, watchOnce, customErrors;

                    if (dnnsf.localization.phone) {
                        customErrors = [
                            "",
                            dnnsf.localization.phone.invalidCountryCode,
                            dnnsf.localization.phone.numberTooShort,
                            dnnsf.localization.phone.numberTooLong,
                            dnnsf.localization.phone.notPhoneNumber
                        ]
                    } else {
                        customErrors = [
                            "",
                            "Invalid country code.",
                            "Number is too short.",
                            "Number is too long.",
                            "Input is not a phone number."
                        ]
                    }

                    if (ctrl) {
                        if (element.val() !== '') {
                            $timeout(function () {
                                element.intlTelInput('setNumber', element.val());
                                return ctrl.$setViewValue(element.val());
                            }, 0);
                        }
                    }
                    handleWhatsSupposedToBeAnArray = function (value) {
                        if (value instanceof Array) {
                            return value;
                        } else {
                            return value.toString().replace(/[ ]/g, '').split(',');
                        }
                    };
                    options = angular.copy(ipnConfig);

                    if(attrs.placeholderOption == 'removeplaceholder') {
                        options.autoPlaceholder = false;
                    }
                    
                    angular.forEach(options, function (value, key) {
                        var option;
                        if (!(attrs.hasOwnProperty(key) && angular.isDefined(attrs[key]))) {
                            return;
                        }
                        option = attrs[key];
                        if (key === 'preferredCountries') {
                            return options.preferredCountries = handleWhatsSupposedToBeAnArray(option);
                        } else if (key === 'onlyCountries') {
                            return options.onlyCountries = handleWhatsSupposedToBeAnArray(option);
                        } else if (typeof value === "boolean") {
                            return options[key] = option === "true";
                        } else {
                            return options[key] = option;
                        }
                    });
                    watchOnce = scope.$watch('ngModel', function (newValue) {
                        return scope.$$postDigest(function () {
                            if (newValue !== null && newValue !== void 0 && newValue.length > 0) {
                                if (newValue[0] !== '+') {
                                    newValue = '+' + newValue;
                                }
                                ctrl.$modelValue = newValue;
                            }
                            element.intlTelInput(options);

                            if(attrs.removeflag == 'True') {
                                $(element).css('padding-left', '6px');
                                $(element).siblings().css('display', 'none');
                            }

                            if (validation && scope.initial) {
                                ctrl.ngModel = scope.initial;
                                var initialError = element.intlTelInput('getValidationError');
                                if (initialError !== 0) {
                                    displayError(customErrors[initialError]);
                                }
                            }
                            if (!(options.skipUtilScriptDownload || attrs.skipUtilScriptDownload !== void 0 || options.utilsScript)) {
                                element.intlTelInput('loadUtils', '/js/utils.js');
                            }
                            return watchOnce();
                        });
                    });
                    scope.$watch('country', function (newValue) {
                        if (newValue !== null && newValue !== void 0 && newValue !== '') {
                            return element.intlTelInput("selectCountry", newValue);
                        }
                    });
                    ctrl.$formatters.push(function (value) {
                        if (!value) {
                            return value;
                        }
                        element.intlTelInput('setNumber', value);
                        return element.val();
                    });
                    ctrl.$validators.internationalPhoneNumber = function (value) {
                        var selectedCountry, errorMessage;
                        selectedCountry = element.intlTelInput("getSelectedCountryData");
                        if (!value || (selectedCountry && selectedCountry.dialCode === value) || element.intlTelInput("getValidationError") === 0) {
                            element.closest('.field-container').removeClass("has-error");
                            element.closest('.field-container').find('.phone-text-danger').remove();
                            return true;
                        } else {
                            if (validation) {
                                var errorNumber = element.intlTelInput("getValidationError");
                                if (typeof errorNumber === 'number') {
                                    element.closest('.field-container').addClass("has-error");
                                    errorMessage = customErrors[errorNumber];
                                    displayError(errorMessage);
                                }
                            }
                            return false;
                        }
                    };
                    function displayError(errMsg) {
                        var err = element.closest('.field-container').find('.phone-text-danger');
                        if (err.length) {
                            err.text(errMsg);
                            err.show();
                        }
                        else {
                            element.closest('.field-container').addClass("has-error");
                            var spanError = document.createElement("span");
                            spanError.className = "phone-text-danger";
                            element.closest('.field-container').append(spanError);
                            $(spanError).text(errMsg);
                        }
                    }
                    scope.$watch(function () {
                        return element.intlTelInput('getNumber');
                    }, function (newVal) {
                        if (typeof element.intlTelInput('getNumber') !== 'object') {
                            scope.ngModel = element.intlTelInput('getNumber');
                            element.intlTelInput('setNumber', scope.ngModel);
                        }
                    });

                    scope.registerControl({
                        control: {
                            field: scope.field,
                            onSubmit: function (fnCallWhenDone, fnCallOnError) {
                                if (validation && element.val()) {
                                    var submitError = element.intlTelInput("getValidationError");
                                    if (submitError !== 0) {
                                        displayError("");
                                        return fnCallOnError('\n' + scope.field.TitleCompacted + ': ' + customErrors[submitError] + '\n');
                                    }
                                }
                                fnCallWhenDone && fnCallWhenDone();
                            },
                            getValue: function () {
                                return element.intlTelInput('getNumber');
                            }
                        }
                    });

                }
            };
        }
    ]);

})(window.dnnsfAngular15 || window.angular);
