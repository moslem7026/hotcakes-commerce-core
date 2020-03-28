(function (angular) {
    /**
     * @license angular-recaptcha build:2018-07-30
     * https://github.com/vividcortex/angular-recaptcha
     * Copyright (c) 2018 VividCortex
    **/

    'use strict';
    var app = angular.module('vcRecaptcha', []);

    function throwNoKeyException() {
        throw new Error('You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create');
    }

    /**
     * An angular service to wrap the reCaptcha API
     */
    app.factory('vcRecaptchaService', ['$rootScope', '$window', '$q', '$document', '$interval', function ($rootScope, $window, $q, $document, $interval) {

        var deferred = $q.defer(), promise = deferred.promise, instances = {}, recaptcha;
        var onLoadFunctionName = 'vcRecaptchaApiLoaded';
        $window.vcRecaptchaApiLoadedCallback = $window.vcRecaptchaApiLoadedCallback || [];

        var callback = function () {
            recaptcha = $window.grecaptcha;

            deferred.resolve(recaptcha);
        };

        $window.vcRecaptchaApiLoadedCallback.push(callback);

        $window[onLoadFunctionName] = function () {
            $window.vcRecaptchaApiLoadedCallback.forEach(function (callback) {
                callback();
            });
        };


        function getRecaptcha() {
            if (!!recaptcha) {
                return $q.when(recaptcha);
            }

            return promise;
        }

        function validateRecaptchaInstance() {
            if (!recaptcha) {
                throw new Error('reCaptcha has not been loaded yet.');
            }
        }

        function isRenderFunctionAvailable() {
            return angular.isFunction(($window.grecaptcha || {}).render);
        }


        // Check if grecaptcha.render is not defined already.
        if (isRenderFunctionAvailable()) {
            callback();
        } else if ($window.document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]')) {
            // wait for script to be loaded.
            var intervalWait = $interval(function () {
                if (isRenderFunctionAvailable()) {
                    $interval.cancel(intervalWait);
                    callback();
                }
            }, 25);
        } else {
            // Generate link on demand
            var script = $window.document.createElement('script');
            script.async = true;
            script.defer = true;
            script.src = 'https://www.google.com/recaptcha/api.js?onload=' + onLoadFunctionName + '&render=explicit';
            $document.find('body')[0].appendChild(script);
        }

        return {

            /**
             * Creates a new reCaptcha object
             *
             * @param elm  the DOM element where to put the captcha
             * @param conf the captcha object configuration
             * @throws NoKeyException    if no key is provided in the provider config or the directive instance (via attribute)
             */
            create: function (elm, conf) {
                var config = {}
                conf.sitekey = conf.key || config.key;
                conf.theme = conf.theme || config.theme;
                conf.stoken = conf.stoken || config.stoken;
                conf.size = conf.size || config.size;
                conf.type = conf.type || config.type;
                conf.hl = conf.lang || config.lang;
                conf.badge = conf.badge || config.badge;

                if (!conf.sitekey) {
                    throwNoKeyException();
                }
                return getRecaptcha().then(function (recaptcha) {
                    var widgetId = recaptcha.render(elm, conf);
                    instances[widgetId] = elm;
                    return widgetId;
                });
            },

            /**
             * Reloads the reCaptcha
             */
            reload: function (widgetId) {
                validateRecaptchaInstance();

                recaptcha.reset(widgetId);

                // Let everyone know this widget has been reset.
                $rootScope.$broadcast('reCaptchaReset', widgetId);
            },

            /**
             * Executes the reCaptcha
             */
            execute: function (widgetId) {
                validateRecaptchaInstance();

                recaptcha.execute(widgetId);
            },

            /**
             * Get/Set reCaptcha language
             */
            useLang: function (widgetId, lang) {
                var instance = instances[widgetId];

                if (instance) {
                    var iframe = instance.querySelector('iframe');
                    if (lang) {
                        // Setter
                        if (iframe && iframe.src) {
                            var s = iframe.src;
                            if (/[?&]hl=/.test(s)) {
                                s = s.replace(/([?&]hl=)\w+/, '$1' + lang);
                            } else {
                                s += ((s.indexOf('?') === -1) ? '?' : '&') + 'hl=' + lang;
                            }

                            iframe.src = s;
                        }
                    } else {
                        // Getter
                        if (iframe && iframe.src && /[?&]hl=\w+/.test(iframe.src)) {
                            return iframe.src.replace(/.+[?&]hl=(\w+)([^\w].+)?/, '$1');
                        } else {
                            return null;
                        }
                    }
                } else {
                    throw new Error('reCaptcha Widget ID not exists', widgetId);
                }
            },

            /**
             * Gets the response from the reCaptcha widget.
             *
             * @see https://developers.google.com/recaptcha/docs/display#js_api
             *
             * @returns {String}
             */
            getResponse: function (widgetId) {
                validateRecaptchaInstance();

                return recaptcha.getResponse(widgetId);
            },

            /**
             * Gets reCaptcha instance and configuration
             */
            getInstance: function (widgetId) {
                return instances[widgetId];
            },

            /**
             * Destroy reCaptcha instance.
             */
            destroy: function (widgetId) {
                delete instances[widgetId];
            }
        };

    }]);

    app.directive('vcRecaptcha', ['$document', '$timeout', 'vcRecaptchaService', function ($document, $timeout, vcRecaptchaService) {

        return {
            restrict: 'A',
            scope: {
                response: '=?ngModel',
                key: '=?',
                stoken: '=?',
                theme: '=?',
                size: '=?',
                type: '=?',
                lang: '=?',
                badge: '=?',
                tabindex: '=?',
                required: '=?',
                onCreate: '&',
                onSuccess: '&',
                onExpire: '&',
                onError: '&',
                // form field attributes
                field: '=',
                registerControl: '&',
                updateField: '&'
            },
            link: function (scope, elm, attrs, ctrl) {
                scope.widgetId = null;

                if (ctrl && angular.isDefined(attrs.required)) {
                    scope.$watch('required', validate);
                }

                scope.fieldParameters = scope.field.Parameters;
                scope.fieldData = scope.$parent.form.fields[scope.field.TitleCompacted];
                if (scope.fieldData.invisibleRecaptcha) { scope.size = "invisible" };

                scope.registerControl({
                    control: {
                        field: scope.field,
                        onSubmit: function (fnCallWhenDone, fnCallOnError) {
                            fnCallWhenDone && fnCallWhenDone();
                        },
                        getValue: function () {
                            return scope.successToken;
                        }
                    }
                });

                var removeCreationListener = scope.$watch('key', function (captchaKey) {
                    var callback = function (gRecaptchaResponse) {
                        // Safe $apply
                        $timeout(function () {
                            scope.response = gRecaptchaResponse;
                            validate();

                            // Notify about the response availability
                            scope.onSuccess({ response: gRecaptchaResponse, widgetId: scope.widgetId });
                            scope.$parent.form.fields[scope.field.TitleCompacted].value = scope.successToken = scope.response;

                        });
                    };
                    vcRecaptchaService.create(elm[0], {

                        callback: callback,
                        key: captchaKey,
                        stoken: scope.stoken || attrs.stoken || null,
                        theme: scope.theme || attrs.theme || null,
                        type: scope.type || attrs.type || null,
                        lang: scope.lang || attrs.lang || null,
                        tabindex: scope.tabindex || attrs.tabindex || null,
                        size: scope.size || attrs.size || null,
                        badge: scope.badge || attrs.badge || null,
                        'expired-callback': expired,
                        'error-callback': attrs.onError ? error : undefined

                    }).then(function (widgetId) {
                        // The widget has been created
                        validate();
                        scope.$parent.widgetId = scope.widgetId = widgetId;
                        scope.onCreate({ widgetId: widgetId });

                        scope.$on('$destroy', destroy);

                        scope.$on('reCaptchaReset', function (event, resetWidgetId) {
                            if (angular.isUndefined(resetWidgetId) || widgetId === resetWidgetId) {
                                scope.response = "";
                                validate();
                            }
                        });

                        if (scope.fieldData.invisibleRecaptcha) {
                            vcRecaptchaService.reload(scope.widgetId);
                            $timeout(function () {
                                vcRecaptchaService.reload(scope.widgetId);
                                vcRecaptchaService.execute(scope.widgetId);
                            }, 10);
                        }
                    });

                    // Remove this listener to avoid creating the widget more than once.
                    removeCreationListener();
                });

                function destroy() {
                    if (ctrl) {
                        // reset the validity of the form if we were removed
                        ctrl.$setValidity('recaptcha', null);
                    }

                    cleanup();
                }

                function expired() {
                    // Safe $apply
                    $timeout(function () {
                        scope.response = "";
                        validate();

                        // Notify about the response availability
                        scope.onExpire({ widgetId: scope.widgetId });
                    });
                }

                function error() {
                    var args = arguments;
                    $timeout(function () {
                        scope.response = "";
                        validate();

                        // Notify about the response availability
                        scope.onError({ widgetId: scope.widgetId, arguments: args });
                    });
                }

                function validate() {
                    if (ctrl) {
                        ctrl.$setValidity('recaptcha', scope.required === false ? null : Boolean(scope.response));
                    }
                }

                function cleanup() {
                    vcRecaptchaService.destroy(scope.widgetId);

                    // removes elements reCaptcha added.
                    angular.element($document[0].querySelectorAll('.pls-container')).parent().remove();
                }
            }
        };
    }]);
})(window.dnnsfAngular15 || window.angular);
