dnnsfAngular15.module('blueimp.fileupload', []);
dnnsfAngular15.module('afControls', ['ngSanitize', 'dnnsf', 'blueimp.fileupload']);
var afApp = (function ($, angular) {
    var formRoot;
    const timeZoneOffset = new Date().getTimezoneOffset();
    try {
        if (!angular.module('afControls').hasController('afApplyLayout'))
            throw '';
    } catch (err) {
        angular.module('afControls').directive('afApplyLayout', ['$compile', function ($compile) {
            return {
                restrict: 'A',
                replace: false,
                scope: true,
                link: function (scope, element, attrs) {
                    scope.settings = scope.$parent.$eval(attrs.settings);
                    scope.field = scope.$parent.$eval(attrs.field);
                    scope.form = scope.$parent.$eval(attrs.form);
                    scope.parse = function (val) {
                        if ($.isNumeric(val))
                            return parseFloat(val);
                        if (typeof val === 'boolean')
                            return val;
                        // remove comma - this only works for locales that use comma for thousands
                        val = val.toString().replace(/,(\d{3})/g, '$1');
                        if ($.isNumeric(val))
                            return parseFloat(val);

                        return val;
                    };

                    element.parent().addClass('field-container af-slide ');
                    if (scope.field.CssClass != '')
                        element.parent().addClass('form-group-' + scope.field.CssClass);
                    element.addClass(scope.field.CssClass);

                    if (scope.field.ColOffset > 0 && (scope.settings.LabelAlign.Value == 4 || scope.settings.LabelAlign.Value == 5))
                        element.parent().addClass('col-sm-offset-' + scope.field.ColOffset);

                    if (scope.settings.LabelWidth.Value > 0 && scope.settings.LabelAlign.Value != 4 && scope.settings.LabelAlign != 5)
                        element.parent().addClass('col-sm-' + (scope.field.ColSpan - scope.settings.LabelWidth.Value));
                    else
                        element.parent().addClass('col-sm-' + scope.field.ColSpan);

                    if (scope.field.BindShowCompiled && !element.attr('data-initialized')) {
                        if (scope.field.BindPreserveLayout) {
                            element.attr('data-ng-style', "{visibility: " + scope.field.BindShowCompiled + " ? 'visible' : 'hidden'}");
                        } else {
                            element.attr('data-ng-show', scope.field.BindShowCompiled);
                        }
                    }
                    if (scope.field.BindEnableCompiled && !element.attr('data-initialized')) {
                        element.attr('data-ng-disabled', !scope.field.BindShowCompiled);
                    }

                    // recompile the directive so dynamically added directives such as ngShow work
                    if (!element.attr('data-initialized')) {
                        element.attr('data-initialized', 'true');
                        $compile(element)(scope);
                    }

                    scope.$on('updateFormData', function () {
                        scope.settings = scope.$parent.$eval(attrs.settings);
                        scope.field = scope.$parent.$eval(attrs.field);
                        scope.form = scope.$parent.$eval(attrs.form);
                    })
                }
            };
        }]);
    };

    // --------------------------------------------------------------------------------------------------------------------------------
    /// Start Action Form template specific code

    angular.module('afControls').factory('afSettings', function () {
        return {
            settings: {}
        }
    });

    function ActionFormCtrl($scope, $http, $timeout, $sce, $cookieStore, $element, dataSources, dnnsf, afSettings, dnnsfHttp) {
        var $ = dnnsfjQuery;
        $scope.dnnsf = dnnsf;
        $scope.$sce = $sce;
        $scope.Math = Math;
        $scope.testTags = [];

        $scope.form = {
            fields: []
        };
        // get the field based on the html element.
        $scope.getField = function (htmlElement) {
            var field = _.find(_.values($scope.form.fields), function (_field) {
                return _field.id === htmlElement.id;
            });
            if (!field) return null;
            return field;
        };

        $scope.controls = [];
        $scope.registerControl = function (control) {
            $scope.controls.push(control);
        };

        $scope.parse = function (val) {
            if (val === undefined || val === null)
                return false;

            if ($.isNumeric(val))
                return parseFloat(val);

            // remove comma - this only works for locales that use comma for thousands
            val = val.constructor === Array ? val.toString() : val.toString().replace(/,(\d{3})/g, '$1');
            if ($.isNumeric(val))
                return parseFloat(val);

            if (val.toLowerCase() == "true")
                return true;

            if (val.toLowerCase() == "false")
                return false;

            return val;
        };

        $scope.load = function (mid) {
            formRoot = $('#dnn' + mid + 'root');
            var res = dnnsf['af-' + mid];
            if (res.Data.error) {
                alert('Error: ' + res.Data.error);
                return;
            }

            // todo: handle errors
            $scope.form = res.Data;
            $scope.settings = afSettings.settings = res.Settings;
            $scope.$$ = $; // just a hack to bypass angular

            $scope.form.dirty = function () {
                return formRoot.find('.ng-dirty').length > 0;
            }

            //closing the dropdown(multiple choice - dropdown with checkboxes) when clicking outside the container
            $(document).mouseup(function (e) {
                var container = $(".field-container.checkbox-list .panel.panel-default");
                if (!container.is(e.target)
                    && container.has(e.target).length === 0) {
                    $.each($scope.form.fields, function (i, field) {
                        if (field.show) {
                            setTimeout(function () {
                                field.show = false;
                                $scope.$apply();
                            }, 0);
                        }
                    });
                }
            });

            $.each(res.Settings.Fields, function (i, f) {
                res.Settings.Fields[f.TitleCompacted] = f;
            });

            $.each($scope.form.fields, function (k, field) {

                // try to cast type to numbers, otherwise they won't fit in the HTML number field
                //if ($.isNumeric(o.value))
                //    o.value = parseFloat(o.value);

                if (field.onChange) {
                    // bind onChange, handle false to remove form-button class which will prevent postback - a bit of a hackish solution until we migrate everything to angular
                    field.onChange = eval(
                        '( function(form, item) { ' +
                        '   try { ' +
                        '       var scope = $scope = angular.element(\'#' + res.Data.baseId + 'root\').scope(); ' +
                        '       var refresh = function() { if (!scope.$$phase) scope.$apply(); }; ' +
                        '       var r = (function() { \n' + field.onChange + '\n }).call($(\'#' + field.id + '\')); ' +
                        '       if($(\'#' + field.id + '\')[0]){ ' +
                        '       $(\'#' + field.id + '\')[0].preventSubmit = false;' +
                        '       if (r === false) { ' +
                        '           $(\'#' + field.id + '\')[0].preventSubmit = true; return false; ' +
                        '       }} ' +
                        '   } catch (e) { console.error(\'Error running Action Form on change script\', e); }' +
                        '})');
                }

                if (field.options) {
                    // this is a dropdown, initialize ddValue and tbValue
                    field.ddValue = field.tbValue = field.value;

                    // add a getValue function on dropdowns, which will be used by validators to get the proper value for validation
                    if (_.find(['closed-multiple-dropdown', 'closed-multiple-checkbox', 'dropdown-checkboxes'],
                        function (type) { return field.type == type; })
                    ) {
                        field.getValue = function (value) {
                            return value.indexOf('/') === 0 ? value.substring(1) : value;
                        }
                    }

                    if (field.type == 'closed-multiple-checkbox' || field.type == 'dropdown-checkboxes') {
                        var selItems = field.value;
                        $.each(field.options, function (k, oItem) {
                            oItem.selected = $.inArray(oItem.value, selItems) != -1;
                        });
                    } else {
                        for (var i = 0; i < field.options.length; i++)
                            if (field.options[i].value == field.value) {
                                field.selected = field.options[i]; break;
                            }
                    }

                    // if it has "other" option and value doesn't exist in dropdown, switch dd to other
                    var other = $.grep(field.options, function (oOpt, iOpt) { return oOpt.filter == 'other'; });
                    other = other.length ? other[0] : null;

                    if (other && field.value && $.grep(field.options, function (oOpt, iOpt) { return oOpt.value == field.value; }).length == 0) {
                        field.ddValue = other.value;
                        field.otherValue = field.value;
                        field.selected = _.filter(field.options, function (o) { return o.filter == "other"; })[0];
                    }

                    if (field.type == 'address-region') {

                        $scope.setRegionFieldValue = function (source) { // source: 'dropdown' | 'textbox' | 'other'
                            switch (source) {
                                case 'dropdown': {
                                    if (field.ddValue !== 'Other') {
                                        field.tbValue = field.otherValue = '';
                                        field.value = field.ddValue;
                                        field.showOtherTextbox = false;

                                        if (field.value && field.countryField) {
                                            var selectedRegion = _.find($scope.countries[field.countryField].regions, function (obj) {
                                                return obj.value == field.value;
                                            });
                                            field.viewValue = selectedRegion ? selectedRegion.text : field.value;
                                        }
                                    } else {
                                        field.value = '';
                                        field.showOtherTextbox = true;
                                        field.otherValue = field.value;
                                    }
                                    break;
                                }
                                case 'textbox': {
                                    field.ddValue = field.otherValue = '';
                                    field.value = field.tbValue;
                                    break;
                                }
                                case 'other': {
                                    field.ddValue = 'Other';
                                    field.value = field.otherValue;
                                    field.showOtherTextbox = true;
                                    break;
                                }
                            }
                        }

                    }
                    // if it's a checkbox list, this is also needed
                    if (field.type == 'closed-multiple-checkbox' || field.type == 'dropdown-checkboxes') {
                        $scope.concatValues(field);
                        // also, watch for changes

                        $scope.$watch('form.fields.' + field.name + '.value', function () {
                            var selItems = field.value;
                            $.each(field.options, function (k, oItem) {
                                oItem.selected = $.inArray(oItem.value, selItems) != -1;
                            });
                        }, true);

                        field.checkAll = function () {
                            $.each(field.options, function (k, oItem) {
                                if (field.visible !== false)
                                    oItem.selected = true;
                            });
                            setTimeout(function () {
                                field.onChange && field.onChange($scope.form, field);
                                $("[name='" + field.id + "']").valid();
                            }, 0)
                        };

                        field.uncheckAll = function () {
                            $.each(field.options, function (k, oItem) {
                                if (field.visible !== false)
                                    oItem.selected = false;
                            });
                            setTimeout(function () {
                                field.onChange && field.onChange($scope.form, field);
                                $("[name='" + field.id + "']").valid();
                            }, 0)
                        };
                    } else {
                        $scope.$watch('form.fields.' + field.name + '.value', function (newValue, oldValue) {
                            // this allows setting the value of dropdown directly in the model
                            // but watch out if we have multiple entries with same value filtered away
                            newValue !== oldValue && setDropdownSelected(field, newValue);
                        });
                    }

                    if (field.linkedTo) {
                        if (!_.find(field.options, function (option) { return field.tbValue.constructor === Array ? $.inArray(option.value, field.tbValue) != -1 : option.value == field.tbValue })) {
                            field.value = '';
                        }

                        $.each($.map(field.linkedTo.split(','), function (x) { return x.trim() }), function (i, linkedField) {
                            $scope.$watch('form.fields.' + linkedField + '.value', function (newValue, oldValue) {

                                if (typeof newValue != 'undefined' && !angular.equals(newValue, oldValue)) {
                                    console.log($scope.form.fields[linkedField]);
                                    $scope.getFieldData(field);
                                }

                            });
                            $scope.$watch('form.fields.' + linkedField + '.options', function (newValue, oldValue) {

                                if (typeof newValue != 'undefined' && $scope.form.fields[linkedField].linkedTo) {
                                    $scope.getFieldData(field);
                                }

                            }, true);
                        });
                    }

                    // also group options by filters for easy iteration
                    if (field.options.length) {

                        // this is used by the permission grid
                        field.optionsFilters = []; // the object below loses order, so we're going to use this one for iterations
                        $.each(field.options, function (ii, oo) {
                            if ($.inArray(oo.filter, field.optionsFilters) == -1)
                                field.optionsFilters.push(oo.filter);
                        });

                        field.optionsNames = [];// the object below loses order, so we're going to use this one for iterations
                        field.optionsByName = {};
                        $.each(field.options, function (ii, oo) {
                            if (!field.optionsByName[oo.text]) {
                                field.optionsNames.push(oo.text);
                                field.optionsByName[oo.text] = [];
                            }
                            field.optionsByName[oo.text].push(oo);
                        });
                    }

                }
            });

            // done intializing fields, call on load handler if any
            if ($scope.form.onLoad) {
                eval('( function(form) { var $scope = scope = this; try { ' + $scope.form.onLoad + '; } catch (e) { console.log(\'Error running Action Form on load script\', e); } } )')
                    .call($scope, $scope.form);
            }

            if ($scope.form.SaveInCookie) {
                var saveInCookiesTimer;
                function saveInCookies() {
                    $timeout.cancel(saveInCookiesTimer);
                    saveInCookiesTimer = $timeout(function () {

                        var saveData = getFormData($element.closest('.form-root'));
                        dnnsfHttp($scope.settings.ModuleId, {
                            method: 'POST',
                            url: $scope.form.submitUrl + "&event=autosave&submission=" + ($scope.form.submissionKey || ''),
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            data: $.param(saveData)
                        }).success(function (data, status) {
                            $cookieStore.put($scope.form.SaveInCookie, data.submissionKey, { path: '/', expires: 365 });
                        });

                    }, 500);
                }

                $scope.$watch('form.fields', saveInCookies, true);
            }
            $scope.showLoader = false;
            formRoot.find('.c-form.hidden').removeClass('hidden');

            dnnsf.events.emit('formLoaded');

        };

        function setDropdownSelected(field, val) {
            for (var i = 0; i < field.options.length; i++)
                if (field.options[i].value == val) {
                    field.selected = field.options[i];
                    break;
                }
        }

        $scope.refreshCaptcha = function (mid, fieldName) {
            var field = $scope.form.fields[fieldName];

            var svcFramework = dnnsfjQuery.ServicesFramework(mid);
            var apiUrl = svcFramework.getServiceRoot("DnnSharp/ActionForm");

            dnnsfHttp($scope.settings.ModuleId, {
                method: 'GET',
                url: apiUrl + 'RefreshField/Captcha?_portalId= ' + dnnsf.portalId +
                    '&tabId=' + dnnsf.tabId +
                    '&_alias=' + dnnsf.alias +
                    '&_mid=' + mid +
                    '&language=' + dnnsf.locale +
                    '&fieldId=' + field.fieldId +
                    '&fieldName=' + fieldName,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                $timeout(function () {
                    $scope.form.fields[fieldName].value = response.data.CaptchaEncrypted;
                    $('#dnn' + mid + fieldName + 'captchaenc').val(response.data.CaptchaEncrypted);
                    $('#dnn' + mid + 'root').find("img[data-fieldid=" + field.fieldId + "]").attr('src', response.data.ImageUrl);
                });
            });
        }

        $scope.getFieldData = function (field) {
            $timeout(function () {
                // get list from server
                var saveData = getFormData($element.closest('.form-root'));
                field.$_loading = true;

                dnnsfHttp($scope.settings.ModuleId, {
                    method: 'POST',
                    url: $scope.form.getItemsUrl + "&fieldId=" + $scope.form.fields[field.name].fieldId + '&fieldName=' + field.name,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: $.param(saveData)
                }).then(function (result) {
                    var data = result.data;
                    $('#' + field.id).closest('.field-container')
                        .removeClass('has-error')
                        .find('span.text-danger')
                        .html('');
                    if (data.error) {
                        data.validationErrors = [{ 'fieldId': field.name, 'message': data.error }];
                        delete data.error;
                        parseFormResponse2(formRoot, null, data);
                        field.$_loading = false;
                        field.options = [];
                        field.value = '';
                        return;
                    }
                    field.options = data;
                    var found = false;
                    for (var i = 0; i < field.options.length; i++)
                        if (field.tbValue.constructor === Array ? $.inArray(field.options[i].value, field.tbValue) != -1 : field.options[i].value == field.tbValue) {
                            field.selected = field.options[i];
                            if (field.tbValue.constructor === Array) {
                                $.each(field.tbValue, function (i, v) {
                                    $.each(field.options, function (j, k) {
                                        k.value == v && (field.options[j].selected = true);
                                        found = true;
                                    });
                                });
                            } else {
                                _.forEach(field.options, function (option, index) {
                                    if (option.value === field.tbValue) {
                                        option.selected = true;
                                        found = true;
                                        return false;
                                    }
                                });
                            }
                            field.value = field.tbValue; //need it to get 
                            break;
                        }
                    if (!found)
                        field.value = '';
                    $scope.concatValues(field);
                    field.$_loading = false;
                });
            });
        };

        $scope.concatValues = function (ctl) {
            if (!ctl.options)
                return;
            var vals = [];
            var texts = [];
            $.each(ctl.options, function (k, o) {
                if (o.selected && o.visible !== false) {
                    vals.push(o.value);
                    texts.push(o.text);
                }
            });
            ctl.value = vals;
            if (ctl.selectedItemsText)
                texts.length == 0
                    ?
                    ctl.text = localization.dropdownNoSelection
                    :
                    ctl.text = localization.dropdownSelectedBefore + ' ' + texts.length + ' ' + localization.dropdownSelectedAfter;
            else
                texts.length == 0 ? ctl.text = localization.dropdownNoSelection : ctl.text = texts.join(',');
        };

        // holds a list of region fields bound to each country
        $scope.countries = {};

        $scope.wireRegion = function (regionField, countryField) {
            if (!$scope.countries[countryField])
                $scope.countries[countryField] = { regionFields: [] };
            $scope.countries[countryField].regionFields.push(regionField);

            $scope.loadRegions(regionField, countryField, function () {
                // select current region by code or by name
                var field = $scope.form.fields[regionField];
                var regions = $scope.countries[countryField].regions;

                if (regions.length) {

                    for (var i = 0; i < regions.length; i++)
                        if (regions[i].value == field.value) {
                            $scope.form.fields[regionField].ddValue = regions[i].value;
                            return;
                        }
                    // check by text
                    for (var i = 0; i < regions.length; i++)
                        if (regions[i].text == field.value) {
                            $scope.form.fields[regionField].ddValue = regions[i].value;
                            return;
                        }
                    if (field.otherTextbox && $scope.initCountry) {
                        $scope.initCountry = false;
                        var isValueInOptions = $.grep(field.options, function (option, iOpt) { return option.value == field.value; }).length > 0;
                        if (!isValueInOptions && field.value) {
                            field.ddValue = 'Other';
                            field.otherValue = field.value;
                            field.showOtherTextbox = true;
                            return;
                        }
                    }
                    $scope.setRegionFieldValue('dropdown');
                }
            });
        };

        $scope.loadRegions = function (regionField, countryField, fnDone) {
            dnnsf.log('loadRegions', countryField, $scope.countries[countryField], $scope.form.fields[countryField]);

            $scope.$watch('form.fields.' + countryField, function () {
                if (!$scope.countries[countryField] || !$scope.form.fields[countryField])
                    return;

                $scope.countries[countryField].loading = true;

                var field = $scope.form.fields[regionField];
                var data = {};
                data[countryField] = $scope.form.fields[countryField].value;

                dnnsfHttp($scope.settings.ModuleId, {
                    method: 'POST',
                    url: $scope.form.getItemsUrl + "&fieldId=" + field.fieldId + '&fieldName=' + field.name,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data: $.param(data)
                }).then(function (result) {
                    $scope.countries[countryField].loading = false;
                    $scope.countries[countryField].regions = result.data;
                    if ($scope.countries[countryField].regions.length) {
                        // reset all textboxes values
                        $.each($scope.countries[countryField].regionFields, function (i, regionField) {
                            $scope.form.fields[regionField].countryField = countryField;
                            if ($scope.form.fields[regionField]) {
                                $scope.form.fields[regionField].ddValue = "";
                                $scope.form.fields[regionField].tbValue = "";
                                $scope.form.fields[regionField].otherValue = "";
                            }
                        });
                    } else {
                        // reset all dropdown values
                        $.each($scope.countries[countryField].regionFields, function (i, regionField) {
                            if ($scope.form.fields[regionField]) {
                                $scope.form.fields[regionField].ddValue = "";
                                $scope.form.fields[regionField].tbValue = "";
                                $scope.form.fields[regionField].otherValue = "";
                            }
                        });
                    }

                    fnDone && fnDone();
                });
            }, true);

        };

        $scope.showSelected = function (node, selected, name) {
            if (selected) {
                $scope.form.fields[name].value = node.value;
                $scope.form.fields[name].text = node.text;
            } else {
                $scope.form.fields[name].value = "";
                $scope.form.fields[name].text = "";
            }
        }

        $scope.closeDropdown = function (e, name) {
            $scope.form.fields[name].showdrop = false;
            $scope.$apply();
        }

        $scope.uptStarRating = function (value, name) {
            $scope.form.fields[name].value = value;
        }

        $scope.updateField = function (field, val) { //used for dropdown with autocomplete and sortable-input
            $scope.form.fields[field].value = val;
            if ($scope.form.fields[field].options && $scope.form.fields[field].options.length) {
                setDropdownSelected($scope.form.fields[field], val);
            }
            $scope.form.fields[field].onChange && $scope.form.fields[field].onChange($scope.form, field);
        }
    }
    ActionFormCtrl.$inject = ['$scope', '$http', '$timeout', '$sce', '$cookieStore', '$element', 'dataSources', 'dnnsf', 'afSettings', 'dnnsfHttp'];

    var initForm = function (options, fnDone) {
        var formRoot;
        var svcFramework = dnnsfjQuery.ServicesFramework(options.moduleId);
        options.apiUrl = svcFramework.getServiceRoot("DnnSharp/ActionForm");

        options.adminApiUrl = options.virtualDirectory + "/DesktopModules/DnnSharp/ActionForm/AdminApi.ashx";

        if (options) {
            dnnsf.portalId = options.portalId;
        }
        //openMode: Always, Page, Popup, Inline, Manual
        var $ = dnnsfjQuery;
        var queryString = $.extend({},
            dnnsf.getUrlParts(location.search).query,
            dnnsf['af-' + options.moduleId] && !$.isEmptyObject(dnnsf['af-' + options.moduleId].passQs) && dnnsf['af-' + options.moduleId].passQs,
            options.qs && !$.isEmptyObject(options.qs) && options.qs);
        dnnsf['af-' + options.moduleId] = { options: options };
        $('#' + options.rootElementClientId).addClass(options.cssName);
        $('#' + options.rootElementClientId).attr({ 'af-name': options.popupSettings.name, 'data-moduleid': options.moduleId }); //for openPopupByName()
        if (options.openMode != "Always" && !options.manualMode) {
            return function () {
                window['showFormPopup' + options.moduleId] = function () {
                    dnnsf.api.actionForm.openPopupById(options.moduleId);
                };
                window['hideFormPopup' + options.moduleId] = function () {
                    $('#dnn' + options.moduleId + 'popup').modal('hide')
                }
                window['showFormInline' + options.moduleId] = function () {
                    dnnsf.api.actionForm.initForm(options.moduleId);
                    showFormInline(options.moduleId, options.rootElementClientId);
                }
                window['hideFormInline' + options.moduleId] = function () {
                    hideFormInline(options.moduleId, options.rootElementClientId);
                }
                if (!options.manualMode && options.openMode != "Always" && options.openMode != "Manual")
                    $('#' + options.rootElementClientId).html($('<div class="frontEndTemplate"></div>').html(options.frontEndTemplate));
            }()
        } else {
            setTimeout(function () {
                options.showLoading && $('#' + options.rootElementClientId + ' > .common-loading-container').show();
                options.tabsProLoading && $('#' + options.rootElementClientId).closest('.tab-pane').hasClass('active') && dnnsf.events.broadcast('loadForm', { 'loading': true, moduleId: options.moduleId });
                dnnsf.initStickyLoading(options.rootElementClientId);
            }, 0);

            (!options.manualMode && options.openMode != "Always") &&
                $('#' + options.rootElementClientId).html($('<div class="frontEndTemplate"></div>').html(options.frontEndTemplate));
        }
        // ^^backward compatibility for showFormPopup, hideFormPopup, showFormInline, hideFormInline functions^^
        // getSettings
        $.extend(queryString, {
            '_portalId': options.portalId,
            'referrer': document.referrer,
            'openMode': options.openMode === "Manual" ? options.manualMode : options.openMode,
            '_tabId': options.tabId,
            '_alias': options.alias,
            '_mid': options.moduleId,
            '_url': document.URL
        });

        $.ajax({
            headers: {
                "DNNSF-Time-Offset": timeZoneOffset,
                "RequestVerificationToken": svcFramework.getAntiForgeryValue()
            },
            url: options.apiUrl + '/settings/initializeForm?' + $.param(queryString) + (options.dnnPageQuery ? '&' + options.dnnPageQuery : ''),
            type: "post",
            data: options.requestForm,
            async: true,
            success: function (res) {
                if (!res.Html) {
                    dnnsf.api.actionForm.hideFormLoading(options.moduleId);
                }
                $('#' + options.rootElementClientId).find('.af-alert').remove();
                options.hasErrors = false;
                if (res.ResultType == "ActionResult") {
                    options.manualMode == "Popup" && (dnnsf.api.actionForm.isFormPopupOpen['formPopup' + options.moduleId] = false); // the popup will not be opened because of the error/message
                    parseFormResponse(res.ActionResult, {
                        error: function (err) {
                            options.hasErrors = true;
                            var pnlMessage = $('<div class="af-alert alert alert-danger"></div>').html(res.ActionResult.Error);
                            $('#' + options.rootElementClientId).html($('<div class="frontEndTemplate"></div>').append(pnlMessage));
                        }
                    });
                }
                res.Settings.apiUrl = options.apiUrl;
                res.Settings.timeZoneOffset = timeZoneOffset;
                dnnsf['af-' + options.moduleId] = $.extend(dnnsf['af-' + options.moduleId], res);
                if (!$.isEmptyObject(res.ActionResult) && res.ActionResult.Content) {
                    formRoot = $(res.ActionResult.Content);
                    var pnlMessage = $('<div class="af-alert alert alert-info"></div>').append(formRoot);
                    $('#' + options.rootElementClientId).append(pnlMessage);
                } else {
                    $('#' + options.rootElementClientId).find('#dnn' + options.moduleId + 'root').length ?
                        $('#dnn' + options.moduleId + 'root').replaceWith(res.Html) :
                        $('#' + options.rootElementClientId).append($.parseHTML(res.Html));
                    dnnsf.loadJsFromHtml(res.Html);
                    formRoot = $('#dnn' + options.moduleId + 'root');
                }
                initFormController();
                fnDone && fnDone();
            },
            error: function (err) {
                console.error(this.url, err)
                options.hasErrors = true;
                var pnlMessage = $('<div class="af-alert alert alert-info"></div>').html(err.responseText);
                $('#' + options.rootElementClientId).html($('<div class="frontEndTemplate"></div>').append(pnlMessage));
            }
        });

        function initFormController() {

            if (options.hasErrors) return;
            if (!formRoot.length || formRoot[0].initialized)
                return;

            formRoot[0].onFormSubmit = formRoot[0].onFormSubmit || [];
            formRoot[0].initialized = true;

            // init common features
            dnnsf.init($, options);
            dnnsf.localization = localization = dnnsf['af-' + options.moduleId].Localization;
            // call localization inside fileupload-validate
            dnnsf.useLocalization && dnnsf.useLocalization();

            var app = angular.module('ActionForm' + formRoot.attr('id'), ['ngAnimate', 'siyfion.sfTypeahead', 'bootstrap-tagsinput', 'ngSanitize', 'dnnsf', 'afControls', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'angucomplete', 'treeControl', 'ngstars', 'loadOnDemand']);
            var dynamicDependencies = ['ui.bootstrap.contextMenu', 'cp.ngConfirm'] //will be added if the js is loaded from input config
            $.each(dynamicDependencies, function (i, dep) {
                try {
                    if (angular.module(dep))
                        app.requires.push(dep);
                } catch (e) { }
            });
            app.run(["$http", function ($http) {
                $http.defaults.headers.common["DNNSF-Time-Offset"] = timeZoneOffset;
            }]);
            app.controller('ActionFormCtrl', ActionFormCtrl);

            app.directive('hasRepeaters', [function () {
                return {
                    restrict: 'A',
                    priority: Number.MIN_SAFE_INTEGER,
                    scope: false,
                    link: function (scope) {
                        setTimeout(function () {
                            if (!scope.$root.repeaters) {
                                options.showLoading && $('#' + options.rootElementClientId + ' > .common-loading-container').hide();
                                options.tabsProLoading && dnnsf.events.broadcast('loadForm', { 'loading': false, moduleId: scope.settings.ModuleId });
                            }
                        }, 0)
                    }
                }
            }]);

            app.directive('addCustomAttributes', [function () {
                return {
                    restrict: 'A',
                    scope: false,
                    link: function (scope, element, attrs) {
                        if (scope.settings.Fields[attrs.afField]) {
                            var customAttributesList = scope.settings.Fields[attrs.afField].CustomAttributes;
                            customAttributesList.forEach(function (attribute) {
                                element.attr(attribute.name, attribute.value);
                            });
                        }
                    }
                }
            }]);

            app.directive('floatingLabel', ['$timeout', function ($timeout) {
                return {
                    restrict: 'A',
                    // this directive works only with scope:false
                    scope: false,
                    link: function (scope, element) {
                        if (!scope.floatLabels) {
                            scope.floatLabels = {};
                        }

                        if (!scope.floatLabels[element.attr('id')]) {
                            scope.floatLabels[element.attr('id')] = new FloatLabels(element.closest('.form-group')[0]);
                        } else {
                            scope.floatLabels[element.attr('id')].rebuild();
                        }
                    }
                }
            }]);

            app.directive('repeatDone', [function () {
                return {
                    restrict: 'AE',
                    scope: false,
                    link: {
                        pre: function (scope, element, attrs) {
                            scope.$root.repeaters = true;
                        },
                        post: function (scope, element, attrs) {
                            setTimeout(function () {
                                if (scope.$last) { // all are rendered
                                    options.showLoading && $('#' + options.rootElementClientId + ' > .common-loading-container').hide();
                                    options.tabsProLoading && dnnsf.events.broadcast('loadForm', { 'loading': false, moduleId: scope.settings.ModuleId });
                                }
                            }, 0);
                        }
                    }
                }
            }]);

            app.directive('maxSelection', [function () {
                return {
                    restrict: 'AE',
                    scope: {
                        value: '=',
                        maxSelection: '=',
                        ngModel: '='
                    },
                    link: {
                        post: function (scope, element, attrs) {
                            scope.$watch('value', function (newValue, oldValue) {
                                if ((newValue !== oldValue && newValue.length === scope.maxSelection) || scope.maxSelection <= 0) {
                                    element.attr('disabled', !scope.ngModel);
                                } else {
                                    element.attr('disabled', false);
                                }
                            });
                        }
                    }
                }
            }]);

            app.factory('dataSources', ['$http', 'dnnsf', function ($http, dnnsf) {
                return {
                    get: function (settings, fnReady) {
                        var p = $.extend({}, settings, { Method: 'GetData', tabId: options.tabId, mid: options.moduleId, alias: options.alias });
                        $http({
                            method: 'GET',
                            url: options.adminApiUrl + '?' + $.param(p),
                            cache: true
                        }).success(function (data, status) {
                            fnReady && fnReady(data);
                        });
                    }
                };
            }]);


            // the default cookieStore does not support path or expiration
            app.provider('$cookieStore', [function () {
                var self = this;
                self.defaultOptions = {};

                self.setDefaultOptions = function (options) {
                    self.defaultOptions = options;
                };

                self.$get = function () {
                    return {
                        get: function (name) {
                            var jsonCookie = $.cookie(name);
                            if (jsonCookie) {
                                return angular.fromJson(jsonCookie);
                            }
                        },
                        put: function (name, value, options) {
                            options = $.extend({}, self.defaultOptions, options);
                            $.cookie(name, angular.toJson(value), options);
                        },
                        remove: function (name, options) {
                            options = $.extend({}, self.defaultOptions, options);
                            $.removeCookie(name, options);
                        }
                    };
                };
            }]);

            app.directive('dropdownWatch', ['$interval', function ($interval) { // resize "dropdown with checkboxes" based on content width and height
                return {
                    restrict: 'A',
                    scope: {
                        dropdownName: '=',
                        disableCheckboxes: '@'
                    },
                    controller: ['$scope', '$element', function ($scope, $element) {
                        $scope.dropdownName.show = false;
                        var dropdownPanel = $element.parent().parent().next().children('.panel');
                        var disabled = $element[0].disabled;

                        if (disabled && $scope.disableCheckboxes === "True") {
                            $element.prop("disabled", false);
                        }
                        $scope.$watch("dropdownName.show", function (newVal, oldVal) {
                            if (!newVal)
                                return;
                            if (disabled && $scope.disableCheckboxes === "True") {
                                dropdownPanel.find('a')
                                    .parent().addClass("dnnsf-disabled-checkboxes");//  disable 'select all' and 'clear all'

                                dropdownPanel.find('.normalCheckBox').each(function () {
                                    $(this).prop("disabled", true).addClass("disabled")
                                        .parent().addClass("not-allowed");
                                });
                            }

                            var dropdownOpen = $interval(function () {
                                if (dropdownPanel.width() > 0) {
                                    resizeDropdown(dropdownPanel, $scope.dropdownName);
                                    $interval.cancel(dropdownOpen);
                                }
                            }, 50); //interval
                        });

                        function resizeDropdown(dropdownPanel, dropdownName) {
                            if (dropdownPanel.attr('data-window-width') == $(window).width())
                                return;
                            if (dropdownName.show) {
                                dropdownPanel.css('opacity', '0');
                                if (dropdownPanel.attr('data-window-width')) {
                                    dropdownPanel.width(dropdownPanel.width() - 15); // this eliminates endless adding of padding when you resize the window
                                    dropdownPanel.attr('style', '');
                                }
                                dropdownPanel.css('display', 'table');
                                var inputWidth = dropdownPanel.parent().prev().children().first().width();
                                var contentWidth = dropdownPanel.width() + 15; // magic number for padding
                                var rect = dropdownPanel[0].getBoundingClientRect();
                                var windowWidth = $(window).width();

                                dropdownPanel.attr('data-window-width', windowWidth);
                                dropdownPanel.css('display', 'inline-block'); // i took the width from display:table 
                                // and make it inline-block with that width
                                if (inputWidth > contentWidth) { // if the input is bigger than the dropdown panel make the panel input-sized
                                    dropdownPanel.width(inputWidth);
                                    dropdownPanel.parent().width(inputWidth);
                                    dropdownPanel.css('opacity', '1');
                                }
                                else {
                                    if (rect.right > windowWidth) { // if the dropdown is bigger than the window
                                        contentWidth = contentWidth - (rect.right - windowWidth) - 15; // magic number for padding
                                        dropdownPanel.css('overflow-x', 'scroll');
                                    }
                                    dropdownPanel.width(contentWidth);
                                    dropdownPanel.parent().width(contentWidth);
                                    dropdownPanel.css('opacity', '1');
                                }
                            }// show
                        }; //resize
                    }] //controller
                }; //directive return
            }]); //directive

            app.directive('maxNumber', [function () {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModel) {
                        if (typeof parseFloat(attrs.maxNumber) == 'number') {
                            scope.$watch(attrs.ngModel, function (newVal, oldVal) {
                                if (newVal > parseFloat(attrs.maxNumber)) {
                                    ngModel.$setViewValue(parseFloat(attrs.maxNumber));
                                    ngModel.$render();
                                    $(element).closest('.form-group').addClass('has-error');
                                    setTimeout(function () {
                                        $(element).closest('.form-group').removeClass('has-error');
                                    }, 1000);
                                }
                            })
                        }
                    }
                }
            }]);
            // wrapper for masked input
            app.directive('inputMask', function () {
                return {
                    restrict: 'A',
                    link: function (scope, el, attrs) {
                        delete $.jMaskGlobals.translation['#'];
                        var label = attrs.placeholder || "";
                        var mask = attrs.inputMask.replace(/[0-9a-zA-Z]/g, '_');
                        var maskOptionsObject = {
                            translation: {
                                '9': {
                                    pattern: /\d/, optional: true
                                },
                                'a': {
                                    pattern: /[a-zA-Z]/
                                },
                                '*': {
                                    pattern: /[0-9a-zA-Z]/
                                }
                            },
                            placeholder: label || mask
                        };

                        var parsedMaskOptions;

                        if (attrs.maskOptions) {
                            try {
                                parsedMaskOptions = JSON.parse(attrs.maskOptions);
                            } catch (error) {
                                console.error("Couldn't parse JSON in " + attrs.afFieldTitle + " Mask Options")
                            }
                        } else {
                            parsedMaskOptions = {}
                        }

                        $(el).mask(attrs.inputMask, $.extend(maskOptionsObject, parsedMaskOptions));

                        el.on('focus', function () {
                            el.attr('placeholder', mask);
                        })
                        el.on('keyup blur', function () {
                            label && el.attr('placeholder', label);
                            el.trigger('change');
                        });
                        if (scope.form.fields[attrs.afField].value) {
                            setTimeout(function () {
                                el.trigger('input');
                            }, 0);
                        }
                    }
                };
            });

            // wrapper for masked input
            app.directive('onblur', function () {
                return {
                    restrict: 'A',
                    scope: {
                        onblur: '&'
                    },
                    link: function (scope, el, attrs) {
                        $(el).parents('.element-area:first').click(function (e) {
                            e.stopPropagation();
                        });
                        $(document).click(function () {
                            scope.onblur();
                            scope.$apply();
                        });
                    }
                };
            });

            // DOM wathcher
            app.directive('domWatch', function () {
                return {
                    restrict: 'A',
                    link: function (scope, el, attrs) {

                        $(el).on(attrs.domWatch, function () {
                            scope.$eval(attrs.ngModel + "='" + el.val() + "'");
                            scope.$apply();
                        });
                    }
                };
            });

            // this directive knows to bind a value to a html control, but only when this value exists
            app.directive('afBindvalue', ['$compile', '$timeout', '$parse', function ($compile, $timeout, $parse) {
                return {
                    restrict: 'A',
                    scope: false,
                    require: 'ngModel',
                    link: function (scope, element, attrs, ngModel) {

                        var options = null;
                        if (attrs.afBindfrom)
                            options = scope.$eval(attrs.afBindfrom);

                        // if it's not an input element, define a new render function
                        if (element.filter(':input').length == 0) {
                            ngModel.$render = function () {
                                if (ngModel.$viewValue === undefined || ngModel.$viewValue === null)
                                    return;
                                if (!element.hasClass('model-only'))
                                    element.html(ngModel.$viewValue);
                            };
                        }

                        scope.$watch(attrs.afBindvalue, function (value) {

                            if (!scope.form.fields || !scope.form.fields[attrs.afField])
                                return;

                            var field = scope.form.fields[attrs.afField];
                            if (field.touched)
                                return;

                            if (attrs.afBindfrom) {
                                var options = scope.$eval(attrs.afBindfrom);
                                if (!options)
                                    return;
                                var optionsFound = $.grep(options, function (o) { return o.value === value });
                                if (optionsFound.length > 0) {
                                    ngModel.$setViewValue(optionsFound[0]);
                                };
                            }
                            else {
                                ngModel.$setViewValue(value);
                            }
                            ngModel.$render();
                        });
                    }
                };
            }]);

            // initialize rich edits
            app.directive('afRichedit', ['$compile', '$timeout', '$parse', function ($compile, $timeout, $parse) {
                return {
                    require: 'ngModel',
                    link: function (scope, elm, attrs, ngModel) {
                        var fnInitRichEdit = function () {

                            if (!$(elm).is(':visible')) {
                                $timeout(fnInitRichEdit, 200);
                                return;
                            }

                            $(elm).wysiwyg({
                                autoGrow: false,
                                maxHeight: 600,
                                initialMinHeight: 50,
                                initialContent: '',
                                brIE: false,
                                replaceDivWithP: true,
                                events: {
                                    save: function () {
                                        try {
                                            ngModel.$setViewValue(this.getContent());
                                        } catch (e) {
                                        }
                                    }
                                }
                            });

                            // localize wysiwyg
                            $('.wysiwyg [role="menuitem"]').each(function () {
                                var l = localization['wysiwyg.' + $(this).attr('class')];
                                l && $(this).attr('title', l);
                            });


                            ngModel.$render = function () {
                                $(elm).wysiwyg('setContent', ngModel.$viewValue || '');
                            };
                            $(elm).width('100%');
                        };

                        $timeout(fnInitRichEdit, 100);

                    }
                };
            }]);

            // dnnsfAngularLock is just a quick hack to skip angualr initialization in some situations
            !window.dnnsfAngularLock && angular.bootstrap(formRoot, ['ActionForm' + formRoot.attr('id')]);
            var $_scope = angular.element(formRoot).scope();
            //formRoot[0].onFormSubmit = $_scope._registerToEvent['submit'];

            // --------------------------------------------------------------------------------------------------------------------------------
            // Start jquery plugin e
            $.fn.popover && formRoot.find('span.popupOnHover').popover({ trigger: 'hover' });

            function findErrorElement(sourceElement, errorElementClass) {
                var errorElement = sourceElement.find(errorElementClass);

                if (!errorElement.length)
                    errorElement = sourceElement.closest('.field-container').find(errorElementClass);

                if (!errorElement.length) {
                    errorElement = sourceElement.closest('.field-container').siblings(errorElementClass);
                }

                return errorElement;
            }

            // setup validation plugin
            var validationSettings = {
                errorElement: 'span',
                errorClass: 'text-danger',
                highlight: function (element, errorClass) {
                    $(element).parents('.field-container:first').addClass('has-error');
                },
                unhighlight: function (element, errorClass) {
                    if ($(element).hasClass('ignore')) {
                        return;
                    }
                    $(element).removeAttr('aria-describedby');

                    var fieldsGroup = element.attributes['class'] ? element.attributes['class'].value.match(/(group\d+-AtLeastOneIsFilled)/) : '',
                        AtLeastOneIsFilled = fieldsGroup ? $(element).closest('.form-root').find('.form-group .' + fieldsGroup[0] + ':not(.required)') : '';
                    if (AtLeastOneIsFilled.length && !$(element).hasClass('required')) {
                        $.each(AtLeastOneIsFilled, function (index, input) {
                            if (input.type != 'checkbox' && input.type != 'radio') {
                                $(input).parent().removeClass('has-error');
                            } else {
                                $(input).closest('.form-group div.has-error').removeClass('has-error');
                            }
                        });
                        $(element).next('.text-danger').hide();
                    }
                    else { $(element).parents('.field-container:first').removeClass('has-error').find('.text-danger').hide(); }
                },
                errorPlacement: function (error, element) {
                    // accessibility
                    var elementId = element.attr('id') || element.closest('.field-container').find('[data-ng-model]').attr('id')// file-upload;
                    error.attr({ 'id': 'error-' + elementId, 'role': 'alert' });
                    element.attr('aria-describedby', 'error-' + elementId);
                    if (element.hasClass('multiple-choice-checkbox')) {
                        var parentElement = element.closest('.checkbox-list');
                        error.attr('id', 'error-' + parentElement.attr('id'));
                        element.attr('aria-describedby', 'error-' + parentElement.attr('id'));
                    }
                    // end accessibility

                    var errPlace = findErrorElement(element, '.err-placeholder');
                    if (errPlace.length) {
                        if (errPlace.find('span.text-danger').text() != error.text())
                            errPlace.append(error);
                    } else {
                        if (element.is(':checkbox') || element.is(':radio')) {
                            element.parent().append(error);
                        } else {
                            element.next().is('.text-danger') ? element.next().replaceWith(error) : error.insertAfter(element.filter(function () {
                                return !element.closest('.field-container').hasClass('ng-hide')
                            }));
                        }
                        var tabParent = element.closest('.tab-pane');
                        tabParent.length && !tabParent.hasClass('active') && $('[href="#' + tabParent.attr('id') + '"]').addClass('has-error');
                    }
                },
                success: function (element) {
                    element.closest('.field-container').addClass("is-valid")
                },
                onkeyup: function (element) { return true },
                ignore: '.ignore,:hidden,:disabled',
            }

            if (options.onFocusoutValidation) {
                _.assign(validationSettings, {
                    onfocusout: function (element) {
                        if ($(element).hasClass('ignore-focusout-validation'))
                            return true;
                        $(element).valid();
                    }, onkeyup: $.noop
                }); // for 'true' you need a function, 'false' works}
            } else {
                _.assign(validationSettings, { onkeyup: function (element) { $(element).valid(); } }); // for 'true' you need a function, 'false' works}
            }

            formRoot.validate && formRoot.validate(validationSettings);

            // validate required upload files
            $.validator && $.validator.addMethod("required-file", function (value, element) {
                return value !== "" || $(element).scope().queue.length;
            });

            // validate required upload files
            $.validator && $.validator.addMethod("required-fromclass", function (value, element) {
                return $(element).hasClass('afvalid');
            });

            $.validator && $.validator.addMethod("required-cblist", function (value, element) {
                var group = $(element).attr('data-validation-group');
                var valid = false;
                $('[data-validation-group="' + group + '"]').each(function () {
                    if (this.checked)
                        valid = true;
                });
                return valid;
            }, localization.validation.required);

            $.validator && $.validator.addMethod("required-ddwithcb", function (value, element) {
                var cboxes = $(element).closest('.field-container').find(':checkbox');
                var valid = false;
                $.each(cboxes, function (i, v) {
                    if ($(v).is(':checked'))
                        valid = true;
                });
                return valid;
            }, localization.validation.required);

            $.validator && $.validator.addMethod("required-dnnsf", function (value, element) {

                if (element.nodeName.toLowerCase() === "select") {
                    // could be an array for select-multiple or a string, both are fine this way
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }

                if ($_scope.form.RequiredFieldAllowsWhiteSpace) {
                    return value.length > 0;
                }
                else {
                    return $.trim(value).length > 0;
                }
            }, localization.validation.required);

            // initialize password confirm
            formRoot.find('[data-password-confirm]').each(function () {
                $(this).rules("add", {
                    equalTo: '#' + $(this).attr('data-password-confirm'),
                    messages: {
                        equalTo: localization['validation.passwordNoMatch']
                    }
                });
            });

            formRoot.find('[data-textbox-confirm]').each(function () {
                var firstField = $(this).attr('af-field-title');
                var secondField = $('#' + $(this).attr('data-textbox-confirm')).attr('af-field-title');
                $(this).rules("add", {
                    equalTo: '#' + $(this).attr('data-textbox-confirm'),
                    messages: {
                        equalTo: firstField + ' & ' + secondField + ' ' + localization['validation.fieldsDoNotMatch']
                    }
                });
            });

            // fix width when printing
            if (formRoot.closest('#Table1').length) {
                formRoot.closest('#Table1').addClass('container')
                    .parent().addClass(formRoot.attr('data-rootclass'));
                $('body').addClass('bstrap30 bstrap3-material');
            }

            //fix for when in pop-up
            if (formRoot.closest('.container').length == 0) {
                formRoot.closest('.phFormTemplate').addClass('container');
            }

            function parseVar(strVar) {
                if (!isNaN(parseInt(strVar)))
                    return parseInt(strVar);

                if (!isNaN(parseFloat(strVar)))
                    return parseFloat(strVar);

                if (strVar[0] == '[') {
                    // looks like an array
                    return eval(strVar.replace('\n', ''));
                }

                if (strVar == "false")
                    return false;

                if (strVar == "true")
                    return true;

                // just return it as string
                return strVar;
            }

            // load localized error messages
            for (var key in localization) {
                if (key.indexOf('validation.') == 0) {
                    var relKey = key.substr('validation.'.length);
                    if ($.validator)
                        $.validator.messages[relKey] = localization[key].indexOf('{0}') == -1 ? localization[key] : $.validator.format(localization[key]);
                } else if (key.indexOf('jquery.datepicker.') == 0 && $.datepicker) {
                    var relKey = key.substr('jquery.datepicker.'.length);
                    var s = {};
                    s[relKey] = parseVar(localization[key]);
                    $.datepicker.setDefaults(s);
                }
            }

            //// load strings from the server
            //$.getJSON(formRoot.attr("")

            // fix for datepicker, onchange does not trigger validation, so call onkeyup manually
            formRoot.find('.datepicker').change(function () {
                $(this).keyup();
            });

            $('.modal').on('shown.bs.modal', function () {
                var x = 0;

                var checkModals = setInterval(function () {
                    $('.modal:visible').each(function () {
                        var popup = $(this);
                        popup.find('.modal-dialog:first').css('z-index', popup.find('.modal-backdrop:first').css('z-index') + 1);
                        popup.after(popup.find('.modal-dialog:first').siblings('.modal-backdrop'));
                    });
                    if (++x === 5) {
                        window.clearInterval(checkModals);
                    }
                }, 1000);
            });

            //// initialize input masks
            //formRoot.find('[data-mask]').each(function () {
            //    $(this).mask($(this).attr('data-mask'));
            //});


            // intialize date pickers
            formRoot.find(".datepicker").each(function () {
                var opts = {
                    dateFormat: $(this).attr('data-dateformat'),
                    changeMonth: $(this).attr('data-changemonth') == 'true',
                    changeYear: $(this).attr('data-changeyear') == 'true',
                    //Fix of IE
                    fixFocusIE: false,
                    onSelect: function (dateText, inst) {
                        this.fixFocusIE = true;
                    },
                    onClose: function (dateText, inst) {
                        this.fixFocusIE = true;
                        inst.input.trigger('change');
                    },
                    beforeShow: function (input, inst) {
                        var result = true;
                        this.fixFocusIE = false;
                        return result;
                    }
                };

                if ($(this).attr('data-yearrange'))
                    opts["yearRange"] = $(this).attr('data-yearrange');


                // merge other options
                if ($(this).attr('data-opts')) {
                    opts = $.extend(opts, eval('(' + $(this).attr('data-opts') + ')'));
                }

                $(this).datepicker(opts);
                var theme = $(this).attr('data-theme');
                $('#ui-datepicker-div').each(function () {
                    if ($(this).parent("." + theme).size() == 0)
                        $(this).wrap('<div class="' + theme + '"></div>');
                });
            });

            // init file upload
            formRoot.find('.file-upload').each(function () {
                this["aform"] = formRoot;
            });

            if (window.aform_incFileUplad) {
                if (!$().fileupload)
                    return;

                formRoot.find('.file-upload').each(function () {

                    if (!this.aform)
                        return; // not one of our fields

                    var $root = $(this).parents('.fileupload-root:first');

                    // redefined formRoot in this context
                    var formRoot = this.aform;
                    var _this = $(this);
                    $root.find('.files').empty().append($('<p/>').text(angular.element(formRoot).scope().form.fields[_this.attr('data-af-field')].value));

                    // hack for DNN 7 to leave our upload field alone
                    var btn = $root.find('.fileinput-button');
                    if (btn.find('.dnnInputFileWrapper').size() > 0) {
                        btn.find('input').appendTo(btn);
                        btn.find('.dnnInputFileWrapper').remove();
                    } else {
                        if (btn.find('input')[0])
                            btn.find('input')[0].wrapper = 'hack';
                    }

                })

                // once is enough
                window.aform_incFileUplad = false;
            }

            //This is a fix for Xcilion skin for stoping changing the portal on EnterKey
            $(document).on('keydown', 'input:text.preventdefault', function (evt) {
                if (evt.keyCode == 13) {
                    evt.preventDefault();
                    evt.stopImmediatePropagation();
                }
            });

            $('body').on('keydown', 'input:text:not(.preventdefault),input:password:not(.preventdefault)', function (evt) {
                var btn = $(evt.currentTarget).closest('.form-root').find('.submit[data-default-button=on]:first');
                if (evt.keyCode == 13 && btn.length) {
                    btn.click();
                    evt.preventDefault();
                }
            });

            // reset buttons, sometimes firefox leaves them disabled after refresh
            try { formRoot.find('.button').button('reset'); } catch (e) { }

            formRoot.on('click', ".form-button", function () {
                submitForm(this);
            });

            function submitForm(el, fnDone, qs) {
                var fieldsToIgnoreSelectors = ':disabled, .ignore';// ignore dropdown with checkboxes 
                $_scope.fieldsToIgnoreClass = '';

                if ($_scope.settings.SubmitHiddenFields.Value) {
                    fieldsToIgnoreSelectors += ',.ignore-submit-hidden-fields, .richedit'
                } else {
                    fieldsToIgnoreSelectors += ',:hidden';
                    $_scope.fieldsToIgnoreClass = '.ng-hide';
                };

                var connectedForms = {};
                var btnSettings = $_scope.settings.Fields[$(el).attr('data-name')];
                if (!btnSettings) { //submit from tabsPro event
                    btnSettings = {
                        'isConnected': false
                    }
                }
                else {
                    var tokenizedConnectedForms = $_scope.form.fields[btnSettings.TitleCompacted].connectedForms;
                    btnSettings.isConnected = tokenizedConnectedForms && tokenizedConnectedForms.length > 0;
                    btnSettings.isConnected && (connectedForms = tokenizedConnectedForms);
                }
                var _this = el;
                // reset
                formRoot.find(".server-error").html("").hide();
                var causesValidation = $(_this).attr('data-validation') == 'on';
                var fieldsToValidate = formRoot.find('input,textarea,select,.checkbox-list').not(fieldsToIgnoreSelectors);
                $.each(connectedForms, function (i, v) {
                    var formControls = {};
                    formControls.fields = angular.element('#dnn' + v.FormId + 'root').scope().controls;
                    if (formControls.fields.length)
                        $_scope.controls = _.uniqBy($_scope.controls.concat(formControls || []), 'field')
                    // formControls.fields.length && $_scope.controls.push(formControls);
                    var formEl = $('#dnn' + v.FormId + 'root');
                    var fields = formEl.find('.field-container').not($_scope.fieldsToIgnoreClass).find('input,textarea,select,.checkbox-list').not(fieldsToIgnoreSelectors);
                    causesValidation && formEl.is(':visible') && fields.valid();
                });
                if (causesValidation) {
                    fieldsToValidate.each(function (index, input) {
                        if (!$(input).attr('keyup-listener')) { // we don't need duplicate listeners
                            $(input).attr('keyup-listener', 'true')
                            $(input).on("keyup change", function (event) { // add an event listener because the plugin doesn't work as it should
                                $(event.target).valid();
                            });
                        }
                    });
                }
                if (causesValidation && fieldsToValidate.size() && !fieldsToValidate.valid()) {
                    refreshCaptchaOnError($_scope);

                    formRoot.find('.has-error:first').find('input,textarea,select').focus();
                    $('.has-error').first()[0].scrollIntoView({ behavior: "smooth", block: "center" });
                    fnDone && fnDone({ value: false, refresh: angular.element(formRoot).scope().settings.TabsPro_RefreshTabStateOnLeave.Value });
                    return false;
                }

                if (_this.preventSubmit)
                    return;

                // check if we need to start uploads
                //formRoot[0].toUpload = 0;
                formRoot[0].$btn = $(_this);
                if (qs && !$.isEmptyObject(qs)) {
                    formRoot[0].qs = qs;
                }
                formRoot.bind('fileuploadsubmit', function (e, data) {
                    // Sending the all form fields in fileUpload request
                    var currentData = getFormData(formRoot);
                    data.formData = currentData;
                });

                var $btn = $(_this);
                $($btn).data('connectedForms', connectedForms);
                try { $btn.hasClass('af-btn-loading') && $btn.button('loading'); } catch (e) { }

                $btn.data().tabEvent && $btn.data('tabEvent', false);

                var abortSubmit = false;
                var waitFor = 0;

                $.each($_scope.controls, function (i, control) {
                    if (control.fields && control.fields.length) {
                        $.each(control.fields, function (i, v) {
                            if (v.onSubmit)
                                waitFor++;
                        })
                    }
                    else {
                        if (control.onSubmit)
                            waitFor++;
                    }
                });

                if (formRoot[0].onFormSubmit.length)
                    for (var i in formRoot[0].onFormSubmit)
                        formRoot[0].onFormSubmit[i]($btn);
                if (!waitFor) {
                    formRoot[0].submitData($btn, fnDone, btnSettings);
                }
                else if (waitFor && (!formRoot.find(".table-striped.files tr.file-table").length && !formRoot.find("[submit-data]").length && !btnSettings.isConnected)) {
                    //sending with no file uploaded
                    return formRoot[0].submitData($btn, fnDone, btnSettings);
                } else {
                    var submitControl = function (control) {
                        if (!control.onSubmit)
                            return
                        control.onSubmit(function () {
                            if (abortSubmit)
                                return;

                            waitFor--;
                            if (waitFor == 0)
                                formRoot[0].submitData($btn, fnDone, btnSettings);
                        }, function (error) {
                            if (abortSubmit)
                                return;
                            formRoot.find(".server-error").html(error).show();
                            afResetButton(formRoot, $btn);
                            abortSubmit = true;
                        });
                    }

                    $.each($_scope.controls, function (i, control) {
                        if (control.fields && control.fields.length) {
                            $.each(control.fields, function (i, v) {
                                submitControl(v);
                            })
                        }
                        else
                            submitControl(control);
                    });
                }
            }

            formRoot[0].submitData = function ($btn, fnDone, btnSettings) {
                isConnected = btnSettings.isConnected;
                if (formRoot[0].qs && !$.isEmptyObject(formRoot[0].qs)) {
                    var submitUrl = dnnsf.getUrlParts($btn.attr('data-submiturl'))
                    submitUrl.query = $.extend(submitUrl.query, formRoot[0].qs);
                    $btn.attr('data-submiturl', submitUrl.getUrl(submitUrl));
                }
                var list = [],
                    deleteUrl = "";

                if (formRoot[0].submitting)
                    return;

                //getting data for submit
                var data = getFormData(formRoot);
                if (isConnected) {
                    data = { '$_thisForm': data };
                    $.each($($btn).data('connectedForms'), function (i, v) {
                        var fields = {}
                        fields[v.FormName] = getFormData($('#dnn' + v.FormId + 'root'));
                        $.extend(data, fields)
                    });
                }

                //delete files
                $.each($_scope.controls, function (i, control) {
                    if (!control.deleteFiles)
                        return;
                    list = control.deleteFiles();
                    deleteUrl = control.deleteUrl();

                    if (list) {
                        $.each(list, function (i, filename) {
                            $.ajax({
                                headers: {
                                    "DNNSF-Time-Offset": timeZoneOffset,
                                    "RequestVerificationToken": svcFramework.getAntiForgeryValue()
                                },
                                url: deleteUrl + '&f=' + filename,
                                type: "post",
                                dataType: "json"
                            }).done(function (data) {
                                formRoot[0].submitting = false;
                                parseFormResponse2(formRoot, $btn, data);
                            });
                        });
                    }
                });

                var submitFormData = function (event, onDone) {
                    formRoot[0].submitting = true;
                    var setDisableState = function () {
                        var btns = formRoot.find('.submit').not($btn);
                        $.each(btns, function (i, formButton) {
                            $(formButton).attr('disabled') && $(formButton).data('disabled', true);
                            !$btn.data().tabEvent && $(formButton).attr('disabled', 'disabled');
                        })
                    }
                    formRoot.find('.submit-progress').css('visibility', 'visible').stop(true, true).fadeIn();
                    var xhr = new XMLHttpRequest();
                    var executed = [];
                    var executedOnDone = false;
                    var qs = $.param({
                        "referrer": document.referrer,
                        "_url": document.URL
                    });
                    if (isConnected) {
                        xhr.open("POST", options.apiUrl + "/MultiForm/Submit?" + $btn.attr("data-submitquery") + '&' + qs, true);
                        xhr.setRequestHeader("Content-type", "application/json");
                    } else {
                        xhr.open("POST", $btn.attr("data-submiturl") + '&' + qs, true);
                        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    }
                    xhr.setRequestHeader("DNNSF-Time-Offset", timeZoneOffset);
                    xhr.setRequestHeader("RequestVerificationToken", svcFramework.getAntiForgeryValue());

                    xhr.onprogress = function () {
                        var response = xhr.response.split("\n");
                        if (response[response.length - 1] == "")
                            response.pop();

                        $.each(response, function (i, v) {
                            if (executed.indexOf(i) != -1)
                                return;

                            try {
                                var responseObj = JSON.parse(v);
                            } catch (e) {
                                // json is incomplete. The next flush will get the rest of it.
                                return;
                            }

                            if (isConnected && responseObj.validationErrors) {
                                responseObj.connectedForms = $($btn).data('connectedForms');
                            }

                            parseFormResponse2(formRoot, $btn, responseObj);
                            if (onDone && responseObj.validationErrors) {
                                onDone(responseObj);
                                executedOnDone = true;
                            }
                            executed.push(i);
                        });
                    };
                    xhr.onreadystatechange = function () {

                        formRoot[0].submitting = false;
                        var response = xhr.response.split("\n");

                        if (response[response.length - 1] == "") {
                            response.pop(); //on firefox sometimes the response is an empty string
                        }
                        if (xhr.readyState == 4 && response.length) {
                            try {
                                var resJson = JSON.parse(response[0]);
                            }
                            catch (e) {
                                parseFormResponse2(formRoot, $btn, { 'error': localization.actionErrorDefaultMessage, 'reset': true });
                                console.log(response);
                                return;
                            }
                            if (onDone) {
                                response = _.filter(response, function (value, key) {
                                    return executed.indexOf(key) == -1;
                                });
                                !executedOnDone && onDone(response.length && JSON.parse(response[0]));
                            }
                            if (isConnected)
                                $_scope.controls = [];

                        }
                    };

                    //xhr.addEventListener('loadend', function (event) {
                    //    afResetButton(formRoot, $btn);
                    //});

                    var ignoreEvent = false;
                    if (event == 'TabsPro_OnTabLeave') {
                        var ignoreTabLeave = $_scope.settings.TabsPro_IgnoreTabLeaveIfNoChanges && $_scope.settings.TabsPro_IgnoreTabLeaveIfNoChanges.Value;
                        var hasChanges = dnnsf['af-' + $_scope.settings.ModuleId].submittedData && !_.isEqual(dnnsf['af-' + $_scope.settings.ModuleId].submittedData, data);
                        if (ignoreTabLeave && hasChanges == false) {
                            onDone({});
                            formRoot[0].submitting = false;
                            ignoreEvent = true;
                        }
                        dnnsf['af-' + $_scope.settings.ModuleId].submittedData = data;
                    }
                    if (ignoreEvent)
                        return;
                    setDisableState();
                    if (isConnected)
                        xhr.send(JSON.stringify(data));
                    else
                        xhr.send($.param(data));
                }

                var event = dnnsf.getUrlParts($btn.attr("data-submiturl")).query['event'];
                switch (event) {
                    //case 'click':
                    //break;
                    //case 'TabsPro_OnTabEnter':
                    //break;
                    case 'TabsPro_OnTabLeave':
                        if (!options.hasTabLeaveActions)
                            return fnDone({ value: true, refresh: angular.element(formRoot).scope().settings.TabsPro_RefreshTabStateOnLeave.Value });
                        submitFormData(event, function (data) {
                            if (data && data.validationErrors != undefined) {
                                fnDone({ value: false, refresh: angular.element(formRoot).scope().settings.TabsPro_RefreshTabStateOnLeave.Value });
                            } else {
                                if (!angular.element(formRoot).scope()) {
                                    var waitForInitialization = setInterval(function () {
                                        if (angular.element(formRoot.selector).scope()) {
                                            fnDone({ value: true, refresh: angular.element(formRoot.selector).scope().settings.TabsPro_RefreshTabStateOnLeave.Value });
                                            clearInterval(waitForInitialization);
                                        }
                                    }, 5)
                                } else
                                    fnDone({ value: true, refresh: angular.element(formRoot).scope().settings.TabsPro_RefreshTabStateOnLeave.Value });

                            }
                        })
                        break;
                    default:
                        submitFormData(event);
                }

            };

            if (options.hasTabEnterActions || options.hasTabLeaveActions) {
                dnnsf.events.listen('OnTabsLeave', options.moduleId, function (data, fnDone) {

                    var isTarget = false;
                    $.each(data.targetModuleList, function (index, moduleId) {
                        if (options.moduleId == moduleId)
                            isTarget = true;
                    })
                    if (isTarget && options.hasTabLeaveActions) {
                        var submitUrl = dnnsf.getUrlParts($_scope.form.submitUrl)
                        submitUrl.query = $.extend(submitUrl.query, { 'event': 'TabsPro_OnTabLeave' });
                        var btn = document.createElement("button");
                        $(btn).attr('class', 'form-button');
                        $(btn).attr('data-submiturl', submitUrl.getUrl(submitUrl));
                        if ($_scope.settings.TabsPro_IgnoreValidationOnLeave.Value) {
                            $(btn).attr('data-validation', 'off');
                        } else {
                            $(btn).attr('data-validation', 'on');
                        }
                        $(btn).data('tabEvent', true);
                        submitForm(btn, fnDone);
                    } else {
                        fnDone();
                    }
                });
            }

            if (options.hasTabEnterActions) {
                dnnsf.events.listen('OnTabsEnter', options.moduleId, function (data, fnDone) {
                    if (!options.hasTabEnterActions) {
                        return fnDone && fnDone();
                    }
                    var newQs = { 'event': 'TabsPro_OnTabEnter' };
                    if (data.qs && !$.isEmptyObject(data.qs)) {
                        $.extend(newQs, data.qs);
                        dnnsf['af-' + options.moduleId].passQs = data.qs;
                    }
                    var isTarget = false;
                    $.each(data.targetModuleList, function (index, moduleId) {
                        if (options.moduleId == moduleId)
                            isTarget = true;
                    })
                    if (isTarget) {
                        var submitUrl = dnnsf.getUrlParts($_scope.form.submitUrl)
                        submitUrl.query = $.extend(submitUrl.query, newQs);
                        var btn = document.createElement("button");
                        $(btn).attr('class', 'form-button');
                        $(btn).attr('data-submiturl', submitUrl.getUrl(submitUrl));
                        $(btn).attr('data-validation', 'off');
                        $(btn).data('tabEvent', true);
                        submitForm(btn, fnDone, data.qs);
                    } else {
                        fnDone();
                    }
                });
            }

            dnnsf.events.listen('ActionFormPing', options.moduleId, function (data, fnDone) {
                $.each(data.targetModuleList, function (index, moduleId) {
                    if (options.moduleId == moduleId) {
                        fnDone(options.moduleId);
                    } else {
                        fnDone();
                    }
                })
            });
        };
    }

    function getFormData(formRoot) {
        var $_scope = angular.element(formRoot).scope();
        var data = {};
        formRoot.find(':input,[data-val],.value-node').not("button[class^='trumbowyg-'], textarea.g-recaptcha-response").each(function () {
            //formRoot.find('input').filter(':text,:password,:hidden').add(formRoot.find("select,textarea")).each(function () {
            if (!$(this).attr("id") || $(this).closest($_scope.fieldsToIgnoreClass).length)
                return;
            // initialize to empty
            var name = $(this).attr("field-id") || $(this).attr("id").replace(/dnn\d+/, "");
            if (!data[name])
                data[name] = '';

            // for radios, only set if selected
            if ($(this).attr('type') == 'radio') {
                if (this.checked)
                    data[name] = $(this).val();
            } else if ($(this).attr('data-val') || $(this).attr('data-val') === '') {
                data[name] = $(this).attr('data-val');
            }
            else if ($(this).hasClass('value-node')) {
                data[name] = $(this).html();
            } else {
                data[name] = $(this).val();
            }

        });

        var checkboxes = _.map(formRoot.find('.field-container').not($_scope.fieldsToIgnoreClass).find('[type="checkbox"][id]:not([id=""])'),
            function (checkbox) {
                return [$(checkbox).attr('id').replace(/dnn\d+/, ''), $(checkbox)]
            });

        var part_checkboxes = _.partition(checkboxes,
            function (checkbox) {
                return checkbox[0].indexOf('-') == -1
            });

        _.each(part_checkboxes[0],
            function (checkbox) {
                data[checkbox[0]] = checkbox[1].is(':checked') ? 'True' : 'False'
            });

        var checkbox_lists = _.groupBy(part_checkboxes[1],
            function (checkbox) {
                return checkbox[0].substr(0, checkbox[0].indexOf('-'))
            });

        _.each(checkbox_lists,
            function (list, name) {
                data[name] = JSON.stringify(
                    _.map(
                        _.filter(list,
                            function (checkbox) {
                                return checkbox[1].is(':checked')
                            }),
                        function (checkbox) {
                            return checkbox[1].val()
                        }))
            });

        formRoot.find(".itemwithqty input:visible").each(function () {
            data[$(this).attr("id").replace(/dnn\d+/, "")] = $('#' + $(this).attr("id") + 'Qty').val() + ' ' + $(this).val();
        });

        formRoot.find('iframe').each(function () {
            if (!$(this).closest(".g-recaptchadnnsf").length && dnnsf.canAccessIFrame(this) && this.contentWindow.getContent)
                data[$(this).attr("name").replace(/dnn\d+/, "")] = this.contentWindow.getContent();
        });

        // finally, call controls
        $.each($_scope.controls, function (i, control) {
            if (!control.getValue)
                return;
            data[control.field.TitleCompacted] = control.getValue();
        });

        _.forEach($_scope.form.fields, function (afField) {
            if (afField.type === "recaptcha") {
                data[afField.name] = afField.value;
                return false;
            }
        });

        return data;
    }

    function resetRecaptchaValidation(widgetId, formRoot) {

        var recaptchaElement = $("div[vc-recaptcha]", formRoot);

        if (!recaptchaElement.length) {
            return;
        }

        if (typeof grecaptcha === 'undefined') {
            console.error('grecaptcha is undefined');
            return;
        }

        grecaptcha.reset(widgetId);
        var recaptchaParent = recaptchaElement.closest('.field-container');
        var recaptchaError = recaptchaParent.find('.text-danger');

        setTimeout(function () {
            recaptchaParent.removeAttr('aria-describedby');
            recaptchaError.remove();
        }, 3000);
    }

    function afResetButton(formRoot, $btn) {
        if (!$btn) {
            return;
        }
        setTimeout(function () {
            try { $btn.button('reset'); } catch (e) { }
            var btns = formRoot.find('.submit').not($btn);
            $.each(btns, function (i, formButton) {
                if ($(formButton).data('disabled')) {
                    $(formButton).data('disabled', false)
                } else {
                    $(formButton).removeAttr('disabled');
                }
            })
            formRoot && formRoot.find('.submit-progress').stop(true, true).fadeOut(function () {
                $(this).css('visibility', 'hidden');
            });
        }, 500);
    }

    function refreshCaptchaOnError(scope) {
        formRoot.find('.imgcode').each(function (index, captchaImg) {
            scope.refreshCaptcha(scope.settings.ModuleId, $(captchaImg).attr('data-af-field'));
        });
    }

    function parseFormResponse2(formRoot, $btn, data) {

        var $ = dnnsfjQuery;
        parseFormResponse(data, {
            executeJsFunction: function (fnName) {
                window.parent[fnName](window.frameElement);
            },
            executeJsCode: function (jsCode) {
                if (!form)
                    var form = formRoot.scope() && formRoot.scope().form;
                eval(jsCode);
            },
            error: function (err, reset) {
                formRoot.find(".server-error").append($.parseHTML(err)).show();
                $('.g-recaptchadnnsf', formRoot).each(function (index, recaptchaElement) {
                    grecaptcha.reset($(this).attr('data-widgetid'));
                    if ($(recaptchaElement).attr('data-size') === 'invisible') {
                        grecaptcha.execute($(this).attr('data-widgetid'));
                    }
                });
            },
            validationErrors: function (_data) {
                var displayErrors = function (errors, mid) {
                    refreshCaptchaOnError(formRoot.scope());
                    $.each(errors, function (i, err) {
                        var fieldId = mid + err.fieldId;
                        var field = $('#dnn' + fieldId);
                        var parent = field.closest('.field-container');

                        if (!parent.length)
                            parent = $('[name="dnn' + fieldId + '"]').closest('.field-container');

                        // tabspro specific
                        var tabParent = parent.closest('.tab-pane');
                        tabParent.length && !tabParent.hasClass('active') && $('[href="#' + tabParent.attr('id') + '"]').addClass('has-error');
                        // end tabspro specific

                        field.attr('aria-describedby', 'error-' + field.attr('id'));

                        parent.addClass('has-error');
                        $('#dnn' + fieldId)
                        parent.find('.text-danger').length ?
                            parent.find('.text-danger').html(err.message).show() :
                            parent.append('<span id="' + 'error-' + field.attr('id') + '" class="text-danger">' + err.message + '</span>');

                        // focus and scroll to the element
                        $('.has-error').first()[0].scrollIntoView({ behavior: "smooth", block: "center" });
                    });

                }
                var mid = $(formRoot).parent().attr('data-moduleid');
                if (_data.validationErrors.constructor === Array) {
                    //is current form
                    displayErrors(_data.validationErrors, mid);
                } else {
                    //conected forms
                    $.each(_data.validationErrors, function (i, v) {
                        if (v.length) {
                            var form;

                            if (i != '$_thisForm') {
                                form = _data.connectedForms.find(function (j, k) {
                                    return j.FormName.toLowerCase() == i.toLowerCase();
                                })
                            }
                            displayErrors(v, form ? form.FormId : mid);
                        }
                    });
                }

                resetRecaptchaValidation(formRoot.scope().widgetId, formRoot);

                return;
            },
            redirect: function (url, isPushState) {
                if (data.forceDownload) {
                    var urlPath = dnnsf.getUrlParts(url).pathname;
                    var fileNameAndExtension = urlPath.substring(urlPath.lastIndexOf("/") + 1);
                    if (!window.ActiveXObject) {
                        var save = document.createElement('a');
                        save.href = url;
                        save.target = '_blank';
                        save.download = fileNameAndExtension || 'unknown';

                        var evt = new MouseEvent('click', {
                            'view': window,
                            'bubbles': true,
                            'cancelable': false
                        });
                        save.dispatchEvent(evt);

                        (window.URL || window.webkitURL).revokeObjectURL(save.href);
                        afResetButton(formRoot, $btn);

                    }
                    // for IE < 11
                    else if (!!window.ActiveXObject && document.execCommand) {
                        var _window = window.open(url, '_blank');
                        _window.document.close();
                        _window.document.execCommand('SaveAs', true, fileNameAndExtension || url)
                        _window.close();
                        afResetButton(formRoot, $btn);
                    }
                    return;
                }

                if (!data.popup && !data.newTab) {

                    if (isPushState) {
                        //$('.angrid').scope().$location.url(url);
                        setTimeout(function () {
                            window.history.pushState({}, '', url + location.hash);//added location.hash for tabsPro
                        }, 500)
                    } else {
                        window.location = url;
                        if (url.indexOf("mailto:") != -1 || url.indexOf("tel:") != -1 || url.indexOf("ftp:") != -1) {
                            afResetButton(formRoot, $btn);
                        }
                    }
                    return;
                }

                // handle new tab
                if (data.newTab) {
                    if (!!window.ApplePaySession) { // it's Safari 10+
                        window.location = url;
                    } else {
                        window.open(url, '_blank');
                        afResetButton(formRoot, $btn);
                    }
                    return;
                }

                // open popup
                //set modal and append to body
                var popup = $('<div class="af-modal modal fade">' +
                    '<div class="modal-dialog modal-lg">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title">' + data.popupTitle + '</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<iframe width="100%" src="' + url + '" frameborder="0" scrolling="yes"></iframe>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>').appendTo('body');

                //console.log(popup.modal); // removed unnecesary logs
                popup.modal({
                    backdrop: true
                });

                popup.on('hidden.bs.modal', function () {
                    //stop resizing
                    window.clearInterval(resizeInterval);
                    //remove from DOM
                    popup.remove();
                    //remove backdrop
                    $('.modal-backdrop').remove();

                });

                afResetButton(formRoot, $btn);

                //resize iframe so it has no scroll bar
                var __prevHeight = 0;
                var resizeInterval = setInterval(function () {
                    var iframe = $('.af-modal:visible').find('iframe');
                    try {
                        var bodyHeight = iframe[0].contentWindow.document.body.scrollHeight;// the corect way to get iframe height
                        //if (bodyHeight < __prevHeight) {
                        //    bodyHeight = bodyHeight - 50;// Decreseaing in height is slow because something somewhere is intercating with them. Here is a little boost ...
                        //}
                        if (bodyHeight != __prevHeight) {
                            __prevHeight = bodyHeight;
                            iframe.height(Math.max(200, bodyHeight));// minimum 200px
                        }
                    } catch (e) {
                        iframe.height(window.innerHeight - 240);// better save the sorry
                    }
                }, 1000);
            },

            message: function (msg, type) {
                if (!type || type == 'success') {
                    formRoot.find(".c-form").slideUp();
                    formRoot.find(".submit-confirm2").hide();
                    $('html, body').animate({
                        scrollTop: formRoot.offset().top - 200
                    }, 500);
                }
                formRoot.find(".submit-confirm").html(msg).show();
                var scope = formRoot.find(".submit-confirm").scope();

                angular.element(formRoot).injector().invoke(function ($compile) {
                    $compile(formRoot.find(".submit-confirm").contents())(scope);
                });

            },
            appendHtml: function (appendHtml, appendTo, reset) {
                $(appendTo).append(appendHtml);
                reset && afResetButton(formRoot, $btn);
            },
            data: function (data) {
                dnnsf['af-' + data.baseId.replace('dnn', '')].Data = data;
                angular.element(formRoot).scope().load(data.baseId.replace('dnn', ''));
                //angular.element(formRoot).scope().load(data, angular.element(formRoot).scope().settings);
                angular.element(formRoot).scope().$apply();
                angular.element(formRoot).scope().$broadcast('updateFormData');
            },
            noOp: function () {
            }
        }, $btn, formRoot);
    }

    function parseFormResponse(data, handlers, afButton, afFormRoot) {

        var $ = dnnsfjQuery;

        // initialize with default handlers, unless provieded by caller
        handlers = $.extend({
            keepOnPage: function (url) {
                window.location.reload(true);
            },
            redirect: function (url) {
                window.location = url;
            },
            appendHtml: function (appendHtml, appendTo) {
                $(appendTo).append(appendHtml);
            },
            error: function (err) { },
            message: function (msg, type) { },
            data: function (msg, type) { },
            executeJsCode: function (jsCode) {
                try {
                    eval(jsCode)
                } catch (e) {
                    console.error(e);
                }
            }
        }, handlers);

        // parse response and call handlers
        if (data.functionName) {
            handlers.executeJsFunction && handlers.executeJsFunction(data.functionName);
        } if (data.JsCode) {
            handlers.executeJsCode && handlers.executeJsCode(data.JsCode);
        } else if (data.Error || data.error) {
            handlers.error && handlers.error(data.Error || data.error, data.reset);
        } else if (data.validationErrors) {
            handlers.validationErrors && handlers.validationErrors(data);
        } else if (data.Content) {
            handlers.message && handlers.message(data.Content, data.Type);
        } else if (data.KeepOnPage) {
            handlers.KeepOnPage && handlers.KeepOnPage(data.Url);
        } else if (data.Url) {
            handlers.redirect && handlers.redirect(data.Url, data.PushState);
            return; // do not reset form button by default
        } else if (data.appendHtml) {
            handlers.appendHtml && handlers.appendHtml(data.appendHtml, data.appendTo, data.reset);
            return;
        } else if (data.data) {
            handlers.data && handlers.data(data.data);
        } else if (data.noOp) {
            handlers.noOp && handlers.noOp();
        }

        afResetButton(afFormRoot || formRoot, afButton);
    }

    return {
        initForm: initForm,
        getFormData: getFormData,
        afResetButton: afResetButton,
        parseFormResponse: parseFormResponse
    }
})(dnnsfjQuery, window.dnnsfAngular15);

var initForm = afApp.initForm,
    getFormData = afApp.getFormData,
    afResetButton = afApp.afResetButton,
    parseFormResponse = afApp.parseFormResponse;

function browseGrid(settings) {
    $('body').append('<div class="loader-wrapper" id="modalLoader"><div class="loader"></div></div>');
    $.get(window.dnnsf.commonUrl + '/static/dnnsf/tpl/gridModal.html', function (data) {
        var iframeData = data.replace('gridUrl', settings.url);
        iframeData = iframeData.replace('popupHeight', $(window).height() - 150 + 'px');
        $('body').append(iframeData);
        $('#gridFrame').load(function () {
            $('#gridFrame').contents().find('body').css({ 'overflow': 'auto' });
            $('#gridFrame').contents().find('body table').css({ 'width': '90%', 'margin': '0 auto' });
            setTimeout(function () {
                dnnsfjQuery('#gridModal').modal('show');
                $('#modalLoader').remove();
            }, 500);
            dnnsfjQuery('#gridModal').on('shown.bs.modal', function (e) {
                getData();
            });
        });
        dnnsfjQuery('#gridModal').on('hidden.bs.modal', function (e) {
            $('#gridModal').remove();
        });
    });
    function getData() {
        var iframe = window.frames['gridFrame'].document;
        $('body', iframe).on('click', '.grid-item', function () {
            if (!$(this).has('span.grid-field-value').size())
                return;
            var gridScope = window.frames['gridFrame'].angular.element($(this).closest('.item-value')).scope();
            $.each(settings.mappings, function (e, f) {
                var elem = $('* [data-ng-model^="form.fields.' + e + '"]');
                var parent = angular.element(elem).closest('.form-root').scope();
                parent.form.fields[e].value = gridScope.item[f];
                parent.form.fields[e].onChange && parent.form.fields[e].onChange(parent.form);
                parent.$apply();
            });
            dnnsfjQuery('#gridModal').modal('hide');
        })
            .on('mouseenter', '.grid-item', function () {
                $(this).closest('.item-value').addClass('hover-item');
            })
            .on('mouseleave', '.grid-item', function () {
                $(this).closest('.item-value').removeClass('hover-item');
            });
    };
}
