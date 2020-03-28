/* =========================================================
 * bootstrap-slider.js v2.0.0
 * http://www.eyecon.ro/bootstrap-slider
 * =========================================================
 * Copyright 2012 Stefan Petre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!function ($) {

    var Slider = function (element, options) {
        this.element = $(element);
        this.picker = $('<div class="af-slider slider">' +
            '<div class="slider-track">' +
            '<div class="slider-selection"></div>' +
            '<div class="slider-handle" aria-valuenow="" aria-valuemin="" aria-valuemax="" aria-orientation="" aria-valuetext="" role="slider" tabindex="0"></div>' +
            '<div class="slider-handle" role="slider" tabindex="0"></div>' +
            '</div>' +
            '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>' +
            '<div class="text-container">' +
            '<div class="start-text"></div>' +
            '<div class="help-text"></div>' +
            '<div class="end-text"></div>' +
            '</div>' +
            '</div>')
            .insertBefore(this.element)
            .append(this.element);
        this.id = this.element.data('slider-id') || options.id;
        if (this.id) {
            this.picker[0].id = this.id;
        }

        if (typeof Modernizr !== 'undefined' && Modernizr.touch) {
            this.touchCapable = false;
        }
        this.picker.find('.start-text').html(this.element.data('slider-starttext'));
        this.picker.find('.end-text').html(this.element.data('slider-endtext'));
        this.picker.find('.help-text').html(this.element.data('slider-helptext'));
        var tooltip = this.element.data('slider-tooltip') || options.tooltip;

        this.tooltip = this.picker.find('.tooltip');
        this.tooltipInner = this.tooltip.find('div.tooltip-inner');

        this.orientation = this.element.data('slider-orientation') || options.orientation;
        this.width = this.element.data('slider-width') || options.width;
        switch (this.orientation) {
            case 'vertical':
                this.picker.addClass('slider-vertical');
                this.stylePos = 'top';
                this.mousePos = 'pageY';
                this.sizePos = 'offsetHeight';
                this.tooltip.addClass('right')[0].style.left = '100%';
                break;
            default:
                this.picker
                    .addClass('slider-horizontal')
                    .css('width', this.width || this.element.outerWidth());
                this.orientation = 'horizontal';
                this.stylePos = 'left';
                this.mousePos = 'pageX';
                this.sizePos = 'offsetWidth';
                this.tooltip.addClass('top')[0].style.top = -this.tooltip.outerHeight() - 14 + 'px';
                break;
        }

        this.min = this.element.data('slider-min') || options.min;
        this.max = this.element.data('slider-max') || options.max;
        this.step = this.element.data('slider-step') || options.step;
        this.value = this.element.data('val').toString().split(',') || options.value;
        if (this.value[1]) {
            this.range = true;
        }

        this.selection = this.element.data('slider-selection') || options.selection;
        this.selectionEl = this.picker.find('.slider-selection');
        if (this.selection === 'none') {
            this.selectionEl.addClass('hide');
        }
        this.selectionElStyle = this.selectionEl[0].style;


        this.handle1 = this.picker.find('.slider-handle:first');
        this.handle1Stype = this.handle1[0].style;
        this.handle2 = this.picker.find('.slider-handle:last');
        this.handle2Stype = this.handle2[0].style;

        var handle = this.element.data('slider-handle') || options.handle;
        switch (handle) {
            case 'round':
                this.handle1.addClass('round');
                this.handle2.addClass('round');
                break
            case 'triangle':
                this.handle1.addClass('triangle');
                this.handle2.addClass('triangle');
                break
        }

        if (this.range) {
            this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
            this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
        } else {
            this.value = [Math.max(this.min, Math.min(this.max, this.value))];
            this.handle2.addClass('hide');
            if (this.selection == 'after') {
                this.value[1] = this.max;
            } else {
                this.value[1] = this.min;
            }
        }
        this.diff = this.max - this.min;
        this.percentage = [
            (this.value[0] - this.min) * 100 / this.diff,
            (this.value[1] - this.min) * 100 / this.diff,
            this.step * 100 / this.diff
        ];

        this.offset = this.picker.offset();
        this.size = this.picker[0][this.sizePos];

        this.formater = options.formater;

        this.layout();

        if (this.touchCapable) {
            // Touch: Bind touch events:
            this.picker.on({
                touchstart: $.proxy(this.mousedown, this)
            });
        } else {
            this.picker.on({
                mousedown: $.proxy(this.mousedown, this)
            });
        }

        if (tooltip === 'show') {
            this.picker.on({
                mouseenter: $.proxy(this.showTooltip, this),
                mouseleave: $.proxy(this.hideTooltip, this)
            });
        } else {
            this.tooltip.addClass('hide');
        }
    };

    Slider.prototype = {
        constructor: Slider,

        over: false,
        inDrag: false,

        showTooltip: function () {
            this.tooltip.addClass('in');
            //var left = Math.round(this.percent*this.width);
            //this.tooltip.css('left', left - this.tooltip.outerWidth()/2);
            this.over = true;
        },

        hideTooltip: function () {
            if (this.inDrag === false) {
                this.tooltip.removeClass('in');
            }
            this.over = false;
        },

        layout: function () {
            this.handle1Stype[this.stylePos] = this.percentage[0] + '%';
            this.handle2Stype[this.stylePos] = this.percentage[1] + '%';
            if (this.orientation == 'vertical') {
                this.selectionElStyle.top = Math.min(this.percentage[0], this.percentage[1]) + '%';
                this.selectionElStyle.height = Math.abs(this.percentage[0] - this.percentage[1]) + '%';
            } else {
                this.selectionElStyle.left = Math.min(this.percentage[0], this.percentage[1]) + '%';
                this.selectionElStyle.width = Math.abs(this.percentage[0] - this.percentage[1]) + '%';
            }
            if (this.range) {
                this.tooltipInner.text(
                    this.formater(this.value[0]) +
                    ' : ' +
                    this.formater(this.value[1])
                );
                this.tooltip[0].style[this.stylePos] = this.size * (this.percentage[0] + (this.percentage[1] - this.percentage[0]) / 2) / 100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + 'px';
            } else {
                this.tooltipInner.text(
                    this.formater(this.value[0])
                );
                this.tooltip[0].style[this.stylePos] = this.size * this.percentage[0] / 100 - (this.orientation === 'vertical' ? this.tooltip.outerHeight() / 2 : this.tooltip.outerWidth() / 2) + 'px';
            }
        },

        mousedown: function (ev) {

            // Touch: Get the original event:
            if (this.touchCapable && ev.type === 'touchstart') {
                ev = ev.originalEvent;
            }

            this.offset = this.picker.offset();
            this.size = this.picker[0][this.sizePos];

            var percentage = this.getPercentage(ev);

            if (this.range) {
                var diff1 = Math.abs(this.percentage[0] - percentage);
                var diff2 = Math.abs(this.percentage[1] - percentage);
                this.dragged = (diff1 < diff2) ? 0 : 1;
            } else {
                this.dragged = 0;
            }

            this.percentage[this.dragged] = percentage;
            this.layout();

            if (this.touchCapable) {
                // Touch: Bind touch events:
                $(document).on({
                    touchmove: $.proxy(this.mousemove, this),
                    touchend: $.proxy(this.mouseup, this)
                });
            } else {
                $(document).on({
                    mousemove: $.proxy(this.mousemove, this),
                    mouseup: $.proxy(this.mouseup, this)
                });
            }

            this.inDrag = true;
            var val = this.calculateValue();
            if ($(this.element).parent().find('.tooltip-inner').length)
                $(this.element).parent().find('.tooltip-inner').html(val);
            this.element.trigger({
                type: 'slideStart',
                value: val
            }).trigger({
                type: 'slide',
                value: val
            });
            return false;
        },

        mousemove: function (ev) {

            // Touch: Get the original event:
            if (this.touchCapable && ev.type === 'touchmove') {
                ev = ev.originalEvent;
            }

            var percentage = this.getPercentage(ev);
            if (this.range) {
                if (this.dragged === 0 && this.percentage[1] < percentage) {
                    this.percentage[0] = this.percentage[1];
                    this.dragged = 1;
                } else if (this.dragged === 1 && this.percentage[0] > percentage) {
                    this.percentage[1] = this.percentage[0];
                    this.dragged = 0;
                }
            }
            this.percentage[this.dragged] = percentage;
            this.layout();
            var val = this.calculateValue();
            this.element
                .trigger({
                    type: 'slide',
                    value: val
                })
                .data('value', val)
                .prop('value', val);
            return false;
        },

        mouseup: function (ev) {
            if (this.touchCapable) {
                // Touch: Bind touch events:
                $(document).off({
                    touchmove: this.mousemove,
                    touchend: this.mouseup
                });
            } else {
                $(document).off({
                    mousemove: this.mousemove,
                    mouseup: this.mouseup
                });
            }

            this.inDrag = false;
            if (this.over == false) {
                this.hideTooltip();
            }
            this.element;
            var val = this.calculateValue();
            this.element
                .trigger({
                    type: 'slideStop',
                    value: val
                })
                .data('value', val)
                .prop('value', val);
            return false;
        },

        calculateValue: function () {
            var val;
            if (this.range) {
                val = [
                    (this.min + Math.round((this.diff * this.percentage[0] / 100) / this.step) * this.step),
                    (this.min + Math.round((this.diff * this.percentage[1] / 100) / this.step) * this.step)
                ];
                this.value = val;
            } else {
                val = (this.min + Math.round((this.diff * this.percentage[0] / 100) / this.step) * this.step);
                this.value = [val, this.value[1]];
            }
            return val;
        },

        getPercentage: function (ev) {
            if (this.touchCapable) {
                ev = ev.touches[0];
            }
            var percentage = (ev[this.mousePos] - this.offset[this.stylePos]) * 100 / this.size;
            percentage = Math.round(percentage / this.percentage[2]) * this.percentage[2];
            return Math.max(0, Math.min(100, percentage));
        },

        getValue: function () {
            if (this.range) {
                return this.value;
            }
            return this.value[0];
        },

        setValue: function (val) {
            this.value = val;

            if (this.range) {
                this.value[0] = Math.max(this.min, Math.min(this.max, this.value[0]));
                this.value[1] = Math.max(this.min, Math.min(this.max, this.value[1]));
            } else {
                this.value = [Math.max(this.min, Math.min(this.max, this.value))];
                this.handle2.addClass('hide');
                if (this.selection == 'after') {
                    this.value[1] = this.max;
                } else {
                    this.value[1] = this.min;
                }
            }
            this.diff = this.max - this.min;
            this.percentage = [
                (this.value[0] - this.min) * 100 / this.diff,
                (this.value[1] - this.min) * 100 / this.diff,
                this.step * 100 / this.diff
            ];
            this.layout();
        }
    };

    $.fn.slider = function (option, val) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('slider'),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('slider', (data = new Slider(this, $.extend({}, $.fn.slider.defaults, options))));
            }
            if (typeof option == 'string') {
                data[option](val);
            }
        })
    };

    $.fn.slider.defaults = {
        min: 0,
        max: 10,
        step: 1,
        orientation: 'horizontal',
        value: 5,
        selection: 'before',
        tooltip: 'show',
        handle: 'round',
        formater: function (value) {
            return value;
        }
    };

    $.fn.slider.Constructor = Slider;

}(window.jQuery);


dnnsfAngular15.module('slider', [])
    .directive('slider', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                items: '=items',
                updateField: '&',
                captions: '=?',
                captionClasses: '=?'
            },
            link: {
                pre: function (scope, el, attrs) {
                    scope.name = attrs.name;
                    scope.field = attrs.afField;
                    scope.helptext = attrs['slider-helptext'];
                },
                post: function (scope, el, attrs) {
                    if (!el.attr('data-val')) {
                        el.attr('data-val', scope.ngModel);
                    }

                    scope.$watch('ngModel', function (newVal, oldVal) {
                        if (newVal !== oldVal) {
                            $timeout(function () {
                                setSliderValue(newVal);
                            })
                        }
                    });

                    setTimeout(function () {

                        $(el).slider({
                            tooltip: attrs.displaytooltip == 'True' ? 'show' : 'hide'
                        })
                            .on('slideStop', function (ev) {
                                $(el).attr('data-val', ev.value);
                                initHelpText(ev.value);
                                $(scope.sliderHandle).attr({ 'aria-valuenow': ev.value });
                            })
                            .on('slide', function (ev) {
                                $timeout(function () {
                                    scope.updateField({ field: scope.field, val: ev.value });
                                    initHelpText(ev.value);
                                    $(scope.sliderHandle).attr({ 'aria-valuenow': ev.value });
                                })
                            });

                        $(".slider-handle").draggable({
                            axis: $(el).attr("data-slider-orientation") == "horizontal" ? "x" : "y",
                            containment: "parent"
                        });

                        scope.sliderHandle = el.siblings('.slider-track').children('.slider-handle')[0];
                        $(scope.sliderHandle).attr({ 'aria-valuenow': scope.ngModel, 'aria-valuemin': attrs.sliderMin || 0, 'aria-valuemax': attrs.sliderMax || 10, 'aria-orientation': attrs.sliderOrientation });

                        /*
                         * For better accessibility, a keydown event has been created.
                         * The purpose is to facilitate the usage of the slider with the arrows.
                         * Slider's html has aria attributes that help accessibility software
                         * and they are updated dynamically.
                        */

                        $(".slider-handle").on("keydown", function (event) {
                            if (attrs.sliderOrientation === 'horizontal') {
                                switch (event.which) {
                                    case 38: // UP ARROW
                                    case 39: { // RIGHT ARROW
                                        increaseSliderValue(attrs.sliderStep || 1);
                                        break;
                                    }
                                    case 37: // LEFT ARROW
                                    case 40: { // DOWN ARROW
                                        decreaseSliderValue(attrs.sliderStep || 1);
                                        break;
                                    }
                                }
                            } else {
                                switch (event.which) {
                                    case 40:  // DOWN ARROW
                                    case 39: { // RIGHT ARROW
                                        increaseSliderValue(attrs.sliderStep || 1);
                                        break;
                                    }
                                    case 37: // LEFT ARROW
                                    case 38: { // UP ARROW
                                        decreaseSliderValue(attrs.sliderStep || 1);
                                        break;
                                    }
                                }
                            }

                            if (event.which === 35) { // END BUTTON
                                setSliderValueAccessibility(Number(attrs.sliderMax) || 10);
                            } else if (event.which === 36) { // HOME BUTTON
                                setSliderValueAccessibility(Number(attrs.sliderMin) || 0);
                            }

                            if (event.which !== 9) { // TAB
                                event.preventDefault();
                            }
                        });

                        initHelpText(attrs.val);

                    }, 0)

                    function increaseSliderValue(step) {
                        setSliderValueAccessibility(Number(scope.ngModel) + Number(step));
                    }

                    function decreaseSliderValue(step) {
                        setSliderValueAccessibility(Number(scope.ngModel) - Number(step));
                    }

                    function setSliderValueAccessibility(value) {

                        if (value > (attrs.sliderMax || 10) || value < (attrs.sliderMin || 0)) {
                            return;
                        }
                        el.slider('setValue', value);
                        scope.ngModel = value;
                        el.trigger({ type: 'slide', value: scope.ngModel });
                        el.trigger({ type: 'slideStop', value: scope.ngModel });
                    }

                    function setSliderValue(value) {
                        if (value > (attrs.sliderMax || 10)) {
                            el.slider('setValue', Number(attrs.sliderMax));
                        } else if (value < (attrs.sliderMin || 0)) {
                            el.slider('setValue', Number(attrs.sliderMin));
                        } else {
                            el.slider('setValue', value);
                        }

                        el.trigger({ type: 'slideStop', value: scope.ngModel });
                    }

                    /* 
                     * Initializes and dynamically changes the 'captions' or help text based on slider's values.
                     * It also changes aria-valuetext to help accessibility software understand what
                     * the slider's values mean.
                     */
                    function initHelpText(value) {
                        var element = $(el).parent().find('.help-text');
                        var helpText = _.find(scope.captions, function (caption) { return value == caption.value });
                        if (helpText) {
                            element.html(helpText.name);
                        } else {
                            element.html(attrs['sliderHelptext']);
                        }
                        var helpClass = _.find(scope.captionClasses, function (helpClass) { return value == helpClass.value });
                        if (helpClass) {
                            element.removeClass().addClass('help-text').addClass(helpClass.name);
                        }
                        else {
                            element.removeClass().addClass('help-text');
                        }

                        $(el.siblings('.slider-track').children('.slider-handle')[0]).attr('aria-valuetext', element.text()); //accessibility
                        scope.$apply();
                    }
                }
            }
        }
    }]);
