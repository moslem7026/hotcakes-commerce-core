//codemirror angular directive
(function (angular) {

    angular.module('codemirror', [])
        .directive('codemirror', ['$compile', '$timeout', '$rootScope', function ($compile, $timeout, $rootScope) {
            return {
                transclude: true,
                restrict: 'A',
                require: '?ngModel',
                scope: false,
                link: function (scope, element, attrs, ngModelCtrl) {
                    if (!attrs.id) {
                        attrs.id = dnnsf.uniqueId('cm');
                    }
                    scope.editor = CodeMirror.fromTextArea(element[0], {
                        value: scope.$eval(attrs.ngModel) || "",
                        theme: getTheme(),
                        autoRefresh: true,
                        lineNumbers: true,
                        styleActiveLine: true,
                        matchBrackets: true,
                        lineWrapping: true,
                        autofocus: false,
                        smartIndent: true,
                        autoCloseTags: true,
                        mode: getMode(),
                        autoCloseBrackets: true,
                        matchTags: { bothTags: true },
                        extraKeys: {
                            "F11": function (cm) {
                                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
                            },
                            "Esc": function (cm) {
                                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
                            },
                            "Ctrl-Space": "autocomplete"
                        },
                        gutters: ["CodeMirror-lint-markers"],
                        lint: true
                    });

                    scope.lastEditorValue = '';
                    scope.editor.on('change', function (cm) {
                        scope.lastEditorValue = cm.getValue();
                        ngModelCtrl.$setViewValue(scope.lastEditorValue);

                        if (!scope.$$phase && !$rootScope.$$phase) {
                            scope.$apply();
                        }
                    });

                    // Track the ngModel expression to update the editor when the value changes.
                    // Update the editor only if the newValue of the ngModel is different from the current editor value (scope.lastEditorValue).
                    scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                        if (newValue != undefined && newValue != scope.lastEditorValue) {
                            scope.editor.setValue(newValue);

                            // Set the cursor to the end of the document.
                            var lastLine = scope.editor.lastLine();
                            var lastLineChar = scope.editor.getLine(lastLine).length;
                            scope.editor.setCursor(lastLine, lastLineChar);
                        }
                    });

                    dnnsf.events.on("changeTheme" + attrs.id, function () {
                        scope.editor.setOption('theme', scope.editor.options.theme == 'default' ? 'material' : 'default');
                        if (scope.dnnsf && scope.dnnsf.moduleId) {
                            localStorage.setItem("codemirror" + scope.dnnsf.moduleId, scope.editor.options.theme);
                        }
                    });

                    var themeChanger = $('<a></a>');
                    themeChanger.attr(
                        {
                            'onclick': "dnnsf.events.emit('changeTheme" + attrs.id + "')",
                            'class': 'cm-theme-changer',
                            'href': 'javascript:void(0)'
                        });
                    themeChanger.html('<i class="fa fa-adjust"></i>');
                    element.next('.CodeMirror').append(themeChanger);

                    function getTheme() {
                        if (scope.dnnsf) {
                            return localStorage.getItem("codemirror" + scope.dnnsf.moduleId) || 'default';
                        } else {
                            return 'default';
                        }
                    }

                    function getMode() {
                        switch (attrs.codemirror) {
                            case 'sql':
                                return 'text/x-mssql'
                                break;
                            case 'htmlmixed':
                                return 'text/html'
                                break;
                            case 'json':
                                return 'application/json'
                                break;
                            default:
                                return attrs.codemirror || 'null'
                        }
                    }
                }
            }
        }]);
})(window["dnnsfAngular15"] || window["angular"]);