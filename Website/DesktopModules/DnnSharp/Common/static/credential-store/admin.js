;

var $ = dnnsfjQuery;

function g_localize(o) {
    return o ? (o.hasOwnProperty('default') ? o['default'] : o) : "";
}
(function(angular) {

    var app = angular.module('app', ['ngRoute', 'dnnsf', 'dnnsf.components', 'ngSanitize', 'ui.bootstrap'])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
            when('/', { controller: 'CredentialListCtrl', templateUrl: 'static/credential-store/views/main.html?v=' + g_resourceVersion }).
            otherwise({ redirectTo: '/' });
        }]);

    // this is for sharing data
    app.factory('sharedData', ['$http', '$timeout', 'dnnsf', function($http, $timeout, dnnsf) {

        // watch modifications to enable the Save button and display "not saved"s warning
        var fnUnloadModified = function() { return 'Your changes are not saved.' }

        return {
            serverValidators: [],
            resourceVersion: g_resourceVersion,
            eventActions: {},

            // filter fields by type(s)
            byType: function(type) {

                // make sure types is an array
                var types = dnnsf.eval(type);
                types = dnnsf.toArray(types);

                return function(item) {
                    return types.length == 0 || $.inArray(item.InputTypeStr, types) != -1;
                };
            },

            inArray: function(arr) {
                return function(input) {
                    var i = $.inArray(input.BoundName, arr);
                    if (i == -1)
                        return false;
                    return true;
                };
            },

            notInArray: function(arr, currentItem) {
                return function(input) {
                    var i = $.inArray(input.BoundName, arr);
                    if (i != currentItem && i != -1)
                        return false;
                    return true;
                };
            },

            exceptItem: function(item) {
                return function(input) {
                    return item != input.BoundName;
                };
            },

            loaded: false,
            loading: false,
            saving: false,
            modified: false,
            saveDisabled: false,
            invalidFields: {},

            _prepareSettings: function() {

                // init all fields
                var _this = this;
                _this.actionListFields = [];
                if (this.config.Fields) {

                    var fnGetFields = function() {
                        return $.map(_this.config.Fields, function(o, i) { return { BoundName: o.Name, Title: o.Name }; });
                    };

                    $.each(_this.config.Fields, function(i, field) {
                        if (field.IsForm) {
                            _this.config.HasForm = true;
                            $.each(field.FormFields, function(j, formField) {
                                _this.actionListFields.push(formField);
                            })
                        } else {
                            _this.actionListFields.push(field);

                            $.each(field.Validation, function(iVld, vld) {
                                vld.$_uid = 'vld' + vld.Id;
                                vld.getFields = fnGetFields;
                            });
                        }

                    });
                    if (this.config.HasForm)
                        $.each(this.actionListFields, function(i, o) { _this._prepareField(o, 'field'); });
                    $.each(this.config.Fields, function(i, o) { _this._prepareField(o, 'field'); });
                    $.each(this.config.ItemButtons.List, function(i, o) { _this._prepareField(o, 'itemButton'); });
                    $.each(this.config.GridButtons.List, function(i, o) { _this._prepareField(o, 'gridButton'); });
                }
            },

            _prepareField: function(field, baseId) {
                field.BoundName = field.BoundName || field.RefName || field.TitleCompacted;
                // generate unique IDs for all
                field.$_uid = dnnsf.uniqueId(baseId);
                field.AutoName = (field.Title && field.Id == field.Title.replace(/((^[^a-z]*)|([^a-z0-9_]*))/gi, ""));
            },

            load: function(fnReady) {

                // check if already loading the settings
                if (this.loading) {
                    dnnsf.log('load called, but already loading');
                    return;
                }

                // if already loaded, call handler, but not instantly
                if (this.loaded && fnReady) {
                    $timeout(function() {
                        fnReady(this.config);
                    });
                    return;
                }

                this.loading = true;
                var _this = this;

                // Load initial data from the server
                dnnsf.log('fetching data...');
                $http({
                    method: 'GET',
                    url: dnnsf.adminApi('Get')
                }).success(function(data, status) {
                    if (data.error)
                        alert(data.error);

                    dnnsf.log('data retrieved');
                    _this.config = data;

                    _this.loaded = true;
                    _this.loading = false;

                    _this._prepareSettings();
                    fnReady && fnReady(_this.config);
                });

            },

            save: function(fnReady, fnErr) {

                var _this = this;

                $timeout(function() {
                    _this.notifyModified(false);
                    _this.saving = true;
                });

                // flush deleted actions
                this.config.OnDeleteBulk.List = $.grep(this.config.OnDeleteBulk.List, function(item) { return !item.IsDeleted; });
                this.config.OnDeleteItem.List = $.grep(this.config.OnDeleteItem.List, function(item) { return !item.IsDeleted; });
                this.config.ItemButtons.List = $.grep(this.config.ItemButtons.List, function(item) { return !item.IsDeleted; });
                this.config.GridButtons.List = $.grep(this.config.GridButtons.List, function(item) { return !item.IsDeleted; });
                $.each(this.config.ItemButtons.List, function(i, btn) {
                    btn.ItemActions = $.grep(btn.ItemActions, function(item) { return !item.IsDeleted; });
                });
                $.each(this.config.GridButtons.List, function(i, btn) {
                    btn.ItemActions = btn.ItemActions ? $.grep(btn.ItemActions, function(item) { return !item.IsDeleted; }) : [];
                    btn.GridActions = btn.GridActions ? $.grep(btn.GridActions, function(item) { return !item.IsDeleted; }) : [];
                });



                this.error = "";

                $.each(this.config.Fields, function(i, field) {
                    if (field.FieldTypeStr == 'Form') {
                        $.each(field.FormFields, function(i, formField) {
                            formField.FormId = field.Id;
                        });
                    };
                });
                console.log("data for request: ", this.config);
                localStorage.removeItem('preferredTemplate-' + this.config.ModuleId);
                $http({
                    method: 'POST',
                    url: dnnsf.adminApi('Save'),
                    data: dnnsfAngular15.toJson(this.config)
                }).success(function(data, status) {
                    console.log("returned data: ", data);
                    if (data.Error || data.error) {
                        _this.error = data.Error || data.error;
                        fnErr && fnErr(_this.error);
                        alert(_this.error);
                        return;
                    }

                    //// update our local copy, since the server may have done some alteration
                    _this.config = data;
                    _this._prepareSettings();

                    // modified will be set to true as the child EventsCtrl generats and update when setting up the actions
                    $timeout(function() {
                        _this.saving = false;
                        _this.notifyModified(false);
                        fnReady && fnReady(_this.config);
                    });

                });

            },

            notifyModified: function(bModified) {

                dnnsf.log('modified: ' + this.bModified + ' => ' + bModified);
                this.modified = bModified;

                if (bModified) {
                    if (window.addEventListener) {
                        window.addEventListener('beforeunload', fnUnloadModified);
                    } else {
                        window.attachEvent('onbeforeunload', fnUnloadModified);
                    }
                } else {
                    if (window.removeEventListener) {
                        window.removeEventListener('beforeunload', fnUnloadModified);
                    } else {
                        window.detachEvent('onbeforeunload', fnUnloadModified);
                    }
                }
            }
        };
    }]);

    app.controller('CredentialListCtrl', ['$scope', '$http', 'sharedData', '$timeout', '$sce', 'dnnsf', function($scope, $http, sharedData, $timeout, $sce, dnnsf) {
        // init data
        $scope.$sce = $sce;
        $scope.dnnsf = dnnsf;
        $scope.sharedData = sharedData;
        console.log("sharedData", sharedData);
        $scope.dnnsf = dnnsf;

        $scope.entries = {};
        $scope.credentialGroups = [];
        $scope.groupsMarkedForDeletion = [];
        $scope.groupsMarkedForSave = [];


        $http.get(dnnsf.adminApi('GetCredentialTypeDef', { TypeName: dnnsf.urlParam('type') }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
            .then(function(response) {
                $scope.credentialTypeDef = response.data;
            }, function(error) {
                console.error('HTTP Error:', error);
            });

        $scope.addCredentialTypeToDb = function() {
            $http.get(dnnsf.adminApi('AddCredentialType', { TypeName: $scope.typeName }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
                .then(function(response) {
                    $scope.bTypeNameMessage = response.data;
                    if (response.data === true) {
                        $scope.typeNameMessage = 'Successfully added ' + $scope.typeName + ' to database!';
                    } else {
                        $scope.typeNameMessage = 'Failed to add credential type ' + $scope.typeName + ' to database because you are not an Administrator.';
                    }
                    $timeout(function() {
                        location.reload(true);
                    }, 2000)
                }, function(error) {
                    console.error('HTTP Error:', error);
                })
        }

        $scope.loadGroups = function() {
            $scope.typeName = dnnsf.urlParam('type');

            $http.get(dnnsf.adminApi('GetCredentialGroups', { TypeName: $scope.typeName }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
                .then(function(response) {
                    $.each(response.data, function(idx, group) {
                        group.Children = null;
                    });
                    if (response.data.error) {
                        $scope.typeNameError = response.data.error.message;
                        $scope.canInteract = response.data.canInteract || false;
                    } else {
                        $scope.credentialGroups = response.data;
                    }
                }, function(error) {
                    console.error('HTTP Error:', error);
                });
        };
        $scope.loadGroups();

        $scope.toggleGroup = function($event, group) {
            var toggler = angular.element($event.currentTarget);
            var targetAccordion = $(toggler.data('target'));

            if (targetAccordion.hasClass('in'))
                group.isOpen = true;
            else
                group.isOpen = false;

            if (group.isOpen)
                $scope.closeGroup(group);

            // toggle
            group.isOpen = !group.isOpen;
        }

        $scope.toggleEntry = function($event, entry) {
            var toggler = angular.element($event.currentTarget);
            var targetAccordion = $(toggler.data('target'));

            if (targetAccordion.hasClass('in'))
                entry.isOpen = true;
            else
                entry.isOpen = false;

            if (entry.isOpen)
                $scope.closeEntry(entry.Value);

            // toggle
            entry.isOpen = !entry.isOpen;
        }

        $scope.getEntries = function(group) {
            if (!group) return [];
            if (group.Children)
                return group.Children;
            if (!group.Value || group.Value == "")
                return [];

            group.Children = [];
            $http.get(dnnsf.adminApi('GetCredentialEntries', { GroupId: group.Value }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
                .then(function(response) {
                    group.Children = response.data;
                }, function(error) {
                    console.error('HTTP Error:', error);
                });
            return group.Children;
        }

        $scope.closeGroup = function(group) {
            if(group.Children)
                $.each(group.Children, function(idx, entry) {
                    $scope.closeEntry(entry.Value);
                });
            group.Children = null;
        }

        $scope.addGroup = function() {
            var grp = {
                Text: 'New Group',
                Value: '',
                Children: [],
                Settings: {}
            };
            $scope.credentialGroups.push(grp);
            $scope.markGroupForSave(grp);
        }

        $scope.getEntryData = function(entry) {
            var entryId = entry.Value;
            if (!entryId || entryId == "")
                return $scope.entries['$_' + entry.$$hashKey] || ($scope.entries['$_' + entry.$$hashKey] = {});

            if ($scope.entries[entryId])
                return $scope.entries[entryId];

            $scope.entries[entryId] = {};
            $http.get(dnnsf.adminApi('GetEntryData', { entryId: entryId }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
                .then(function(response) {
                    $scope.entries[entryId] = response.data;
                }, function(error) {
                    console.error('HTTP Error:', error);
                });
            return $scope.entries[entryId];
        }

        $scope.saveEntry = function(group, entry) {
            if (!entry.Text)
                return;
            if ($scope.groupsMarkedForSave.indexOf(group) > -1) {
                $scope.saveGroup(group, function(response) { $scope.saveEntry(group, entry); });
                return;
            }

            var model = $scope.getEntryData(entry);
            $http.post(dnnsf.adminApi('SaveEntry', { groupId: group.Value, entryId: entry.Value, entryName: entry.Text }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }), model)
                .then(function(response) {

                    if (response.data.error) {
                        var error = response.data.error.split('\n')[0];
                        alert('Could not save credential: ' + error);
                        console.error(response.data.error);
                        return;
                    }

                    // clean and update entry
                    delete $scope.entries[entry.Value];
                    $scope.entries[response.data.entryId] = response.data.model;
                    entry.Value = response.data.entryId;
                    entry.Text = response.data.entryName;

                    // toggle the accordion as a sign of successful save
                    $scope.closeEntry(entry.Value);
                    var grpIdx = $scope.credentialGroups.indexOf(group);
                    var entIdx = group.Children.indexOf(entry);
                    $('#CredentialsEntry-' + grpIdx + '-' + entIdx).collapse('toggle');
                }, function(error) {
                    console.error('HTTP Error:', error);
                });
        }

        $scope.deleteEntry = function(group, idx) {
            var entry = group.Children[idx];
            delete $scope.entries[entry.Value];
            group.Children.splice(idx, 1);
            if (!entry.Value || entry.Value == '')
                return;

            $http.post(dnnsf.adminApi('DeleteEntry', { entryId: entry.Value }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
                .then(function(response) {
                    if (response.error) {
                        group.Children.splice(idx, 0, entry);
                    }
                    // TODO: show error to user, if response.error exists.
                }, function(error) {
                    console.error('HTTP Error:', error);
                });
        }

        $scope.markGroupForDelete = function(group) {
            var saveIdx = $scope.groupsMarkedForSave.indexOf(group);
            if (saveIdx > -1)
                $scope.groupsMarkedForSave.splice(saveIdx, 1);

            var idx = $scope.groupsMarkedForDeletion.indexOf(group);
            if (idx == -1)
                $scope.groupsMarkedForDeletion.push(group);
            else
                $scope.groupsMarkedForDeletion.splice(idx, 1);
        };

        $scope.markGroupForSave = function(group) {
            var delIdx = $scope.groupsMarkedForDeletion.indexOf(group);
            if (delIdx > -1) return;

            var idx = $scope.groupsMarkedForSave.indexOf(group);
            if (idx == -1)
                $scope.groupsMarkedForSave.push(group);
        };

        $scope.updateGroups = function() {
            $scope.saving = true;
            if ($scope.groupsMarkedForDeletion.length)
                $scope.deleteGroups();
            if ($scope.groupsMarkedForSave.length)
                $scope.saveGroups();

            $timeout(function() { $scope.saving = false; }, 400);
        };

        $scope.saveGroup = function(group, successCallback) {
            $http.post(dnnsf.adminApi('SaveGroup', {
                    typeName: dnnsf.urlParam('type'),
                    groupId: group.Value,
                    groupName: group.Text,
                    currentPortal: group.Settings.CurrentPortal
                }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
                .then(function(response) {
                    var idx = $scope.groupsMarkedForSave.indexOf(group);
                    if (idx > -1)
                        $scope.groupsMarkedForSave.splice(idx, 1);
                    group.Value = response.data.groupId;
                    group.Text = response.data.groupName;
                    group.Settings.CurrentPortal = response.data.currentPortal;

                    // toggle the accordion as a sign of successful save
                    var grpIdx = $scope.credentialGroups.indexOf(group);
                    $('#Credentials-' + grpIdx).collapse('toggle');

                    successCallback && successCallback(response);
                }, function(error) {
                    console.error('HTTP Error:', error);
                });
        }

        $scope.saveGroups = function() {
            $.each($scope.groupsMarkedForSave, function(idx, group) {
                $scope.saveGroup(group, function() {
                    if (!$scope.groupsMarkedForSave.length && !$scope.groupsMarkedForDeletion.length) {
                        $scope.entries = {};
                        $scope.loadGroups();
                    }
                });
            });
        }

        $scope.deleteGroups = function() {
            $.each($scope.groupsMarkedForDeletion, function(idx, group) {

                if (!group.Value || group.Value == '') {
                    var idx = $scope.credentialGroups.indexOf(group);
                    if (idx > -1)
                        $scope.credentialGroups.splice(idx, 1);
                    return;
                }

                $http.post(dnnsf.adminApi('DeleteGroup', { groupId: group.Value }, { apiUrl: dnnsf.commonUrl + '/CommonApi.ashx' }))
                    .then(function(response) {
                        var idx = $scope.groupsMarkedForDeletion.indexOf(group);
                        if (idx > -1)
                            $scope.groupsMarkedForDeletion.splice(idx, 1);

                        if (!$scope.groupsMarkedForSave.length && !$scope.groupsMarkedForDeletion.length) {
                            $scope.entries = {};
                            $scope.loadGroups();
                        }
                    }, function(error) {
                        console.error('HTTP Error:', error);
                    });
            });
        }

        $scope.addEntry = function(group) {
            group.Children.push({
                Text: 'New Entry',
                Value: ''
            });
        }

        $scope.closeEntry = function(entryId) {
            $scope.entries[entryId] = null;
        }

    }]);

})(dnnsfAngular15);