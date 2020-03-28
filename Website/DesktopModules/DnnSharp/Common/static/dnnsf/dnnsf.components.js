;

/*
 * DnnSF (DNN Sharp Foundation) - Reusable components
 */
var initDnnsfComponents = function (angular) {
    window.dnnsfDependencies = window.dnnsfDependencies || [];
    angular.module('dnnsf.components', ['ngSanitize', 'textAngular', 'dnnsf'].concat(window.dnnsfDependencies))

        .factory('constantsFactory', ['$injector', function ($injector) {
            return {
                getConstantsService: function () {
                    var defaultConstantsService = {
                        requiresSvcframework: function () { return false; },
                        isWebApi: function () { return false; },
                        dataSourcesControllerName: function () { throw "No dataSourcesControllerName was set."; }
                    };

                    if ($injector.has("constantsService")) {
                        return Object.assign({}, defaultConstantsService, $injector.get("constantsService"))
                    }

                    return defaultConstantsService;
                }
            }
        }])

        //convert obj to array to be able to sort
        .filter('toArray', function () {
            return function (obj) {
                if (!(obj instanceof Object)) return obj;

                return _.map(obj, function (val, key) {
                    return Object.defineProperty(val, '$key', { __proto__: null, value: key });
                });
            }
        })

        .filter('actionsFilter', function () {
            return function (defList, condition, clientButton) {
                if (!condition || !clientButton) return defList;
                var actions = defList.filter(function (k) {
                    return k[condition] == clientButton
                })
                return actions || [];
            }
        })

        //directive used to parse numeric values to strings for binding and strings to numbers on unbinding
        .directive('convertToNumber', function () {
            return {
                require: 'ngModel',
                link: function (scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function (val) {
                        return parseInt(val, 10);
                    });
                    ngModel.$formatters.push(function (val) {
                        return '' + val;
                    });
                }
            };
        })

        .directive('controlSave', function () {
            return {
                restrict: 'E',
                scope: {
                    onSave: '&'
                },
                link: function (scope, element, attrs, ngModel) {
                    function ctrlSave(event) {
                        //19 for Mac Command+S
                        if (!(String.fromCharCode(event.which).toLowerCase() === 's' && event.ctrlKey) && !(event.which === 19)) {
                            return true;
                        }
                        scope.onSave();
                        event.preventDefault();
                        return false;
                    }
                    $(document).keydown(ctrlSave);
                    scope.$on('$destroy', function () {
                        $(document).unbind("keydown", ctrlSave);
                    });

                }
            };
        })

        // https://github.com/dnnsfAngular15/dnnsfAngular15.js/issues/4516
        .directive('fixchange', [function () {

            return {
                replace: false,
                require: 'ngModel',
                scope: false,
                link: function (scope, element, attrs, ngModelCtrl) {
                    element.on('change', function () {
                        scope.$apply(function () {
                            if (attrs['type'] == 'radio') {
                                ngModelCtrl.$setViewValue(attrs['value']);
                            } else if (attrs['type'] == 'checkbox') {
                                ngModelCtrl.$setViewValue(element[0].checked);
                            }
                        });
                    });
                }
            };
        }])

        .directive('dnnsfLicensing', ['dnnsf', '$http', function (dnnsf, $http) {

            return {
                replace: false,
                //require: 'ngModel',
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/licensing.html?v=' + dnnsf.env.version,
                scope: {
                },
                link: function (scope, element, attrs) {
                    var url = dnnsf.adminApi('GetLicense');
                    $http({
                        method: 'GET',
                        url: url,
                        cache: true
                    }).success(function (data, status) {
                        scope.license = data;
                    });

                }
            };
        }])

        .directive('dnnsfRadiogroup', ['$compile', '$timeout', '$parse', function ($compile, $timeout, $parse) {
            return {
                restrict: 'A',
                scope: { model: '=', options: '=' },
                controller: function ($scope) {
                    $scope.getLabel = function (option) {
                        return typeof option.label != 'undefined' ? option.label : option;
                    };
                    $scope.getValue = function (option) {
                        return typeof option.value != 'undefined' ? option.value : option;
                    };
                },
                template:
                    '<div class="btn-group" data-toggle="buttons">' +
                    '<label class="btn btn-default btn-sm" data-ng-repeat="o in options" data-ng-class="{\'active\': model == getValue(o), \'btn-info\': model == getValue(o) }">' +
                    '<input type="radio" fixchange="" data-ng-model="$parent.model" value="{{getValue(o)}}" />{{getLabel(o)}}' +
                    '</label>' +
                    '</div>',
                replace: true
            };
        }])

        // fancy checkbox
        .directive('dnnsfCheckbox', ['$compile', '$timeout', '$parse', function ($compile, $timeout, $parse) {
            return {
                restrict: 'A',
                scope: { ngModel: '=' },
                link: function (scope, element, attrs) {

                    scope.changed = function (updateModel) {

                        var checked = updateModel ? element.hasClass('active') : scope.ngModel;
                        if (updateModel)
                            scope.ngModel = checked;

                        if (checked)
                            element.addClass('btn-info active')
                        else
                            element.removeClass('btn-info')
                    };
                    scope.changed();

                    element.click(function () {
                        $timeout(function () {
                            scope.changed(true);
                        });
                    });

                    scope.$watch('ngModel', function () {
                        scope.changed();
                    });
                }
            };
        }])

        // indeterminate checkbox state
        .directive('dnnsfCheckboxPartial', ['$compile', '$timeout', '$parse', function ($compile, $timeout, $parse) {
            return {
                restrict: 'A',
                scope: {
                    expr: '=dnnsfCheckboxPartial'
                },
                link: function (scope, element, attrs) {
                    scope.$watch('expr', function () {
                        element[0].indeterminate = scope.expr;
                    });
                }
            };
        }])

        .directive('dnnsfRegistration', ['$timeout', '$http', '$sce', 'dnnsf', 'dataSources', function ($timeout, $http, $sce, dnnsf, dataSources) {
            return {
                scope: true,
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/licensing.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {

                    scope.dnnsf = dnnsf;
                    scope.$sce = $sce;

                    // pull licensing from server
                    $http({
                        method: 'GET',
                        url: dnnsf.adminApi('GetLicense'),
                        cache: true
                    }).success(function (data, status) {
                        scope.license = data;
                    });
                }
            };
        }])

        .directive('dnnsfCheckUpdate', ['$timeout', '$http', '$sce', 'dnnsf', 'dataSources', function ($timeout, $http, $sce, dnnsf, dataSources) {
            return {
                scope: true,
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/check-update.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {

                    scope.dnnsf = dnnsf;
                    scope.$sce = $sce;

                    // pull licensing from server
                    $http({
                        method: 'GET',
                        url: '//www.dnnsharp.com/DesktopModules/DnnSharp/DnnApiEndpoint/Api.ashx?method=CurrentVersion&productCode=' + dnnsf.productCode,
                        cache: true
                    }).success(function (data, status) {
                        scope.serverVersion = data;
                    });
                }
            };
        }])

        // this is to get lists from the server and share them between settings (using the cache offered by the $http service)
        // the array is for minification purposes, otherwise dependency injection will not work
        .factory('dataSources', ['$q', 'dnnsf', 'dnnsfHttp', 'constantsFactory', function ($q, dnnsf, dnnsfHttp, constantsFactory) {
            return {
                callForData: function (settings, fnReady) {
                    var constantsService = constantsFactory.getConstantsService();

                    if (settings.$$_q)
                        settings.$$_q.resolve();
                    settings.$$_q = $q.defer();
                    var url;
                    if (constantsService.isWebApi()) {
                        var cleanSettings = angular.copy(settings);
                        url = dnnsf.getWebApiEndpoint(constantsService.dataSourcesControllerName(), settings.DataSourceMethod || 'GetData', cleanSettings);
                    } else {
                        url = dnnsf.adminApi(settings.DataSourceMethod || 'GetData', settings);
                    }

                    dnnsfHttp.get(
                        g_dnnsfState.moduleId,
                        url,
                        { cache: true },
                        constantsService.requiresSvcframework()
                    ).success(function (data, status) {
                        fnReady && fnReady(data, settings);
                    });
                }
            };
        }])

        // the array is for minification purposes, otherwise dependency injection will not work
        .directive('ctlDatasource', ['$compile', '$timeout', '$parse', '$interpolate', 'dataSources', function ($compile, $timeout, $parse, $interpolate, dataSources) {
            return {
                scope: {
                    pdef: '=ctlDatasource',
                    model: '=updatemodel',
                    parentObject: '=parentObject',
                    params: '='
                },
                // we need this because the isolated scope is no longer avaiable in the html
                // https://github.com/dnnsfAngular15/dnnsfAngular15.js/issues/4845#issuecomment-28339616
                template: function (tElement, tAttrs) {
                    return tElement.html();
                },
                link: function (scope, element, attrs) {
                    // sometimes model is a string
                    if (($.type(scope.model) != "object" || (!scope.model.hasOwnProperty('Value') && !scope.model.hasOwnProperty('IsExpression'))) && scope.pdef.Type != 'CheckboxList')
                        scope.model = { Value: scope.model, IsExpression: false };

                    scope.model = scope.model || {};

                    // sometimes model is a string
                    scope.$watch('model', function () {
                        if ($.type(scope.model) != "object" && scope.pdef.Type != 'CheckboxList')
                            scope.model = { Value: scope.model, IsExpression: false };

                        if (scope.model && !scope.model.Parameters && scope.pdef.Type != 'CheckboxList') {
                            scope.model.Parameters = {};
                            var primaryKeys = ["Name", "Parameters", "Value", "Expression", "IsExpression"];
                            //we do not change the config files for backwards compatibility
                            _.forEach(scope.model, function (value, key) {
                                if (primaryKeys.indexOf(key) == -1) {
                                    scope.model.Parameters[key] = value;
                                    delete scope.model[key];
                                }
                            });
                        }
                    });


                    $timeout(function () {

                        // migrate parametrs to new form
                        // if (scope.model) {
                        //     if (!scope.model.hasOwnProperty('Value')) {
                        //         scope.model.Parameters[i] = { Value: p, IsExpression: false, Expression: '' };
                        //     }
                        // }

                        // handle old format that didn't support data sources
                        if (scope.params && (!scope.params.DataSource || !scope.params.DataSource.Value) && scope.params.Values) {
                            var isSql = new RegExp("select.+from", "gi").test(scope.params.Values);
                            scope.model = {
                                Value: isSql ? 'SQL Query' : 'Items'
                            };
                        }

                        if (scope.model && !scope.model.Parameters && scope.params && scope.params.Values) {
                            scope.model.Parameters = {};
                            var isSql = new RegExp("select.+from", "gi").test(scope.params.Values);
                            if (isSql)
                                scope.model.Parameters.SqlQuery = scope.params.Values || scope.params.Items;
                            else
                                scope.model.Parameters.Items = scope.params.Values || scope.params.Items;
                        }

                        if (scope.pdef.Settings['Items']) {
                            if (!scope.model)
                                scope.model = {};

                            var items = scope.pdef.Settings['Items'];
                            if ($.type(items) === "string")
                                items = $.parseJSON(items);

                            scope.items = [];

                            for (var i in items) {
                                // for array, use text as value, for objects, use key
                                var li;
                                if (scope.pdef.Type === "SelectWithGroups") {
                                    li = { Value: items[i].Value, Text: g_localize(items[i]), Group: items[i].Group || "" };
                                } else {
                                    li = { Value: $.isArray(items) ? g_localize(items[i]) : i, Text: g_localize(items[i]) };
                                }

                                scope.items.push(li);
                                if (scope.model && li.Value == scope.model.Value) {
                                    scope.selectedSource = li;
                                }
                            }

                        } else {
                            // interpolate data in settings
                            // if interplation is used, {{..}} patterns will get replaced with bindings
                            // which means we need to sync with the model as it updates
                            if (scope.pdef.Settings['Interpolate'] == true) {
                                // settings need to be a unique object so it keeps the http promise in order to cancel 
                                // multiple requests when the parentObject changes quickly
                                var settings = {};
                                scope.$watch('parentObject', function () {
                                    settings = $.extend(settings, scope.pdef.Settings)
                                    //console.log(scope.parentObject);
                                    $.each(settings, function (k) {
                                        if (k.indexOf('$') == 0)
                                            return;
                                        settings[k] = $interpolate((settings[k] || '').toString())(scope);
                                    });
                                    dataSources.callForData(settings, function (data, settings) {
                                        scope.items = data;
                                        for (var i in data) {
                                            if (data[i].Value == scope.model.Value)
                                                scope.selectedSource = data[i];
                                        }
                                    });
                                }, true);
                            } else {
                                dataSources.callForData(scope.pdef.Settings, function (data) {
                                    scope.items = data;
                                    for (var i in data) {
                                        if (scope.model && data[i].Value == scope.model.Value)
                                            scope.selectedSource = data[i];
                                    }
                                });
                            }

                        }
                    });
                }
            };
        }])


        // the default cookieStore does not support path or expiration
        .provider('$cookieStore', [function () {
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
        }])


        // checkbox list
        .directive('dnnsfCheckboxlist', ['$compile', '$timeout', '$parse', function ($compile, $timeout, $parse) {
            return {
                restrict: 'A',
                template: '<div data-ng-repeat="item in internalValues" class="{{cssclass}}"><input type="checkbox" data-ng-model="item.$_selected" data-ng-change="updateSelection(item)" /> {{getTitle({item:item})}}</div>',
                scope: {
                    cssclass: '@',
                    ngModel: '=',
                    values: '=',
                    getTitle: '&',
                    serializeItem: '&'
                },
                link: function (scope, element, attrs) {

                    //scope.ngModel = scope.ngModel || [];
                    function loadChecked() {
                        // setup check state
                        $.each(scope.internalValues, function (i, item) {
                            var serializedItem = scope.serializeItem({ item: item });
                            item.$_selected = $.inArray(serializedItem, scope.ngModel) != -1;
                        });
                    }

                    scope.$watch('values', function () {
                        // create a local copy of the values so we can maintain the selection state easily
                        scope.internalValues = $.extend(true, {}, scope.values);
                        loadChecked();
                    });

                    scope.$watch('ngModel', function () {
                        loadChecked();
                    });

                    scope.getTitle = scope.getTitle || function (item) {
                        return item;
                    };

                    scope.serializeItem = scope.serializeItem || function (item) {
                        return item;
                    };

                    scope.updateSelection = function (item) {

                        var serializedItem = scope.serializeItem({ item: item });
                        if (!item.$_selected && $.inArray(serializedItem, scope.ngModel) != -1)
                            scope.ngModel.splice($.inArray(serializedItem, scope.ngModel), 1);
                        else if (item.$_selected)
                            scope.ngModel.push(serializedItem);
                    };
                }
            };
        }])

        .directive('syncArray', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                template: '<div data-ng-repeat="item in internalValues" class="{{cssclass}}"><input type="checkbox" data-ng-model="item.$_selected" data-ng-change="updateSelection(item)" data-ng-disabled="isDisabled(item)" /> {{getTitle({item:item})}}</div>',
                scope: {
                    syncArray: '=',
                    syncItem: '=',
                    syncValue: '='
                },
                link: function (scope, element, attrs) {

                    $(element).change(function () {
                        if (!this.checked && $.inArray(scope.syncValue, scope.syncArray) != -1)
                            scope.syncArray.splice($.inArray(scope.syncValue, scope.syncArray), 1);
                        else if (this.checked)
                            scope.syncArray.push(scope.syncValue);
                    });

                    scope.$watch('syncArray', function () {
                        scope.syncItem.$_selected = $.inArray(scope.syncValue, scope.syncArray) != -1;
                    });
                }
            };
        }])

        // The purpose of this directive is to avoid infinite loops with nested templates.
        // This happens because Angular is eager to compile nested directives even if they are not being used (for example, when they're in an IF statement).
        .directive('dnnsfCalldirective', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', function ($compile, $timeout, $parse, $sce, dnnsf) {
            return {
                restrict: 'A',
                scope: true,
                replace: true,
                template: '',
                link: function (scope, element, attrs) {

                    // pass all marked attributes to nested directive
                    var tplEl = $('<div>');
                    for (var i in element[0].attributes) {
                        var name = element[0].attributes[i].name;
                        if (name && name.indexOf('pass-') != -1)
                            tplEl.attr(name.replace('pass-', ''), element[0].attributes[i].value);
                    }

                    var tpl = $('<div>').append(tplEl).html();
                    $compile(tpl)(scope, function (cloned, scope) {
                        element.append(cloned);
                    });
                }
            }
        }])

        .factory('actionCredentials', ['$http', '$q', 'dnnsf', function ($http, $q, dnnsf) {
            return {
                groupsDictionary: {},
                toggleExpr: function (itemParam) {
                    itemParam.Group && (itemParam.Group = "");
                    itemParam.EntireGroup = false;
                    itemParam.IsExpression = !itemParam.IsExpression;
                },
                initModel: function (p, itemParameters) {
                    p.$_cleanHashKey = dnnsf.uniqueId('');
                    itemParam = itemParameters[p.Id];
                    settings = p.Settings;
                    if (itemParam == null || itemParam instanceof String || typeof itemParam == 'string')
                        itemParam = itemParameters[p.Id] = {};
                    if (!itemParam.Type || itemParam.Type != settings['Type'])
                        itemParameters[p.Id].Type = settings['Type'];

                    if (!itemParam.Group)
                        itemParameters[p.Id].Group = '';

                    if (!itemParam.EntireGroup)
                        itemParameters[p.Id].EntireGroup = false;
                },
                getGroups: function (type, itemParam) {

                    if (this.groupsDictionary[type]) {
                        return this.groupsDictionary[type];
                    }

                    this.groupsDictionary[type] = {};
                    var _that = this;

                    $http.get(dnnsf.adminApi('GetCredentialGroups', { TypeName: itemParam.Type }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
                        .then(function (response) {
                            $.each(response.data, function (idx, group) {
                                group.Children = null;
                            });
                            _that.groupsDictionary[type] = response.data;
                            if (!itemParam.Group && !itemParam.IsExpression && response.data[0])
                                itemParam.Group = response.data[0].Value || '';
                        });
                    return this.groupsDictionary[type];
                },
                getEntries: function (type, selectionMode, groupId, itemParam) {

                    if (groupId == '') return [];
                    var group = this.groupsDictionary[type];
                    if (group)
                        group = _.find(group, function (grp) { return grp.Value == groupId; });
                    if (group && group.Children) {
                        if (group.Children.length) {
                            itemParam.Entry = group.Children[0].Value || '';
                        }
                        return group.Children;
                    }

                    if (!group) return [];

                    group.Children = [];
                    $http.get(dnnsf.adminApi('GetCredentialEntries', { GroupId: groupId }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
                        .then(function (response) {
                            group.Children = response.data;

                            if (!itemParam.Entry && response.data[0]) {
                                if (selectionMode.toLowerCase() != 'multiple') {
                                    itemParam.EntireGroup = false;
                                }
                                if (!itemParam.EntireGroup && !itemParam.IsExpression)
                                    itemParam.Entry = response.data[0].Value || '';
                            }
                        });
                    return group.Children;
                },
                updateEntireGroup: function (pId, selectionMode, itemParameters) {
                    var itemParam = itemParameters[pId];
                    itemParam.EntireGroup = selectionMode.toLowerCase() == 'multiple' && (!itemParam.Entry || itemParam.Entry == '');
                },
                groupOnChange: function (type, itemParams) {
                    var group = this.groupsDictionary[type];
                    if (group)
                        group = _.find(group, function (grp) { return grp.Value == itemParams.Group; });

                    itemParams.Entry = '';
                    itemParams.EntireGroup = true;

                    if (group && group.Children)
                        group.Children = null;
                },
                initIframe: function (p, modalSelector, dismissCallback) {
                    $(modalSelector).on('shown.bs.modal', function () {
                        window.top.postMessage(JSON.stringify({
                            type: dnnsf.urlParam('comm-prefix') + "-scroll",
                            offset: scroll
                        }), "*");
                    })
                    if (!p.$_modalBind) {
                        var _that = this;
                        p.$_modalBind = true;
                        $(modalSelector).on('hidden.bs.modal', function (e) {
                            _that.groupsDictionary[p.Settings.Type] = null;
                            dismissCallback && dismissCallback();
                        });
                    }
                    return dnnsf.commonUrl + '/CredentialManager.aspx?product=' + dnnsf.productCode + "&type=" + p.Settings.Type + "&_alias=" + encodeURIComponent(dnnsf.urlParam('_alias')) + "&portalid=" + dnnsf.urlParam('portalid') + "&_tabid=" + dnnsf.urlParam('_tabid') + "&_mid=" + dnnsf.urlParam('_mid');
                }
            }
        }])
        // usage: item should be an action/field/button/etc, with the Parameters property populated with at least one key
        // hint: use dnnsf.initParameters to also setup default values for the Parameters
        .directive('dnnsfParams', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', 'actionCredentials', function ($compile, $timeout, $parse, $sce, dnnsf, actionCredentials) {
            return {
                restrict: 'A',
                scope: {
                    params: '=dnnsfParams',
                    item: '=dnnsfItem',
                    fields: '=dnnsfFields',
                    fieldFilters: '=dnnsfFieldFilters',
                    itemParameters: '=?',
                    useActionInfo: '=?dnnsfUseActionInfo',
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/parameter.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {
                    $timeout(function () { dnnsfjQuery('[data-toggle="tooltip"]').tooltip(); }, 1000);
                    scope.localize = g_localize;
                    scope.$sce = $sce;
                    scope.dnnsf = dnnsf;
                    scope.actionCredentials = actionCredentials;

                    // this is for the rich text editor parameter, called on its 'append all fields' button click
                    scope.appendData = function (item, pId) {
                        // append all fields
                        var data = '';
                        $.each(scope.fields, function (i, field) {
                            if (field.Def && field.Def.Settings.HasValue == 'false') //.InputTypeStr == 'button' || field.InputTypeStr == 'image-button' || field.InputTypeStr == 'button-group'
                                //|| field.InputTypeStr == 'progressbar' ||field.InputTypeStr == 'captcha' || field.InputTypeStr == 'upload.single')
                                return;
                            data += field.Title + ': [' + (field.BoundName || field.RefName) + ']<br />';
                        });

                        if (scope.itemParameters)
                            scope.itemParameters[pId] = (scope.itemParameters[pId] || '') + data;
                    };

                    // this is for the rich text editor parameter, called on its 'append one field' dropdown button click
                    scope.appendField = function (field, pId) {
                        var data = field.Title + ': [' + (field.BoundName || field.RefName) + ']<br />';
                        scope.itemParameters[pId] = (scope.itemParameters[pId] || '') + data;
                    };
                    scope.safeParse = function (str) {
                        if (!str) {
                            return true;
                        } else {
                            return scope.$eval(String(str));
                        }
                    }
                    scope.evalShowCondition = function (paramSettings, row) {
                        if (!paramSettings || !paramSettings.ShowCondition)
                            return true;
                        if (row) //for field type grid
                            return eval(String(paramSettings.ShowCondition))
                        return scope.safeParse(paramSettings.ShowCondition);
                    }

                    // backwards compatibility
                    scope.$watch('item', function () {
                        if (scope.item)
                            scope.itemParameters = _.size(scope.item.Parameters) ? scope.item.Parameters : scope.item;
                    }, true);

                    scope.$watch('item', function (newValue, oldValue) {
                        if (scope.item && angular.equals(newValue, oldValue))
                            scope.itemParameters = _.size(scope.item.Parameters) ? scope.item.Parameters : scope.item;
                    });

                    // field filtering functions

                    // filter fields by type(s)
                    scope.byType = function (type) {

                        // make sure types is an array
                        var types = dnnsf.eval(type);
                        types = dnnsf.toArray(types);

                        return function (item) {
                            return types.length == 0 || $.inArray(item.InputTypeStr, types) != -1;
                        };
                    };

                    scope.convertDate = function (id) {
                        var dt = scope.itemParameters[id];
                        if (dt.hasOwnProperty('Date')) {
                            //is date and time field - scheduler
                            dt.Date.indexOf('T') != -1 && (scope.itemParameters[id].Date = dt.Date.substr(0, dt.Date.indexOf('T')));
                        }
                        else if (dt.indexOf('T') != -1) {
                            //date field - user Actions
                            scope.itemParameters[id] = dt.substr(0, dt.indexOf('T'));
                        }
                    }
                    scope.notParentButton = function (action) {
                        return function (item) {
                            return item != action.$_field;
                        };
                    };

                    scope.notInArray = function (arr, currentItem) {
                        return function (input) {
                            var i = $.inArray(input.BoundName, arr);
                            if (i != currentItem && i != -1)
                                return false;
                            return true;
                        };
                    };

                    scope.exceptItem = function (item) {
                        return function (input) {
                            return item != input.BoundName;
                        };
                    };

                    scope.initActionCredentialIframe = function (p, modalSelector) {
                        return actionCredentials.initIframe(p, modalSelector, function () {
                            scope.$apply();
                        });
                    };

                    scope.injectGetterSetter = function (pId) {
                        scope.$watch('itemParameters', function (newValue, oldValue) {
                            if (newValue) {
                                var stringToBool = function (input) {
                                    return typeof input === 'boolean' && input || (input ? JSON.parse(input.toLowerCase()) : false);
                                }
                                //                                                               GET                        SET
                                var getterSetter = function (newVal) { return arguments.length ? (newValue[pId] = newVal) : stringToBool(newValue[pId]); }

                                if (!newValue['$_' + pId] || typeof newValue['$_' + pId] !== 'function')
                                    newValue['$_' + pId] = getterSetter;
                            }
                        });
                    };
                }
            };
        }])


        .directive('dnnsfParamList', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', function ($compile, $timeout, $parse, $sce, dnnsf) {
            return {
                restrict: 'A',
                scope: {
                    params: '=',
                    item: '=',
                    fields: '=',
                    values: '='
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/parameter-list.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {
                    scope.localize = g_localize;
                    scope.$sce = $sce;

                    function setDefaults() {
                        if (!scope.params || !scope.values)
                            return;
                        $.each(scope.params, function (i, param) {
                            if (!scope.values[param.Id])
                                scope.values[param.Id] = { Name: param.Id, Value: g_localizeMaybeJson(param.DefaultValue) };
                        });
                    }

                    // make sure all paramters are initialized
                    scope.$watch('params', function () {
                        setDefaults();
                    });

                    var noBubble;
                    scope.$watch('values', function () {
                        setDefaults();
                    });


                }
            };
        }])

        .directive('dnnsfRenderParam', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', function ($compile, $timeout, $parse, $sce, dnnsf) {
            return {
                restrict: 'A',
                //require: 'ngModel',
                scope: {
                    def: '=',
                    item: '=',
                    container: '=',
                    model: '=',
                    fields: '='
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/parameter2.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {

                    scope.localize = g_localize;
                    scope.$sce = $sce;
                }
            };
        }])

        .directive('dnnsfInitparam', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', function ($compile, $timeout, $parse, $sce, dnnsf) {
            return {
                restrict: 'A',
                //require: 'ngModel',
                scope: {
                    parametersContainer: '=',
                    parameterDef: '='
                },
                link: function (scope, element, attrs) {
                    scope.localize = g_localize;

                    var paramValue = scope.parametersContainer[scope.parameterDef.Id];
                    switch (scope.parameterDef.Type) {
                        case 'ActionList':
                            paramValue = paramValue || [];
                            break;

                        default:
                            paramValue = paramValue || { Value: scope.localize(scope.parameterDef.DefaultValue) || '', IsExpression: false }
                            break;
                    }

                    scope.parametersContainer[scope.parameterDef.Id] = paramValue;
                }
            };
        }])

        .directive('dnnsfModal', ['dnnsf', function (dnnsf) {
            return {
                restrict: 'A',
                scope: {
                    settings: '=dnnsfModalSettings',
                    item: '=dnnsfItem'
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/modal.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {
                    var el = $(element.find('.modal'));
                    scope.$on('displayModal', function (e, visible) {
                        el.modal(visible ? 'show' : 'hide');
                    })
                    if (scope.settings.onCloseEvent)
                        el.on('hidden.bs.modal', function () {
                            scope.$emit('modalClosed');
                        })
                    el.on('shown.bs.modal', function (e) {
                        if ($(el).closest('div[data-dnnsf-modal]').attr('data-dnnsf-item', 'clonedJobs').length || $(el).closest('div[data-dnnsf-modal]').attr('data-dnnsf-item', 'clonedMethod').length) {
                            $(el).find('.modal-dialog').css({ 'top': '50%', 'right': '50%', 'transform': 'translate(50%, -50%)', 'position': 'absolute' });
                        }
                        else if (window.self !== window.top && !$(document).scrollTop() && !($(el).closest('div[data-dnnsf-modal]').attr('data-dnnsf-item', 'clonedJobs').length) && !($(el).closest('div[data-dnnsf-modal]').attr('data-dnnsf-item', 'clonedMethod').length)) {
                            el.css({ 'top': window.top.pageYOffset - 200 });
                            $('body.modal-open').find('.modal-backdrop')
                                .css({ 'height': '100%' })
                                .on('click', function () { el.modal('hide') });
                        }
                    });
                }
            };
        }])

        .filter('searchActions', function () {
            return function (actionList, actionSearchTerms) {
                if (actionSearchTerms) {
                    var lowerTerms = actionSearchTerms.toLowerCase();
                    return _.filter(actionList, function (action) {
                        return action.Title['default'].toLowerCase().indexOf(lowerTerms) !== -1;
                    });
                }
                return actionList || [];
            }
        })

        .directive('dnnsfActions', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', 'sharedData', function ($compile, $timeout, $parse, $sce, dnnsf, sharedData) {
            return {
                restrict: 'A',
                scope: {
                    actions: '=dnnsfActions',
                    fields: '=dnnsfFields',
                    resultActionDefs: '=dnnsfResultDefs',
                    actionDefs: '=dnnsfDefs',
                    actionDefGroups: '=dnnsfDefgroups',
                    eventName: '=?eventName',
                    field: '=?dnnsfField',
                    actionList: '=?dnnsfActionlist',
                    isDisabled: '=?',
                    clientButton: '=?dnnsfClientButton',
                    useActionInfo: '=?dnnsfUseActionInfo',
                    item: '=?dnnsfItem',
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/action-list.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {
                    if (dnnsf.buildDate) {
                        scope.importExportActions = new Date(dnnsf.buildDate).getTime() >= 1509091848000;
                    }
                    scope.sharedData = sharedData;
                    scope.clientButton == undefined && (scope.clientButton = false);
                    scope.localize = g_localize;
                    scope.$sce = $sce;
                    scope.toggleAction = function (action) {
                        if (!action.$_uid)
                            action.$_uid = dnnsf.uniqueId('action');
                        action.$_isLoaded = true;
                    }
                    dnnsf.log(scope.actions);
                    _.each(scope.actions, function (action) {
                        dnnsf.initParameters(action.Definition, action.ActionInfo || action);
                    });
                    scope.updateActions = function (e, ui, model) {
                        if (!scope.field)
                            return;
                        $timeout(function () {
                            scope.actionsByEvent[scope.eventName] = scope.actions;
                            scope.field.Actions = [];
                            for (var key in scope.actionsByEvent) {
                                scope.field.Actions = scope.field.Actions.concat(scope.actionsByEvent[key]);
                            }
                        }, 0)
                    }
                    // generate unique ids for each action
                    scope.$watch('actions', function () {
                        if (!scope.actions)
                            return;
                        $.each(scope.actions, function (i, action) {
                            if (action.EventName == "BulkAction" && scope.item)
                                scope.item.hasBulkEdit = _.findIndex(scope.actions, function (action) {
                                    return (action.ActionInfo.ActionType == "DataSource.InlineAdd" || action.ActionInfo.ActionType == "DataSource.InlineEdit") && !action.IsDeleted
                                }) != -1;
                            action.$_uid = dnnsf.uniqueId('action');
                        });
                        if (sharedData.flushNotSupported) {
                            scope.checkForFlushableActions();
                        }
                    }, true);
                    scope.$watch('clientButton', function (newValue, oldValue) {
                        if (newValue != oldValue) {
                            $.each(scope.actions, function (i, action) {
                                action.IsDeleted = !(scope.actionDefs[action.ActionInfo.ActionType || action.ActionType].IsClientAction == newValue)
                            });
                        }
                    });

                    scope.preventDropdownEvents = function (event) {
                        event.stopPropagation();
                        event.preventDefault();
                    }

                    $(window).click(function () {
                        $('ul.dropdown-menu').removeClass('hover');
                        $('.action-selected').removeClass('action-selected');
                    });

                    scope.actionsDropdownOpened = function (event) {
                        $(document).on('click.handleDropdown', (function (e) {
                            if (e.target !== event.target) {
                                this.actionSearchTerms = '';
                                $(document).off('click.handleDropdown');
                            }
                        }).bind(this));

                        setTimeout(function () {

                            var actionListDropdown = $(event.currentTarget).siblings('ul.dropdown-menu');
                            actionListDropdown.find('input.action-search').focus();

                            $(document).off('keyup.actionList');

                            $(document).on('keyup.actionList', function (e) {
                                var listItems = $('.action-category').not(':hidden');
                                var subListItems = $('.action-category-item').not(':hidden');
                                var searchItems = $('.action-search-item').not(':hidden');

                                var actionSelected = $('.action-selected', actionListDropdown);

                                switch (e.which) {
                                    case 38: { // UP ARROW
                                        if (!actionSelected.length) {
                                            searchItems.last().addClass('action-selected'); // when you have something in search input
                                            if (subListItems.length) {
                                                subListItems.last().addClass('action-selected');
                                                return;
                                            }
                                            listItems.last().addClass('action-selected'); // when you don't have something in search input
                                            listItems.last().next('ul').addClass('hover');
                                        } else {
                                            var prevSelection = actionSelected;
                                            prevSelection.removeClass('action-selected');
                                            prevSelection.next('ul').removeClass('hover');
                                            var nextSelection;

                                            if (searchItems.length) {
                                                $.each(searchItems, function (index, searchItem) {
                                                    if (searchItem === prevSelection[0]) {
                                                        nextSelection = searchItems[index - 1];
                                                        return;
                                                    };
                                                });
                                            } else {
                                                $.each(subListItems, function (index, subListItem) {
                                                    if (subListItem === prevSelection[0]) {
                                                        nextSelection = subListItems[index - 1];
                                                        return;
                                                    };
                                                });
                                            }

                                            $.each(listItems, function (index, searchItem) {
                                                if (searchItem === prevSelection[0]) {
                                                    nextSelection = listItems[index - 1];
                                                    return;
                                                };
                                            });

                                            $(nextSelection).addClass('action-selected');
                                            $(nextSelection).next('ul').addClass('hover');
                                        }
                                        break;
                                    }
                                    case 40: { // DOWN ARROW
                                        if (!actionSelected.length) {
                                            searchItems.first().addClass('action-selected'); // when you have something in search input
                                            if (subListItems.length) {
                                                subListItems.first().addClass('action-selected');
                                                return;
                                            }
                                            listItems.first().addClass('action-selected'); // when you don't have something in search input
                                            listItems.first().next('ul').addClass('hover');
                                        } else {
                                            var prevSelection = actionSelected;
                                            prevSelection.removeClass('action-selected');
                                            prevSelection.next('ul').removeClass('hover');
                                            var nextSelection;

                                            if (searchItems.length) {
                                                $.each(searchItems, function (index, searchItem) {
                                                    if (searchItem === prevSelection[0]) {
                                                        nextSelection = searchItems[index + 1];
                                                        return;
                                                    };
                                                });
                                            } else {
                                                $.each(subListItems, function (index, subListItem) {
                                                    if (subListItem === prevSelection[0]) {
                                                        nextSelection = subListItems[index + 1];
                                                        return;
                                                    };
                                                });
                                            }

                                            $.each(listItems, function (index, searchItem) {
                                                if (searchItem === prevSelection[0]) {
                                                    nextSelection = listItems[index + 1];
                                                    return;
                                                };
                                            });

                                            $(nextSelection).addClass('action-selected');
                                            $(nextSelection).next('ul').addClass('hover');
                                        }

                                        break;
                                    }

                                    case 37: { //LEFT ARROW
                                        if (actionSelected.hasClass('action-selected')) {
                                            var parentCategory = actionSelected.closest('ul').parents().eq(1);
                                            actionListDropdown = parentCategory;
                                            actionSelected.removeClass('action-selected');
                                            actionSelected.closest('ul').siblings('a').addClass('action-selected');
                                        }
                                        break;
                                    }

                                    case 39: { //RIGHT ARROW
                                        if (actionSelected.next('ul').hasClass('hover')) {
                                            var parentAction = actionSelected.siblings('ul.dropdown-menu');
                                            actionListDropdown = parentAction;
                                            parentAction.closest('li').children().first().removeClass('action-selected');
                                            parentAction.children().first().find('a').addClass('action-selected');
                                        }
                                        break;
                                    }
                                    case 13: { // ENTER KEY
                                        actionSelected.click();
                                        actionSelected.removeClass("action-selected");
                                        actionSelected.parents().eq(1).removeClass("hover");
                                        setTimeout(function () {
                                            $('#btnAddField').parent().removeClass('open');
                                        }, 0);
                                        break;
                                    }
                                    case 27: { // ESC KEY
                                        actionSelected.removeClass("action-selected");
                                        actionSelected.parents().eq(1).removeClass("hover");
                                        actionSelected.parents().find('div.btn-group.open').click();
                                        break;
                                    }
                                }
                            });
                        }, 0);
                    }

                    scope.addAction = function (actionType, action) {
                        if (!action) {
                            action =
                                scope.useActionInfo ?
                                    {
                                        Id: -1,
                                        $_uid: dnnsf.uniqueId('action'),
                                        ActionInfo: {
                                            Parameters: {},
                                            ActionType: actionType.Id
                                        },
                                        EventName: scope.eventName,
                                        $_isOpen: true,
                                        $_isLoaded: true,
                                        $_isFocus: true,
                                        Definition: { IsClientAction: actionType.IsClientAction }
                                    } :
                                    {
                                        Id: -1,
                                        $_uid: dnnsf.uniqueId('action'),
                                        EventName: scope.eventName,
                                        Parameters: {},
                                        ActionType: actionType.Id,
                                        $_isOpen: true,
                                        $_isLoaded: true,
                                        $_isFocus: true,
                                        Definition: { IsClientAction: actionType.IsClientAction, Settings: actionType.Settings }
                                    }
                                ;


                            dnnsf.initParameters(actionType, action.ActionInfo || action);
                        }
                        else {
                            if (scope.useActionInfo && !action.ActionInfo) {
                                action.ActionInfo = {
                                    Description: action.Description,
                                    Condition: action.Condition,
                                    ActionErrorMessage: action.ActionErrorMessage,
                                    Parameters: action.Parameters,
                                    ActionType: action.ActionType
                                }
                            } else {
                                action.ActionInfo && $.extend(action, action.ActionInfo)
                            }
                            action.EventName = scope.eventName;
                        }
                        if (!scope.useActionInfo) {
                            delete action.ActionInfo;
                        }
                        scope.actions.push(action);
                        if (scope.field)
                            scope.updateActions();

                        $timeout(function () {
                            var actionDescriptionElement = $('#collapse' + action.$_uid + ' .description-input');
                            if (window.top === window) {
                                dnnsf.scrollTo($('#collapse' + action.$_uid).offset().top - 120 + 'px');
                            }
                            actionDescriptionElement.focus();
                        }, 100);
                    };
                    scope.checkForFlushableActions = function () {
                        var hasFlushableActions = _.any(scope.actions, function (action, i) {
                            var actionType = scope.useActionInfo ? action.ActionInfo.ActionType : action.ActionType;

                            if (_.has(scope.actionDefs[actionType], 'Settings.IsFlushableAction'))
                                return !action.IsDeleted && scope.$eval(scope.actionDefs[actionType].Settings.IsFlushableAction) == true;
                        });
                        return hasFlushableActions;
                    };

                    function displayModal(visible) {
                        setTimeout(function () {
                            scope.$broadcast('displayModal', visible);
                        }, 500)
                    }
                    scope.$on('modalClosed', function () {
                        scope.showModal = false;
                    })

                    scope.exportAction = function (action) {
                        scope.showModal = true;
                        var newAction = scope.cloneAction(action.ActionInfo || action, true);
                        scope.clonedAction = {
                            Parameters: { 'Action': JSON.stringify(newAction,null, 4) }
                        };
                        scope.modalSettings = {
                            'onCloseEvent': true,
                            'buttons': [
                                {
                                    'text': 'Copy',
                                    'cssClass': 'btn btn-info',
                                    'onClick': function ($event, a) {
                                        $($event.currentTarget).closest('.modal').find('textarea').select();
                                        document.execCommand("copy");
                                        $($event.currentTarget).text('Copied');
                                        setTimeout(function () {
                                            $($event.currentTarget).text('Copy');
                                        }, 800)
                                    }
                                }
                            ],
                            'modalTitle': 'Export Action',
                            'params': [{
                                "Id": "Action",
                                "Title": {
                                    "default": "Action JSON"
                                },
                                "HelpText": {
                                    "default": ""
                                },
                                "Type": "Code",
                                "Settings": { "CodeMirrorMode": "json" }
                            }]

                        };
                        displayModal(true);
                    }
                    var isValidAction = function (str) {
                        var defaultError = { "errors": { "actionError": "Please enter a valid action" }, "action": false };
                        var action, parentType;
                        var errors = {};
                        try {
                            action = JSON.parse(str);
                            parentType = action.ActionType || action.ActionInfo.ActionType;
                        } catch (e) {
                            return defaultError;
                        }
                        if ($.isEmptyObject(action) || action == [] || !action)
                            return defaultError;
                        if (!scope.actionDefs[parentType]) {
                            var msg = { "errors": {}, "action": false }
                            msg.errors[parentType] = "";
                            return msg;
                        }
                        checkActionLists(action);
                        function checkActionLists(act) {
                            var valid = true;
                            var params = act.Parameters || act.ActionInfo.Parameters;
                            var type = act.ActionType || act.ActionInfo.ActionType;
                            var actionLists = _.reduce(scope.actionDefs[type].Parameters,
                                function (list, action, index) {
                                    if (action.Type == "ActionList") {
                                        list.push(action.Id);
                                    }
                                    return list;
                                }, []);
                            actionLists.every(function (v) {
                                var toRemove = [];
                                $.each(params[v], function (j, k) {
                                    var childType = k.ActionType || k.ActionInfo.ActionType;
                                    if (!scope.actionDefs[childType]) {
                                        toRemove.push(j);
                                        if (!errors[type])
                                            errors[type] = '';
                                        errors[type] += (errors[type] ? '\n' : ' => ') + v + ' => ' + childType;
                                        valid = false;
                                    }
                                    else checkActionLists(k);
                                });
                                if (toRemove.length) {
                                    params[v] = params[v].filter(function (value, index) {
                                        return toRemove.indexOf(index) == -1;
                                    })
                                }
                            })
                        }
                        return {
                            'action': action,
                            'errors': errors
                        };
                    }
                    scope.importAction = function () {
                        scope.showModal = true;
                        scope.clonedAction = {
                            Parameters: { 'Action': "" }
                        };
                        scope.modalSettings = {
                            'onCloseEvent': true,
                            'buttons': [
                                {
                                    'text': 'Import',
                                    'cssClass': 'btn btn-info',
                                    'onClick': function ($event, item) {
                                        var checkedAction = isValidAction(item.Parameters.Action);
                                        if (checkedAction.errors && !$.isEmptyObject(checkedAction.errors)) {
                                            var msg;
                                            if (checkedAction.errors.actionError)
                                                return alert(checkedAction.errors.actionError);
                                            else {
                                                msg = 'The following actions are not compatible with this module and they will not be imported. Do you want to continue?\n';
                                                $.each(checkedAction.errors, function (i, v) {
                                                    msg += i + v + '\n';
                                                })
                                            }
                                            if (confirm(msg) == true && checkedAction.action) {
                                                scope.addAction(null, checkedAction.action);
                                            } else {
                                                displayModal(false);
                                            }
                                        } else {
                                            $.extend(checkedAction.action, {
                                                $_uid: dnnsf.uniqueId('action'),
                                                $_isOpen: true,
                                                $_isLoaded: true,
                                                $_isFocus: true
                                            });
                                            scope.addAction(null, checkedAction.action);
                                        }
                                        displayModal(false);
                                    }
                                }
                            ],
                            'modalTitle': 'Import Action',
                            'params': [{
                                "Id": "Action",
                                "Title": {
                                    "default": "Action JSON"
                                },
                                "HelpText": {
                                    "default": ""
                                },
                                "Type": "Code",
                                "Settings": { "CodeMirrorMode": "json" }
                            }]
                        };

                        displayModal(true);

                    }
                    scope.checkFinal = function (action) {
                        if (!scope.actionDefs[action.ActionType || action.ActionInfo.ActionType])
                            return false;
                        var actionsByEvent = action.EventName ? _.filter(scope.actions, ['EventName', action.EventName]) : scope.actions;
                        return scope.actionDefs[action.ActionType || action.ActionInfo.ActionType].Final && !action.Condition && $.inArray(action, actionsByEvent) != actionsByEvent.length - 1;
                    };

                    scope.cloneAction = function (action, exportAction) {

                        var newAction = $.extend({}, angular.copy(action), { Id: -1, });

                        newAction.ActionInfo && (newAction.ActionInfo.Id = -1);
                        var actionType = action.ActionType || action.ActionInfo.ActionType;

                        newAction.Title = g_localize(scope.actionDefs[actionType].Title);
                        dnnsf.initParameters(scope.actionDefs[actionType], newAction.ActionInfo || newAction);
                        if (exportAction) {
                            return {
                                "Title": newAction.Title,
                                "ActionType": actionType,
                                "Description": newAction.Description,
                                "Condition": newAction.Condition,
                                "Parameters": newAction.Parameters
                            }
                        }
                        else {
                            $.extend(newAction, {
                                $_uid: dnnsf.uniqueId('action'),
                                $_isOpen: true,
                                $_isLoaded: true,
                                $_isFocus: true
                            });

                            scope.actions.push(newAction);
                        }
                        scope.updateActions();
                    };

                },
                controller: ["$scope", "$http", "sharedData", "$timeout", "dnnsf", function ($scope, $http, sharedData, $timeout, dnnsf) {
                    if (!$scope.actionList)
                        return;
                    $scope.actions = [];
                    $scope.sharedData = sharedData;
                    $scope.actionDefs = window.g_actionDefs || dnnsf.actionDefs;
                    $scope.actionDefGroups = {};    //  group actions by category
                    $scope.dnnsf = dnnsf;
                    $scope.onSave = [];
                    $.each($scope.actionDefs, function (i, o) {
                        o.Groups && $.each(o.Groups, function (ig, group) {
                            if (!$scope.actionDefGroups[group])
                                $scope.actionDefGroups[group] = [];
                            $scope.actionDefGroups[group].push(o);
                        });

                        if (!$scope.actionDefGroups[o.Settings['Group']])
                            $scope.actionDefGroups[o.Settings['Group']] = [];

                        $scope.actionDefGroups[o.Settings['Group']].push(o);
                    });

                    $scope.prepareActions = function () {

                        dnnsf.log('preparing actions', $scope.actions);

                        // reset modfied states
                        $scope.actions.watchAllActions && $scope.actions.watchAllActions(); // this clears previous watch
                        //$scope.sharedData.lockChange = true;
                        $.each($scope.actions, function (iAction, action) {

                            action.$_isOpen = false;
                            action.$_uid = dnnsf.uniqueId('action', action.Id);
                            //action.$_field = $scope.field;
                            var actionType = $scope.actionDefs[action.ActionType];
                            if (typeof actionType == "undefined")
                                return;

                            dnnsf.initParameters(actionType, action.ActionInfo || action, true);

                        });
                        $timeout(function () {
                            //$scope.sharedData.lockChange = false;
                        });

                        // setup a watch to show the save button
                        $scope.actions.watchAllActions = $scope.$watch('actions', function (newValue, oldValue) {

                            dnnsf.log('check actions changed for ' + $scope.eventName);
                            if (angular.equals(newValue, oldValue))
                                return;
                            // only call save if not already handled by a button
                            if (!$scope.field && $.inArray($scope.save, $scope.onSave) == -1) {
                                dnnsf.log("onSave handler registered for saving actions of " + $scope.eventName);
                                $scope.onSave.push($scope.save);
                            }
                            dnnsf.log('actions changed for ' + $scope.eventName);
                            // yes, this cope inherits from ActionForm, but there's an assignment happening 
                            //      - this means for objects we get references but for primitive types we get copies
                            // http://stackoverflow.com/questions/14049480/what-are-the-nuances-of-scope-prototypal-prototypical-inheritance-in-angularjs
                            //++$scope.notifyModified(true);
                        }, true); // this last true does a "deep" watch, otherwise angularJs would compare by reference, which never changes in this case here (arrays)

                        // also resent fields ctrl, if it exist as a parent scope (i.e. we're doing the actions under a button)
                        //$timeout(function () {
                        //    $scope.notifyModified(false);
                        //});
                    };

                    $scope.init = function (eventName, title, field, actionList) {

                        $scope.actions.watchAllActions && $scope.actions.watchAllActions(); // this clears previous watch
                        $scope.eventName = eventName;
                        $scope.field = field;
                        $scope.eventFriendlyTitle = title;

                        if (field && !field.Actions) {
                            dnnsf.log('Loading ' + eventName + ' actions from action list ', actionList);
                            $scope.actions = actionList;
                            $scope.prepareActions();
                        } else
                            if (field) {
                                $scope.actionsByEvent = [];
                                $scope.actions = [];
                                dnnsf.log('Loading ' + eventName + ' actions for field ', field);
                                var events = [];
                                $.each(field.Actions, function (i, action) {
                                    events.indexOf(action.EventName) === -1 && events.push(action.EventName);
                                });
                                $.each(events, function (i, evName) {
                                    $scope.actionsByEvent[evName] = _.filter(field.Actions, ['EventName', evName])
                                    if (evName = eventName)
                                        $scope.actions = $scope.actionsByEvent[evName] || [];
                                })
                                $scope.actions && $scope.prepareActions();
                            } else {
                                dnnsf.log('Loading actions for event ' + eventName);
                                loadActions(eventName);
                            }

                    };
                    $scope.init($scope.eventName, null, $scope.field, $scope.actionList);

                    $scope.deleteAction = function (action) {
                        action.IsDeleted = true;
                    };

                    function loadActions(eventName) {
                        $scope.sharedData.loadCount++;
                        $scope.prepareActions();
                        $scope.sharedData.loadCount--;
                        $scope.sharedData.eventActions[eventName] = $scope.actions;
                    }

                    $scope.checkFinal = function (action) {
                        if (!$scope.actionDefs[action.ActionType])
                            return false;
                        return $scope.actionDefs[action.ActionType].Final && !action.Condition && $.inArray(action, $scope.actions) != $scope.actions.length - 1;
                    };

                    $scope.save = function () {

                        if ($scope.field)
                            return; // save already handled
                        $http({
                            method: 'POST',
                            url: dnnsf.adminApi('SaveEventActions', { eventName: $scope.eventName }),
                            data: angular.toJson($scope.actions)
                        }).success(function (data, status) {
                            // update our local copy, since the server may have done some alteration

                            $scope.actions = data;
                            $.each($scope.actions, function (intIndex, objValue) {
                                objValue.$_uid = dnnsf.uniqueId('action', objValue.Id);
                            });

                            // setup a watch to show the save button
                            $scope.prepareActions();
                        });

                        // delete entries right away
                        $scope.actions = $.grep($scope.actions, function (e) { return !e.IsDeleted });

                    };

                }]
            };

        }])


        .directive('dnnsfValidators', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', function ($compile, $timeout, $parse, $sce, dnnsf) {
            return {
                restrict: 'A',
                scope: {
                    validators: '=dnnsfValidators',
                    vldDefs: '=dnnsfDefs'
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/validators.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {

                    scope.localize = g_localize;
                    scope.$sce = $sce;
                    scope.commonUrl = dnnsf.commonUrl;

                    scope.addValidator = function (vldType) {
                        var validator = {
                            Id: -1,
                            $_uid: 'vld' + new Date().getTime(),
                            Parameters: {},
                            Type: vldType.Id,
                            $_isOpen: true,
                            $_isLoaded: true,
                            $_isFocus: true
                        };

                        // copy defaults
                        $.each($.grep(vldType.Parameters, function (e) { return e.DefaultValue; }), function (intIndex, objValue) {
                            var val = g_localizeMaybeJson(objValue.DefaultValue);
                            validator.Parameters[objValue.Id] = val;
                        });

                        dnnsf.initParameters(vldType, validator);
                        scope.validators.push(validator);
                    };

                }
            };
        }])

        .directive('dnnsfRequired', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', function ($compile, $timeout, $parse, $sce, dnnsf) {
            return {
                restrict: 'A',
                scope: {
                    required: '=dnnsfRequired'
                },
                //templateUrl: 'static/dnnsf/tpl/validators.html?v=' + dnnsf.env.version,
                require: 'ngModel',
                replace: false,
                link: function (scope, element, attrs, ngModelCtrl) {

                    scope.localize = g_localize;
                    scope.$sce = $sce;

                    scope.$watch('required', function () {
                        //element.css('border-left', '3px solid #d9534f');
                    });

                    console.log(scope.required);
                    scope.addValidator = function (vldType) {
                        var validator = {
                            Id: -1,
                            $_uid: 'vld' + new Date().getTime(),
                            Parameters: {},
                            Type: vldType.Id,
                            $_isOpen: true,
                            $_isLoaded: true,
                            $_isFocus: true
                        };

                        // copy defaults
                        $.each($.grep(vldType.Parameters, function (e) { return e.DefaultValue; }), function (intIndex, objValue) {
                            var val = g_localizeMaybeJson(objValue.DefaultValue);
                            validator.Parameters[objValue.Id] = val;
                        });

                        scope.validators.push(validator);
                    };

                }
            };
        }])

        // fancy file picker
        .directive('dnnsfFilepicker', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', 'dataSources', function ($compile, $timeout, $parse, $sce, dnnsf, dataSources) {
            return {
                restrict: 'A',
                scope: {
                    ngModel: '='
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/filepicker.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {
                    scope.dnnsf = dnnsf;
                    scope.$sce = $sce;
                    scope.singleSelect = attrs.dnnsfPickermode == 'Single';

                    // load seleceted files
                    scope.selectedFiles = scope.ngModel ? angular.copy(scope.ngModel) : [];

                    scope.openFolder = function (folder) {

                        scope.currentFolder = folder;

                        // build breadcrumbs
                        scope.breadcrumbs = [folder];
                        var parent = folder.$_parent;
                        while (parent) {
                            scope.breadcrumbs.splice(0, 0, parent);
                            parent = parent.$_parent;
                        }

                        // get data from the server
                        scope.loading = true;
                        dataSources.callForData({
                            dataSource: 'FilesInFolder',
                            folderId: folder.Value
                        }, function (data) {
                            scope.files = data;

                            // mark selected files
                            var filesInFolder = $.grep(scope.selectedFiles, function (o, i) { return o.Filter == folder.Value; });
                            if (filesInFolder) {
                                var matches = 0
                                for (var i = 0; i < scope.files.length; i++) {
                                    for (var j = 0; j < filesInFolder.length; j++) {
                                        if (scope.files[i].Value == filesInFolder[j].Value) {
                                            scope.files[i].Selected = true;
                                            filesInFolder[j] = scope.files[i];
                                            matches++;
                                            break;
                                        }
                                    }

                                    // stop if we already matched all selected files in this fodler
                                    if (matches == filesInFolder.length)
                                        break;
                                }

                                //$.each(scope.files, function (i, o) {
                                //    if ($.inArray(o, scope.selectedFiles) != -1)
                                //        o.Selected = true;
                                //});
                            }
                            scope.loading = false;
                        });
                    }

                    scope.updateCount = function (folder, toAdd) {
                        folder.selectedCount = (folder.selectedCount || 0) + toAdd;
                        while (folder) {
                            folder.fullTreeSelectedCount = (folder.fullTreeSelectedCount || 0) + toAdd;
                            folder = folder.$_parent;
                        }
                    };
                    scope.deleteFile = function (index) {
                        scope.ngModel.splice(index, 1);
                        scope.selectedFiles = scope.ngModel;
                    };

                    scope.toggleSelectFile = function (file, bSelect) {

                        file.Selected = bSelect;

                        if (scope.singleSelect) {
                            if (scope.selectedFiles && scope.selectedFiles.length) {
                                scope.selectedFiles[0].Selected = false;

                                // reset counts for all folders
                                function resetCounts(folder) {
                                    folder.selectedCount = folder.fullTreeSelectedCount = 0;
                                    $.each(folder.Children, function (i, folder) {
                                        resetCounts(folder);
                                    });
                                }
                                resetCounts(scope.folder);
                            }
                            scope.selectedFiles = [];
                            if (bSelect)
                                scope.selectedFiles.push(file);
                        } else {

                            // find it in the list - if found and currently unchecked, remove it
                            var found = false;
                            for (var i = 0; i < scope.selectedFiles.length; i++) {
                                if (scope.selectedFiles[i].Value == file.Value) {
                                    if (!bSelect)
                                        scope.selectedFiles.splice(i, 1);
                                    found = true;
                                    break;
                                }
                            }

                            // if not found and currently checked, push it to the list
                            if (!found && bSelect)
                                scope.selectedFiles.push(file);
                        }

                        // the easy way: file is in current folder
                        scope.updateCount(scope.currentFolder, bSelect ? 1 : -1);

                        // update all relevant folders for this file
                        //scope.folder.selectedCount += bSelect ? 1 : -1;
                    };

                    scope.update = function () {
                        scope.ngModel = angular.copy(scope.selectedFiles);
                        scope.editing = false;
                    };

                    scope.getPortalFolders = function () {
                        scope.loading = true;
                        dataSources.callForData({
                            dataSource: 'PortalFolders'
                        }, function (data) {
                            scope.folder = data[0];
                            scope.folder.$_isExpanded = true;

                            // link child folders with their parents
                            function linkChildren(parent) {

                                // update counts
                                var filesInFolder = $.grep(scope.selectedFiles, function (o2, i2) { return o2.Filter == parent.Value; });
                                if (filesInFolder.length)
                                    scope.updateCount(parent, filesInFolder.length);

                                $.each(parent.Children, function (i, folder) {
                                    // link parent
                                    folder.$_parent = parent;

                                    // also link all children
                                    linkChildren(folder);
                                });
                            }

                            linkChildren(scope.folder);

                            // open root folder
                            scope.openFolder(scope.folder);

                            scope.loading = false;
                        });
                    }
                }
            };
        }])


        .directive('dnnsfBgPicker', ['$compile', '$timeout', '$parse', '$sce', 'dnnsf', 'dataSources', function ($compile, $timeout, $parse, $sce, dnnsf, dataSources) {
            return {
                restrict: 'A',
                scope: {
                    model: '=ngModel'
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/bg-picker.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {

                    scope.bg = {};
                    dataSources.callForData({
                        'DataSource': 'BgPatterns'
                    }, function (data) {
                        scope.patterns = data;
                    });

                    dataSources.callForData({
                        'DataSource': 'BgImages'
                    }, function (data) {
                        scope.images = data;
                    });

                    scope.$watch('model', function () {
                        dnnsf.log('model changed', scope.model);
                        if (scope.model == null)
                            return;

                        scope.bg.type = 'None';
                        var css = dnnsf.parseCssBlock(scope.model);
                        dnnsf.log(css);
                        if (css['background-color']) {
                            scope.bg.type = 'Color';
                            scope.bg.color = css['background-color'];
                        } else if (css['background-image']) {
                            var img = css['background-image'];
                            var myRegexp = /url\((.+)\)/g;
                            var match = myRegexp.exec(img);
                            img = match && match.length > 1 ? match[1] : img;

                            if (css['background-repeat'] == 'no-repeat') {
                                scope.bg.type = 'Image';
                                scope.bg.image = img;
                            } else {
                                scope.bg.type = 'Pattern';
                                scope.bg.pattern = img;
                            }
                        }

                    });


                    // watch changes to recompute value
                    scope.$watch('bg', function () {

                        dnnsf.log('bg changed', scope.bg);

                        switch (scope.bg.type) {
                            case 'None':
                                scope.model = '';
                                break;
                            case 'Color':
                                scope.model = 'background-color: ' + (scope.bg.color || 'transparent') + ';';
                                break;
                            case 'Pattern':
                                scope.model = 'background-image: url(' + scope.bg.pattern + '); background-repeat: repeat;';
                                break;
                            case 'Image':
                                scope.model = 'background-image: url(' + scope.bg.image + ');  background-repeat: no-repeat; background-size:cover';
                                break;
                        }

                    }, true);
                }
            };
        }])


        // select picker
        .directive('bsSelectpicker', ['$compile', '$timeout', '$parse', function ($compile, $timeout, $parse) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        $(element).selectpicker();
                    }, 200);
                }
            };
        }])


        // select picker
        .directive('dnnsfFieldSelect', ['$compile', '$timeout', '$parse', 'dnnsf', function ($compile, $timeout, $parse, dnnsf) {
            return {
                restrict: 'A',
                scope: {
                    model: '=ngModel',
                    fields: '=',
                    filterType: '=',
                    currentItem: '='
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/field-select.html?v=' + dnnsf.env.version,
                link: function (scope, element, attrs) {

                    scope.byType = function (type) {

                        // make sure types is an array
                        var types = dnnsf.eval(type);
                        types = dnnsf.toArray(types);

                        return function (item) {
                            return types.length == 0 || $.inArray(item.InputTypeStr, types) != -1;
                        };
                    };

                    scope.exceptItem = function (item) {
                        return function (input) {
                            return item != input.BoundName;
                        };
                    };

                },
                controller: function ($scope) {
                    $scope.checkIfExists = function (model) {
                        if (typeof model === 'object') {
                            return model;
                        } else {
                            var t = false;
                            $.each($scope.fields, function (i, v) {
                                if (v.BoundName == model)
                                    t = true;
                            });
                            return t ? { 'Value': model } : { 'Value': "" }
                        }
                    }
                    $scope.model = $scope.checkIfExists($scope.model);
                }
            };
        }])

        .directive('dnnsfListParameter', ['$timeout', 'dnnsf', function ($timeout, dnnsf) {
            return {
                restrict: 'A',
                scope: {
                    model: '=dnnsfListParameter',
                    def: '=definition'
                },
                templateUrl: dnnsf.commonUrl + '/static/dnnsf/tpl/list-parameter.html?v=' + dnnsf.env.version,
                link: function ($scope, element) {

                    $scope.localize = g_localize;
                    $scope.newValue = '';
                    $scope.editFields = {};

                    $scope.addNewValue = function () {
                        if (!$scope.newValue)
                            return;

                        $scope.model.push($scope.newValue);
                        $scope.newValue = '';
                    };

                    $scope.isEditMode = function (index) {
                        return !$scope.model[index] || $scope.editFields[index];
                    };

                    $scope.setEditMode = function (index) {
                        $scope.editFields[index] = true;
                    };

                    $scope.unsetEditMode = function (index, updatedValue) {
                        // Do not disable edit mode if we do not have a value
                        if (!updatedValue) {
                            // but, if this is the last item, remove it
                            if (index == $scope.model.length - 1)
                                $scope.model.splice(index, 1);
                            return;
                        }

                        // update the model value. we do not have two way binding because of the ngIf directive scope.
                        $scope.model[index] = updatedValue;
                        $scope.editFields[index] = false;
                    };

                    $scope.removeValue = function (index) {
                        $scope.editFields[index] = false;
                        $scope.model.splice(index, 1);
                    };

                    $scope.focus = function (index) {
                        $timeout(function () {
                            var input = element.find('#lp-item-' + index);
                            if (input.length)
                                input.focus();
                        });
                    };

                    var TabKey = 9, EnterKey = 13;
                    $scope.keydownItem = function (event, index, value) {
                        if (event.keyCode != EnterKey)
                            return;

                        event.preventDefault();
                        $scope.unsetEditMode(index, value);
                    };

                    $scope.keydownNewValue = function (event) {
                        if (event.keyCode != TabKey && event.keyCode != EnterKey)
                            return;

                        if (event.keyCode == EnterKey) {
                            event.preventDefault();
                            $scope.addNewValue();
                        }

                        // do not re-focus if the value is empty or the shift key is pressed (e.g. shift + tab)
                        if (!$scope.newValue || event.shiftKey)
                            return;

                        $timeout(function () {
                            event.target.focus();
                        });
                    };
                }
            }
        }])

        .directive('uiShow', function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {

                    var expression = attrs.uiShow;

                    // optional slide duration.
                    var duration = (attrs.uiDuration || "fast");
                    var effect = (attrs.uiEffect || "slide");

                    // check to see the default display of the element based on the link-time value of the model we are watching.
                    if (!scope.$eval(expression)) {
                        element.hide();
                    }

                    // watch the expression in scope context to when it changes - and adjust the visibility of the element accordingly.
                    scope.$watch(
                        expression,
                        function (newValue, oldValue) {

                            // Ignore first-run values since we've already defaulted the element state.
                            if (newValue === oldValue)
                                return;

                            if (newValue) {
                                if (effect == 'fade') {
                                    element.stop(true, true).fadeIn(duration);
                                } else {
                                    element.stop(true, true).slideDown(duration);
                                }
                            } else {
                                if (effect == 'fade') {
                                    element.stop(true, true).fadeOut(duration);
                                } else {
                                    element.stop(true, true).slideUp(duration);
                                }
                            }

                        }
                    );

                }
            };
        })


        // Directives based on http://stackoverflow.com/a/24271309/3894163
        .directive("dnnsfNumberLimits", function () {
            return {
                link: function (scope, element, attributes) {
                    element.on("keydown keyup", function (e) {
                        if (e.keyCode == 46 || e.keyCode == 8) {
                            return;
                        }
                        if (Number(element.val()) > Number(attributes.max)) {
                            e.preventDefault();
                            element.val(attributes.max);
                        }

                        if (Number(element.val()) < Number(attributes.min)) {
                            e.preventDefault();
                            element.val(attributes.min);
                        }
                    });
                }
            };
        })

        .directive('uiFocus', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    scope.$watch(attrs.uiFocus, function (value) {
                        if (value) {
                            $timeout(function () {
                                $(element[0]).focus().select();
                            });
                        }
                    }, true);
                }
            };
        }])

        .directive('ngConfirmClick', [
            function () {
                return {
                    priority: -1,
                    restrict: 'A',
                    link: function (scope, element, attrs) {
                        element.bind('click', function (e) {
                            var message = attrs.ngConfirmClick;
                            if (message && !confirm(message)) {
                                e.stopImmediatePropagation();
                                e.preventDefault();
                            }
                        });
                    }
                }
            }
        ])

        .directive('ngEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.ngEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        })

        .directive('dynamic', ['$compile', function ($compile) {
            return {
                restrict: 'A',
                replace: true,
                link: function (scope, ele, attrs) {
                    scope.$watch(attrs.dynamic, function (html) {
                        ele.html(g_localize(html));
                        $compile(ele.contents())(scope);
                    });
                }
            };
        }]);
}
window.angular ? initDnnsfComponents(angular) : '';
window.dnnsfAngular15 ? initDnnsfComponents(dnnsfAngular15) : '';
