dnnsfAngular15.module('agreementlinks', [])
    .directive('agreementlinks', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            replace: true,
            templateUrl: dnnsf.commonUrl + '/static/angular15/agreementlinks/agreementlinks.html?v=' + dnnsf.commonVersion,
            scope: {
                title: '@',
                content: '=',
                enforce: '@',
                field: '=',
                separator: '@',
                popupHeight: '@',
                popupWidth: '@',
                closeButton: '@',
                ngModel: '='
            },
            link: function (scope, element, attrs) {
                scope.ngModel = (scope.ngModel === 'True');
                scope.enforce = (scope.enforce === 'True');
                scope.index = 0;
                var printMode = '&dnnprintmode=true&SkinSrc=%5bG%5dSkins%2f_default%2fNo+Skin&ContainerSrc=%5bG%5dContainers%2f_default%2fNo+Container';
                scope.height = 0;
                scope.openModal = function (link) {
                    $('.modal').on('click', function (event) {
                        event.preventDefault();
                    });
                    scope.contentId = link.LinkText;
                    if (link.ContentType == 'html') {
                        scope.contentHtml = link.Html;
                        scope.termsUrl = "";
                    } else {
                        var url = isNaN(parseInt(link.PageId)) ? link.PageId : '/?tabId=' + link.PageId + printMode;
                        scope.termsUrl != url && (scope.termsUrl = url);
                    }


                    $timeout(function () {
                        var $modal = $('#' + scope.field.TitleCompacted + scope.field.FormFieldId + 'terms');
                        $modal.on('shown.bs.modal', function () {
                            scope.$apply(function () {
                                scope.height = parseInt($modal.find('.modal-dialog').height());
                            });
                        });
                        $modal.on('hidden.bs.modal', function () {
                            scope.$apply(function () {
                                scope.contentId = scope.contentHtml = "";
                            });
                        });
                        $modal.modal('show');

                    }, 0);
                };
                if (scope.enforce) {
                    scope.$watch('ngModel', function (newValue, oldValue, scope) {
                        if (newValue == true && (oldValue == "False" || !oldValue) && !scope.accept) {
                            scope.ngModel = false;
                            scope.content[scope.index] && scope.openModal(scope.content[scope.index]);
                        }
                    });
                }

                scope.closeModal = function (btn) {
                    if (scope.enforce) {
                        scope.index++;
                        if (scope.content[scope.index]) {
                            scope.contentId = scope.contentHtml = "";
                            scope.openModal(scope.content[scope.index]);
                            $("html, .modal").animate({ scrollTop: 0 }, "slow");
                        } else {
                            $('#' + scope.field.TitleCompacted + scope.field.FormFieldId + 'terms').modal('hide');
                            scope.accept = true;
                            scope.ngModel = true;
                            scope.index = 0;
                        }
                    } else {
                        $('#' + scope.field.TitleCompacted + scope.field.FormFieldId + 'terms').modal('hide');
                    }

                };

            }
        };
    }]);
