dnnsfAngular15.module('sortable', [])

    .directive('sortable', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            ngModel: '=',
            items: '=items',
            updateField: '&'
        },
        templateUrl: dnnsf.commonUrl + '/static/angular15/sortable-input.html?v=' + dnnsf.commonVersion,
        link: {
            pre: function (scope, el, attrs) {
                scope.iconPosition = attrs.iconPosition || 'left';
                scope.iconClass = attrs.iconClass;
                scope.name = attrs.name;
                scope.field = attrs.afField;
                function getSorted(arr, sortArr) {
                    var result = [];
                    _.each(arr, function (v, i) {
                        result[i] = _.find(arr, { 'value': sortArr[i].toString() }) || {'text': 'This value doesn\'t exist', 'value':'' };
                    })
                    return result;
                };
                if (!scope.ngModel.length) {
                    $.each(scope.items, function (i, v) {
                        scope.ngModel.push(v.value || v.text)
                    })
                }
                else {
                    scope.items = getSorted(scope.items, scope.ngModel)
                }
            },
            post: function (scope, el, attrs) {
                jQuery.fn.extend({
                    ksortable: function (options) {
                        this.sortable(options);
                        /* For better accessibility, a keydown and a focus event have been created.
                         * Their purpose is to facilitate the usage of sortable input with the arrows, tab and space keys.
                         * Tabindex must be set to 0 to focus an element and it must be set to -1 for all the other elements.
                         * options.update() -> we update the scope after every DOM manipulation.
                         */
                        $('span', this).on('focus', function () {
                            setTimeout((function () {
                                $(this).attr('tabindex', 0).siblings().each(function (index, listItem) {
                                    $(listItem).attr("tabindex", -1);
                                });
                            }).bind(this), 0);
                        });
                        $('span', this).bind('keydown', function (event) {
                            var $prev = $(this).prev(), $next = $(this).next();
                            switch (event.which) {
                                case 9: { // Tab
                                    if (event.shiftKey) {
                                        if ($prev.length) {
                                            $(this).attr('tabindex', -1)
                                            $prev.attr('tabindex', 0);
                                            setTimeout((function () {
                                                $prev.trigger('focus');
                                            }).bind(this));
                                        }
                                        return;
                                    }
                                    if ($next.length) {
                                        $(this).attr('tabindex', -1).next().attr('tabindex', 0);
                                        setTimeout((function () { $next.focus() }).bind(this));
                                    }
                                    break;
                                }
                                case 37: // Left & Up arrows
                                case 38: {
                                    if (dnnsf.stringToBool($(this).attr("sort-selected")) === true) {
                                        $(this).insertBefore($prev);
                                        options.update();
                                        $(this).focus();
                                    } else {
                                        if ($prev.length) {
                                            $(this).attr('tabindex', -1)
                                            $prev.attr('tabindex', 0);
                                            setTimeout((function () {
                                                $prev.trigger('focus');
                                            }).bind(this));
                                        } else {
                                            $(this).attr('tabindex', -1).siblings().last().attr('tabindex', 0);
                                            setTimeout((function () {
                                                $(this).siblings().last().focus();
                                            }).bind(this), 0);
                                        }
                                    }
                                    break;
                                }
                                case 39: // Right & Down arrows
                                case 40: {
                                    if (dnnsf.stringToBool($(this).attr("sort-selected")) === true) {
                                        $(this).insertAfter($next);
                                        options.update();
                                        $(this).focus();
                                    } else {
                                        if ($next.length) {
                                            $(this).attr('tabindex', -1).next().attr('tabindex', 0);
                                            setTimeout((function () { $next.focus(); }).bind(this));
                                        } else {
                                            $(this).attr('tabindex', -1).siblings().first().attr('tabindex', 0)
                                            setTimeout((function () {
                                                $(this).siblings().first().focus();
                                            }).bind(this));
                                        }
                                    }
                                    break;
                                }
                                case 32: { // Space
                                    if (dnnsf.stringToBool($(this).attr("sort-selected")) === true) {
                                        $(this).attr("sort-selected", false);
                                        break;
                                    }
                                    $(this).attr("sort-selected", true);
                                    $(this).siblings().each(function (index, listItem) {
                                        $(listItem).attr("sort-selected", false);
                                    });
                                    break;
                                }
                            }
                        });
                    }
                });

                setTimeout(function () {
                    var options = {
                        axis: "y",
                        containment: $(el).closest('.field-container'),
                        cursor: "move",
                        handle: attrs.dragByIcon == 'True' ? ".handle" : '',
                        tolerance: "pointer",
                        update: function (event, ui) {
                            scope.ngModel = [];
                            $.each($(el).find('.list-group-item'), function (i, v) {
                                var val = $(v).attr('data-val');
                                val != "" && scope.ngModel.push(val);
                            });
                            scope.$apply();
                            scope.updateField({ field: scope.field, val: scope.ngModel });
                        },
                        stop: function (event, ui) {
                            event.stopPropagation();
                        }
                    };
                    $(el).find('.list-group').ksortable(options);
                }, 0)
            }
        }
    }
}]);
