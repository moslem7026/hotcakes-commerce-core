;
(function (angular) {

    angular.module("ngCurrency", [])

        .directive('ngCurrency', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    updateField: '&',
                    field: '=',
                    ngModel: '='
                },
                link: {
                    pre: function (scope, el, attrs, ctrl) {

                    },
                    post: function (scope, el, attrs, ctrl) {
                        var precision = parseInt(attrs.precision) || 0;
                        var language;
                        var settings = { minimumFractionDigits: precision, maximumFractionDigits: precision };
                        if (attrs.formattertype == 'auto')
                            initLocalesFormatter();
                        else
                            initMaskFormatter();

                        function initLocalesFormatter() {
                            if (!attrs.locales || attrs.locales == 'browser')
                                language = navigator.language;
                            else
                                language = attrs.languagecode;
                            if (attrs.currency) {
                                settings.style = 'currency';
                                settings.currency = attrs.currency;

                            }
                            el.on('focus', function () {
                                el.attr('data-val') && (this.value = el.attr('data-val'));
                            });
                            el.on('keydown', function (e) {
                                var keycode = e.keyCode;
                                if ((keycode > 64 && keycode < 91) || // letter keys
                                    (keycode > 185 && keycode < 190) || // ;=,- (in order)
                                    (keycode > 190 && keycode < 193) || // /` (in order)
                                    keycode == 32 || //space
                                    (keycode > 218 && keycode < 223)   // [\]' (in order)
                                ) {
                                    e.preventDefault();
                                }
                                if ((keycode > 47 && keycode < 58) || // numbers 
                                    keycode == 190
                                ) {
                                    var rgx = /^[0-9]*\.?[0-9]*$/;
                                    var toCheck = this.value + e.key;
                                    if (!rgx.test(toCheck))
                                        e.preventDefault();
                                }

                            });

                            el.on('input', function (e) {
                                var val = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
                                el.attr('data-val', !isNaN(parseFloat(val)) ? parseFloat(val).toFixed(precision) : '');
                            });
                            el.on('blur', function () {
                                if (!el.attr('data-val'))
                                    return;
                                var floatVal = parseFloat(el.attr('data-val'));
                                el.val(floatVal.toLocaleString(language, settings))
                            })
                            setTimeout(function () {
                                if (el.val() && !el.attr('data-val')) {
                                    el.attr('data-val', el.val());
                                    el.blur();
                                }
                            }, 0)
                        }

                        function initMaskFormatter() {
                            ctrl.$parsers.push(function (value) {
                                var floatValue = (value + "").replace(/\s/g, '');
                                if (isNaN(floatValue)) {
                                    floatValue = floatValue
                                        .split(attrs.currency).join('')
                                        .split(attrs.decimalseparator).join('_dec')
                                        .split(attrs.thousandsseparator).join('')
                                        .split('_dec').join('.')
                                }
                                el.attr('data-val', parseFloat(floatValue).toFixed(precision));
                                return floatValue;
                            });

                            el.maskMoney({
                                prefix: attrs.currencyposition == 'before' ? attrs.currency + ' ' : '',
                                suffix: attrs.currencyposition == 'after' ? ' ' + attrs.currency : '',
                                formatOnBlur: (attrs.formatonblur == 'True'),
                                allowZero: (attrs.allowzero == 'True'),
                                allowNegative: (attrs.allownegative == 'True'),
                                allowEmpty: (attrs.allowempty == 'True'),
                                doubleClickSelection: (attrs.doubleclickselection == 'True'),
                                selectAllOnFocus: (attrs.selectallonfocus == 'True'),
                                thousands: attrs.thousandsseparator,
                                decimal: attrs.decimalseparator,
                                precision: precision,
                                affixesStay: (attrs.affixesstay == 'True'),
                                bringCaretAtEndOnFocus: (attrs.bringcaretatendonfocus == 'True'),
                            });
                            scope.$watch('ngModel', function (newValue, oldValue, scope) {
                                if (newValue == "") {
                                    newValue = 0;
                                    updateFieldVal(newValue);
                                }
                                newValue = newValue + "";
                                if (newValue && newValue.split('.')[1] && newValue.split('.')[1].length > precision) {
                                    updateFieldVal(newValue);
                                }
                                else {
                                    var floatVal = parseFloat(newValue).toFixed(precision);
                                    $(el).attr('data-val', floatVal);
                                    el.val(el.maskMoney('applyMask', floatVal));
                                }
                            });
                        }
                        function updateFieldVal(newValue) {
                            scope.updateField({ field: scope.field.TitleCompacted, val: parseFloat(newValue).toFixed(precision) });
                        }
                        function getValue(value) {
                            var val;
                            if (value.split('.')[1] && value.split('.')[1].length > precision) {
                                val = parseFloat(value).toFixed(precision);
                            }
                            else {
                                val = parseFloat(value);
                            }
                            return val;
                        }
                        setTimeout(function () {
                            var val;
                            switch (true) {
                                case (attrs.initialvalue != ""):
                                    val = getValue(attrs.initialvalue);
                                    break;
                                case (ctrl.$modelValue != "" && ctrl.$modelValue != NaN):
                                    val = getValue(ctrl.$modelValue);
                                    break;
                                default:
                                    val = null;
                                    break;
                            }
                            if (val) {
                                el.attr('data-val', val);
                                var valPrec = (val + "").split(".")[1] ? (val + "").split(".")[1].length : 0;
                                if (valPrec != precision)
                                    val = val.toFixed(precision);
                                el.val(attrs.formattertype == 'auto' ? parseFloat(val).toLocaleString(language, settings) : el.maskMoney('applyMask', val + ""));
                                el.focus();
                                el.blur();
                            }
                        }, 0)

                    }
                }
            };
        }
        ]);

})(window.dnnsfAngular15 || window.angular);
