(function (angular) {
    'use strict';

    /**
     * Usage pattern
     * <ds-widget-clock data-gmt-offset="0"></ds-widget-clock>
     */
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    angular.module('clock', [])
        .directive('clock', ['$interval', '$filter', '$timeout',
            function ($interval, $filter, $timeout) {
                return {
                    restrict: 'EA',
                    scope: {
                        gmtOffset: '@gmtOffset',
                        digitalFormat: '@digitalFormat',
                        clockType: '@clockType',
                        startTime: '@startTime',
                        theme: '@theme',
                        digitalStyles: '@digitalStyles'
                    },
                    templateUrl: dnnsf.commonUrl + '/static/angular15/clock/angular-clock.html?v=' + dnnsf.commonVersion,
                    link: function (scope, element, attrs) {
                        switch (scope.clockType) {
                            case 'analog': scope.showAnalog = scope.clockType === 'analog'; break;
                            case 'digital': scope.showDigital = scope.clockType === 'digital'; break;
                            case 'both': scope.showAnalog = scope.showDigital = scope.clockType === 'both'; break;
                        }
                        scope.gmtOffset === "" && (scope.gmtOffset = undefined);
                        applyCss(element, scope.digitalStyles);

                        var format, // date format
                            stopTime; // so that we can cancel the time updates
                        var o = {};
                        var gmtOffset = scope.gmtOffset;
                        var digitalFormat = scope.digitalFormat ? scope.digitalFormat : 'HH:mm:ss';
                        o.showDigital = scope.showDigital != null ? scope.showDigital : attrs.showDigital !== undefined ? true : false;
                        o.showAnalog = scope.showAnalog != null ? scope.showAnalog : attrs.showAnalog !== undefined ? true : false;
                        o.showGmtInfo = attrs.showGmtInfo === 'True' ? true : false;
                        o.startTime = parseInt(scope.startTime, 10); // ms
                        scope.themeClass = scope.theme ? scope.theme : attrs.theme ? attrs.theme : 'light';
                        if (!o.showDigital && !o.showAnalog) {
                            o.showAnalog = true;
                            o.showDigital = true;
                        }
                        scope.gmtInfo = false;

                        scope.date = getDate(o);

                        scope.digital = o.showDigital ? 'Loading..' : false;
                        scope.analog = o.showAnalog;
                        scope.majors = attrs.majorsTotal ? new Array(parseInt(attrs.majorsTotal)) : new Array(12);
                        scope.minors = new Array(60);
                        var date = null;
                        var tick = function () {
                            if (!isNaN(o.startTime)) {
                                o.startTime = o.startTime + 1000;
                            }
                            date = getDate(o);
                            scope.date = date;
                            if (o.showDigital) {
                                scope.digital = timeText(date, digitalFormat, $filter);
                            }
                        };

                        stopTime = $interval(tick, 1000);
                        // watch the expression, and update the UI on change.
                        scope.$watch('gmtOffset', function (value, old) {
                            value === "" && (value = undefined);
                            gmtOffset = value;
                            o.gmtOffset = (gmtOffset != null) ? getGMTbase100(gmtOffset) : false;
                            if (o.showGmtInfo && o.gmtOffset !== false) {
                                scope.gmtInfo = getGMTText(o.gmtOffset);
                            }

                            tick();
                        });
                        scope.$watch('digitalFormat', function (value, old) {
                            if (value != old) {
                                digitalFormat = value;
                            }
                        });
                        scope.$watch('startTime', function (value, old) {
                            if (value != old) {
                                o.startTime = parseInt(value, 10);
                            }
                        });
                        scope.$watch('showDigital', function (value, old) {
                            if (value != old) {
                                o.showDigital = value;
                                scope.digital = o.showDigital ? 'Loading..' : false;;
                            }
                        });
                        scope.$watch('showAnalog', function (value, old) {
                            if (value != old) {
                                o.showAnalog = value;
                                scope.analog = value;
                            }
                        });
                        scope.$watch('theme', function (value, old) {
                            if (value != old) {
                                scope.themeClass = value ? value : attrs.theme ? attrs.theme : 'light';
                            }
                        });
                        // listen on DOM destroy (removal) event, and cancel the next UI update
                        // to prevent updating time after the DOM element was removed.
                        element.on('$destroy', function () {
                            $interval.cancel(stopTime);
                            stopTime = null;
                        });

                        function applyCss(root, cssString) {
                            $timeout(function () { $(root).find('.digital').attr('style', cssString); }, 0);
                        }

                    }
                };
            }
        ]);



    function getGMTbase100(offs) {
        var offset = parseFloat(offs);
        var f = offset > 0 ? Math.floor(offset) : Math.ceil(offset),
            s = (offset % 1) / 0.6;

        return f + s;

    }

    function getGMTbase60(offset) {
        var f = offset > 0 ? Math.floor(offset) : Math.ceil(offset),
            s = ((offset > 0 ? offset : offset * -1) % 1) * 60;
        return f + s;

    }

    function getGMTText(offset) {

        var f = offset > 0 ? Math.floor(offset) : Math.ceil(offset),
            s = Math.round(((offset > 0 ? offset : offset * -1) % 1) * 60);

        return 'GMT' + (offset === 0 ? '' : ((offset > 0 ? ' +' : ' ') + lpad(f) + '.' + rpad(s).substring(0, 2)));

    }

    function lpad(num) {
        if (num < 0) {
            return (num > -10 ? '-0' : '-') + (num * -1);
        } else {
            return (num < 10 ? '0' : '') + num;
        }

    }

    function rpad(num) {
        return num + (num < 10 ? '0' : '');
    }
    // Checkfor offset and get correct time
    function getDate(o) {
        var now = (!isNaN(o.startTime)) ? new Date(o.startTime) : new Date();
        if (o.gmtOffset !== null && o.gmtOffset !== false) {
            /*Use GMT + gmtOffset
            convert to msec
            add local time zone offset
            get UTC time in msec*/
            var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            // create new Date object for different city
            // using supplied offset
            var offsetNow = new Date(utc + (3600000 * o.gmtOffset));
            return {
                hrs: offsetNow.getHours(),
                mins: offsetNow.getMinutes(),
                secs: offsetNow.getSeconds(),
                date: offsetNow
            };
        } else {
            // Use local time
            return {
                hrs: now.getHours(),
                mins: now.getMinutes(),
                secs: now.getSeconds(),
                date: now
            };
        }
    }

    function timeText(d, format, $filter) {
        return $filter('date')(d.date, format);
    }

})(dnnsfAngular15);
