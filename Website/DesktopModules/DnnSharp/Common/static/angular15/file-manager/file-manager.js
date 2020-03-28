dnnsfAngular15.module('filemanager', [])
    .run([
        '$ngConfirmDefaults',
        function ($ngConfirmDefaults) {
            // modify the defaults here.
            // $ngConfirmDefaults.theme = 'modern';
        }
    ])
    .directive('onErrorSrc', function () {
        return {
            link: function (scope, element, attrs) {
                var fileWithoutPreview = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEwMjguNCkiPjxwYXRoIGQ9Im01IDEwMzAuNGMtMS4xMDQ2IDAtMiAwLjktMiAydjggNCA2YzAgMS4xIDAuODk1NCAyIDIgMmgxNGMxLjEwNSAwIDItMC45IDItMnYtNi00LTRsLTYtNmgtMTB6IiBmaWxsPSIjOTVhNWE2Ii8+PHBhdGggZD0ibTUgMTAyOS40Yy0xLjEwNDYgMC0yIDAuOS0yIDJ2OCA0IDZjMCAxLjEgMC44OTU0IDIgMiAyaDE0YzEuMTA1IDAgMi0wLjkgMi0ydi02LTQtNGwtNi02aC0xMHoiIGZpbGw9IiNiZGMzYzciLz48cGF0aCBkPSJtMjEgMTAzNS40LTYtNnY0YzAgMS4xIDAuODk1IDIgMiAyaDR6IiBmaWxsPSIjOTVhNWE2Ii8+PC9nPjwvc3ZnPg==';
                element.bind('error', function () {
                    attrs.$set('src', fileWithoutPreview);
                    element.addClass('hover-disabled')
                });
            }
        }
    })

    .directive('filemanager', ['dnnsfHttp', '$timeout', '$ngConfirm', function (dnnsfHttp, $timeout, $ngConfirm) {
        return {
            restrict: 'A',
            templateUrl: dnnsf.commonUrl + '/static/angular15/file-manager/file-manager.html?v=' + dnnsf.commonVersion,
            scope: {
                updateField: '&',
                registerControl: '&',
                field: '=',
                initialValue: '=',
                settings: '=',
                formBtn: '@',
                defaultBrowseView: '@'
            },
            link: function (scope, element, attrs) {
                var svcFramework = dnnsfjQuery.ServicesFramework(scope.settings.ModuleId);

                attrs.containerClass && element.find('.file-manager').addClass(attrs.containerClass);
                var $modal, dropzone, callBack,
                    uploadErrors = [],
                    autoUpload = (attrs.autoUpload == 'True'),
                    acceptedFiles = attrs.fileExt ? '.' + attrs.fileExt.replace(' ', '').split(',').join(',.') : '';
                scope.displayInPopup = (attrs.displayInPopup == 'True');
                scope.displayTotalProgressBar = (attrs.displayTotalProgressBar == 'True');
                scope.fileBrowser = (attrs.fileBrowser == 'True');
                scope.uploadTxt = localization.filemanager.upload;
                scope.doneTxt = localization.filemanager.done;
                scope.btnInUpload = attrs.btnInUpload == 'True';
                scope.btnInBrowser = attrs.btnInBrowser == 'True';
                scope.gridMode = scope.defaultBrowseView === 'grid' || false;
                scope.fileList = [];
                scope.uploadedFiles = [];
                scope.files = {
                    'selectedFiles': [],
                    'filesInQueue': []
                }
                scope.progressText = localization.filemanager.progress || "Complete";
                scope.restrictedFileNameCharacters = (attrs.restrictedFileNameCharacters == '');
                scope.restrictedErrorMessage = (attrs.restrictedErrorMessage == '');
                if (attrs.callBack) {
                    callBack = new Function('selectedFiles', attrs.callBack);
                }
                scope.changeViewMode = function () {
                    var fileList = scope.fileList;
                    scope.fileList = [];
                    $timeout(function () {
                        scope.gridMode = !scope.gridMode;
                        scope.fileList = fileList;
                    }, 1000)
                }
                scope.menuOptions = [
                    ['Rename', function ($itemScope, $event, modelValue, text, $li) {
                        rename(modelValue);
                    }],

                    ['Copy file path', function ($itemScope, $event, modelValue, text, $li) {
                        var $temp = $("<input>");
                        $("body").append($temp);
                        $temp.val(location.origin + modelValue.fileUrl).select();
                        if (document.execCommand("copy")) {
                            $.toast({
                                text: localization.filemanager.copiedToClicpboard || 'Copied to clipboard',
                                icon: 'success',
                                showHideTransition: 'fade',
                                allowToastClose: true,
                                hideAfter: 3000,
                                position: 'top-right',
                                loader: false,
                            });
                        };
                        $temp.remove();
                    }],
                    null,
                    ['Delete', function ($itemScope, $event, modelValue, text, $li) {
                        $ngConfirm({
                            title: 'Delete File',
                            icon: 'fa fa-trash',
                            content: localization.filemanager.deleteWarning + '<br/>' + modelValue.name,
                            animation: 'scale',
                            closeIcon: true,
                            backgroundDismiss: true,
                            onScopeReady: function (sc) {
                            },
                            buttons: {
                                delete: {
                                    btnClass: "btn-red",
                                    action: function (sc, button) {
                                        var data = $.param({
                                            fieldId: scope.field.FormFieldId,
                                            fileId: modelValue.fileId,
                                        });
                                        dnnsfHttp.delete(scope.settings.ModuleId, scope.settings.apiUrl + 'FileSystem/deleteFile?' + scope.settings.WebApiQueryString + '&' + data)
                                            .success(function (data, status, headers) {
                                                scope.getFiles();
                                            })
                                            .error(function (data, status, header, config) {
                                                console.error(data);
                                            });
                                    }
                                },
                                cancel: {
                                    btnClass: "btn-blue",
                                    action: null
                                }
                            },
                        })

                    }],

                ];
                function rename(file) {
                    $ngConfirm({
                        title: 'Rename',
                        icon: 'fa fa-edit',
                        contentUrl: dnnsf.commonUrl + '/static/angular15/file-manager/rename.html',
                        animation: 'scale',
                        closeIcon: true,
                        backgroundDismiss: true,
                        onScopeReady: function (sc) {
                            sc.newName = file.name;
                        },
                        buttons: {
                            rename: {
                                btnClass: "btn-blue",
                                action: function (sc, button) {
                                    var newName = sc.newName;
                                    if (_.endsWith(newName, '.' + file.extension))
                                        newName = file.name = newName;
                                    else {
                                        newName = file.name = newName + '.' + file.extension
                                    }
                                    dnnsfHttp(scope.settings.ModuleId, {
                                        method: 'POST',
                                        url: scope.settings.apiUrl + 'FileSystem/renameFile?' + scope.settings.WebApiQueryString,
                                        data: {
                                            "fieldId": scope.field.FormFieldId,
                                            "fileId": file.fileId,
                                            "renameTo": newName
                                        }
                                    }).then(function successCallback(response) {
                                        scope.getFiles();
                                    }, function errorCallback(response) {
                                        console.error(response);
                                    });
                                }
                            }
                        },
                    })
                };
                scope.getFiles = function (opts) {
                    scope.fileList = [];
                    if (opts && opts.imagesOnly) {
                        acceptedFiles = 'images';
                    } else
                        acceptedFiles = attrs.fileExt ? '.' + attrs.fileExt.replace(' ', '').split(',').join(',.') : '';

                    dnnsfHttp(scope.settings.ModuleId, {
                        method: 'POST',
                        url: scope.settings.apiUrl +
                            'FileSystem/queryDirectory?' +
                            scope.settings.WebApiQueryString +
                            '&referrer=' + encodeURIComponent(document.referrer),
                        data: {
                            "fieldId": scope.field.FormFieldId,
                            "filters": [
                                {
                                    "type": "targetDirectory",
                                    "value": "/"
                                },
                                {
                                    "type": "fileExtension",
                                    "isPredefined": acceptedFiles == 'images',
                                    "value": acceptedFiles
                                },
                                {
                                    "type": "includeSubdirectories",
                                    "value": "withFileCount"
                                }
                            ]
                        }
                    }).then(function successCallback(response) {
                        scope.fileList = response.data.files;
                        if (!scope.fileList.length)
                            return setTimeout(function () {
                                scope.emptyFolderMsg = localization.filemanager.emptyfolder;
                            }, 2000);
                        if (opts && opts.files) {
                            var files = { 'selectedFiles': [] };
                            _.each(opts.files, function (fileName, i) {
                                var file = _.find(scope.fileList, ['name', fileName])
                                file && files.selectedFiles.push(file);
                            })
                            callBack(files);
                            setTimeout(function () {
                                dropzone.removeAllFiles();
                                scope.appendFiles = false;
                            }, 0)
                            closeModal();
                        }
                    }, function errorCallback(response) {
                        console.error(response);
                    });
                }

                scope.browseFiles = function () {
                    if (!scope.fileList.length)
                        scope.getFiles();
                    scope.activeTab = "browser";
                }


                if (scope.displayInPopup) {
                    $(element).closest('.form-group').wrap('<div class="dz-modal modal af-modal-module fade" id="dz-modal' + attrs.id + '"><div class="modal-dialog"><div class="modal-content"><div class="modal-body"></div></div></div></div>')
                    $modal = $('#dz-modal' + attrs.id);
                    $modal.find('.modal-dialog').css({ 'width': attrs.popupWidth, 'height': attrs.popupHeight })
                }
                else
                    !dropzone && initDropZone();
                if (scope.formBtn) {
                    $('#dnn' + scope.settings.ModuleId + scope.formBtn).closest('.form-group').appendTo(element.find('.tab-pane.upload>.row-btns'));
                }
                function initDropZone(settings) {
                    if (settings)
                        var forTrumbowyg = settings.forTrumbowyg;
                    if (!attrs.resizeMethod) {
                        attrs.resizeWidth = attrs.resizeHeight = '';
                    }
                    var restriction = [];
                    for(var i=0; i< attrs.restrictedFileNameCharacters.length;i++) {
                    restriction.push(attrs.restrictedFileNameCharacters[i]);
                    }
                    var config = {
                        url: scope.settings.apiUrl + 'FileUpload/Upload?' + scope.settings.WebApiQueryString + '&fieldid=' + scope.field.FormFieldId,
                        // maxFilesize: attrs.fileSizeLimit,
                        //paramName: "uploadfile",
                        acceptedFiles: acceptedFiles || null,
                        parallelUploads: 1, // scope.displayTotalProgressBar ? Number.MAX_SAFE_INTEGER : 2,
                        autoProcessQueue: autoUpload,
                        uploadMultiple: attrs.uploadMultiple == 'True',
                        addRemoveLinks: true,
                        dictDefaultMessage: localization.fileupload[attrs.uploadMultiple == 'True' ? 'multiFilesDefaultMessage' : 'singleFileDefaultMessage'],
                        dictFileTooBig: localization.fileupload.maxFileSize,
                        dictInvalidFileType: localization.fileupload.acceptFileTypes,
                        dictResponseError: localization.actionErrorDefaultMessage,
                        dictRemoveFile: '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>',
                        dictCancelUpload: '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>',
                        resizeWidth: parseInt(attrs.resizeWidth) || null,
                        resizeHeight: parseInt(attrs.resizeHeight) || null,
                        resizeMethod: attrs.resizeMethod || null,
                        maxThumbnailFilesize: 999,
                        headers: {
                            'DNNSF-Time-Offset': scope.settings.timeZoneOffset,
                            "RequestVerificationToken": svcFramework.getAntiForgeryValue()
                        },
                        accept: function(file, done) {
                            if (attrs.restrictedFileNameCharacters != '') {
                                for(var i=0; i < restriction.length; i++) {
                                    if ((file.name.indexOf(restriction[i])) != -1) {
                                        done(attrs.restrictedErrorMessage);
                                    }
                                }
                            }
                            done();
                            }
                    };
                    attrs.fileSizeLimit && (config.maxFilesize = attrs.fileSizeLimit);
                    var getFieldValue = function () {
                        var files = _.map(_.concat(scope.uploadedFiles, _.filter(scope.fileList, ['selected', true])), function (f) {
                            return { "name": f.name, "state": f.selected ? "selected" : "new" }
                        })
                        return JSON.stringify(_.uniqBy(files || []), 'name');
                    }
                    var onChange = function (file) {
                        scope.hasFilesInQueue = dropzone.files.length > 0;
                        scope.updateField({ field: scope.field.TitleCompacted, val: getFieldValue() });
                        scope.progress = null;
                        scope.$apply();
                    }
                    var eventHandlers = {
                        'addedfile': function (file) {
                            if (attrs.uploadMultiple != 'True' && this.files[1] != null) {
                                this.removeFile(this.files[0]);
                            }
                            onChange(file);
                        },
                        'removedfile': function (file) {
                            onChange(file);
                        },
                        'success': function (file, response) {
                            scope.uploadedFiles.push(_.find(response, ['originalFileName', file.name]));
                            if (_.find(this.files, ['status', 'queued']))
                                dropzone.processQueue();
                        },
                        'queuecomplete': function () {
                            scope.loadedFiles = this.files;
                            if (scope.appendFiles) {
                                var opts = {
                                    'imagesOnly': true,
                                    'files': _.map(scope.loadedFiles, function (file) { return file.name })
                                }
                                scope.getFiles(opts);
                            }
                            if (uploadErrors.length && scope.fnCallOnError) {
                                scope.fnCallOnError(uploadErrors.join('<br/>'));
                                uploadErrors = [];
                            } else {
                                scope.fnCallWhenDone && scope.fnCallWhenDone();
                            }
                        },
                        'error': function (file, err, res) {
                            var fileErrorInfo = _.find(err, ['originalFileName', file.name]);
                            if (fileErrorInfo && fileErrorInfo.hasErrors) {
                                uploadErrors.indexOf(fileErrorInfo.error) == -1 && uploadErrors.push(fileErrorInfo.error);
                                this.options.error(file, fileErrorInfo);
                            } else {
                                if (_.isString(err))
                                    uploadErrors.indexOf(err) == -1 && uploadErrors.push(err);
                            }
                            if (_.find(this.files, ['status', 'queued']))
                                dropzone.processQueue();
                        },
                        'totaluploadprogress': function (totalProgress, total) {
                            if (!scope.displayTotalProgressBar)
                                return;
                            $timeout(function () {
                                scope.progress = parseInt(totalProgress);
                            }, 0)
                        },
                        'canceled': function (a, b) {
                            setTimeout(function () {
                                $.each(dropzone.files, function (i, file) { file.status = 'queued' })
                                scope.$apply(function () {
                                    scope.progress = null;
                                }, 0)
                            }, 0)
                        }

                    };
                    dropzone = new Dropzone(element.find('div.dropzone').first()[0], config);

                    dnnsfAngular15.forEach(eventHandlers, function (handler, event) {
                        dropzone.on(event, handler);

                    });
                    !forTrumbowyg && scope.registerControl({
                        control: {
                            field: scope.field,
                            onSubmit: function (fnCallWhenDone, fnCallOnError) {
                                if ((!dropzone.files.length || !_.find(dropzone.files, ['status', 'queued']) && !_.find(dropzone.files, ['status', 'uploading'])) && !dropzone.getRejectedFiles().length)
                                    return fnCallWhenDone();
                                else
                                    uploadErrors.length && fnCallOnError(uploadErrors.join('<br/>'));
                                if (attrs.uploadMultiple != 'True' && scope.activeTab == 'browser')
                                    return fnCallWhenDone();
                                dropzone.processQueue();
                                scope.fnCallWhenDone = fnCallWhenDone;
                                scope.fnCallOnError = fnCallOnError;
                            },
                            getValue: function () {
                                closeModal();
                                if (attrs.uploadMultiple != 'True' && scope.activeTab != 'browser')
                                    clearSelectedFiles();
                                return getFieldValue();
                            }
                        }
                    });
                }
                function clearSelectedFiles() {
                    _.forEach(scope.fileList, function (file, k) {
                        if (file.selected) {
                            file.selected = false;
                        }
                    });
                }
                scope.selectImg = function (img) {
                    img._selected = img.selected;
                    if (attrs.uploadMultiple != 'True')
                        clearSelectedFiles();
                    img.selected = !img._selected;
                }
                var openModal = function () {
                    if (!$modal)
                        return console.error('Please check the file manager settings.');
                    $modal.modal('show').on('show.bs.modal', function () {
                        clearSelectedFiles();
                        scope.$apply();
                    });
                }

                var closeModal = function () {
                    if ($modal)
                        $modal.modal('hide');
                }
                var openForTrumbowyg = function (trumboId) {
                    scope.btnInUpload = scope.btnInBrowser = true;
                    scope.fileBrowser && !scope.fileList.length && scope.getFiles({ 'imagesOnly': true });
                    openModal();
                    scope.uploadFiles = function () {
                        scope.appendFiles = true;
                        scope.processDropzone();
                    }
                }
                function openAsModal(settings, fnDone) {
                    !dropzone && initDropZone();
                    callBack = fnDone;
                    openModal();
                    scope.fileBrowser && !scope.fileList.length && scope.getFiles();
                    scope.uploadFiles = function (tab) {
                        scope.onDone(tab);
                    }
                }

                scope.onDone = function (tab) {
                    if (!form)
                        var form = scope.$parent.form;
                    scope.files.selectedFiles = _.filter(scope.fileList, ['selected', true]);
                    scope.files.filesInQueue = _.map(dropzone.files,
                        function (file) {
                            return {
                                'name': file.name,
                                'fileUrl': file.dataURL,
                                'size': file.size,
                                'status': file.status
                            }
                        })
                    if (callBack) {
                        if (tab && attrs.uploadMultiple != 'True')
                            switch (tab) {
                                case 'uploadTab':
                                    scope.files.lastModified = scope.files.filesInQueue.length && scope.files.filesInQueue[0]
                                    break;
                                case 'browseTab':
                                    scope.files.lastModified = scope.files.selectedFiles.length && scope.files.selectedFiles[0]
                                    break;
                                default:
                                    break;
                            }
                        try {
                            if (typeof callBack !== 'function')
                                callBack = new Function('files', 'form', callBack);
                            callBack(scope.files, form);
                        }
                        catch (e) {
                            console.error(e);
                            console.error('FieldId:' + scope.field.TitleCompacted + '\nPlease check the callBack JavaScript code: ' + attrs.callBack);
                        }
                    }

                    closeModal();
                }
                scope.openFileManager = function (settings, fnDone) {

                    if (settings && settings.trumboId) {
                        !dropzone && initDropZone({ 'forTrumbowyg': true });
                        callBack = fnDone;
                        return openForTrumbowyg(settings.trumboId);
                    } else {
                        openAsModal(settings, fnDone)
                    }
                }


                scope.processDropzone = function () {
                    dropzone.processQueue();
                };

                scope.resetDropzone = function () {
                    dropzone.removeAllFiles();
                }

            }
        }
    }]);
