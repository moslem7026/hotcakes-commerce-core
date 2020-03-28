dnnsfAngular15.module('imageeditor', [])


    .directive('imageeditor', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            templateUrl: dnnsf.commonUrl + '/static/angular15/image-editor/image-editor.html?v=' + dnnsf.commonVersion,
            scope: {
                updateField: '&',
                registerControl: '&',
                field: '=',
                settings: '=',
            },
            link: function (scope, element, attrs) {
                scope.fieldParameters = scope.field.Parameters;
                scope.fieldData = scope.$parent.form.fields[scope.field.TitleCompacted];
                
                if(scope.fieldData.hideSelectImageButton == 'true') {
                    scope.fieldData.hideSelectImageButton = true;
                }
                if(scope.fieldData.hideSelectImageButton == 'false') {
                    scope.fieldData.hideSelectImageButton = false;
                }

                scope.disabled = attrs.disabled === 'disabled';
                scope.cropperId = "cropper" + scope.field.FormFieldId;
                scope.buttonText = localization.imageeditor.select;

                var cropBoxResizable = attrs.cropBoxResizable === 'True';
                var cropper, $input = element.find('.file-input'),
                    URL = window.URL || window.webkitURL,
                    uploadedImageURL,
                    $image = element.find('.img-cropper');
                var height = parseInt(attrs.cropBoxHeight) || 100;
                var width = parseInt(attrs.cropBoxWidth) || 100;


                var aspectRatio = NaN;
                if (cropBoxResizable) {
                    aspectRatio = width / height;
                }
                var options = {
                    "viewMode": 1,
                    "dragMode": attrs.dragMode,
                    "cropBoxResizable": attrs.dragMode == 'move' ? cropBoxResizable : false,
                    "aspectRatio": aspectRatio,
                    "ready": function () {
                        setSettings();
                    }
                };

                if (scope.fieldData.initialImage) {
                    $image.attr('src', scope.fieldData.initialImage);
                    $image.cropper(options);
                }

                scope.registerControl({
                    control: {
                        field: scope.field,
                        onSubmit: function (fnCallWhenDone, fnCallOnError) {
                            fnCallWhenDone();
                        },
                        getValue: function () {
                            var resizedHeight, resizedWidth;

                            if (!options.cropBoxResizable) {
                                // make the image have fixed width and height, regardless of zoom
                                resizedHeight = height;
                                resizedWidth = width;
                            }

                            var canvas = $image.cropper('getCroppedCanvas', { width: resizedWidth, height: resizedHeight });
                            return canvas ? canvas.toDataURL(attrs.output) : "";
                        }
                    }
                });

                function setSettings() {
                    $image.cropper('setData', { "x": 0, "y": 0, "height": height, "width": width, "rotate": 0, "scaleX": 1, "scaleY": 1 });
                }

                scope.rotate = function (degrees) {
                    if ($image.attr('src')) {
                        $image.cropper('rotate', degrees);
                    }
                }

                scope.clearCropBox = function () {
                    $image.cropper('clear');
                }

                scope.reset = function () {
                    $image.cropper('reset');
                    setSettings();
                }

                $input.on('change', function () {
                    var files = this.files;
                    var file;

                    if (files && files.length) {
                        scope.$apply(function () {
                            scope.hasImage = true;
                        });

                        file = files[0];

                        if (/^image\/\w+$/.test(file.type)) {
                            uploadedImageName = file.name;
                            uploadedImageType = file.type;

                            if (uploadedImageURL) {
                                URL.revokeObjectURL(uploadedImageURL);
                            }

                            uploadedImageURL = URL.createObjectURL(file);
                            cropper = $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);

                            $input.val('');
                        } else {
                            window.alert('Please choose an image file.');
                        }
                    }
                });

            }
        }
    }]);
