(function (angular) {
    angular.module('Activate', ['dnnsf'])
        .controller('ActivateCtl', ['$scope', '$http', 'dnnsfHttp',
            function ($scope, $http, dnnsfHttp) {

                $scope.upoloadKeySupported = window.File && window.FileReader && window.FileList && window.Blob;
                $scope.host = window.currentAlias;
                $scope.hosts = window.hosts;
                $scope.isAdmin = window.isAdmin;
                $scope.hash = window.location.hash;
                $scope.licenseType = null;

                var fnRegcCoreRequest = function (url, data, fnDone) {
                    $scope.errInput = false;
                    $scope.loading = false;
                    $scope.response = '';

                    $scope.loading = true;
                    $http({
                        method: 'POST',
                        url: url,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        data: $.param(data)
                    }).success(function (data, status) {

                        if (data.error) {
                            $scope.loading = false;
                            $scope.response = data.error;
                            return;
                        }

                        fnDone && fnDone(data);
                    });
                }

                var fnSaveKey = function (data, fnDone) {
                    // submit license keys to this server
                    var url = $scope.app.SupportsWebAPI
                        ? $scope.app.BaseUrl + '/API/settings/SaveActivation?_alias=' + encodeURIComponent(window.currentAlias)
                        : $scope.app.BaseUrl + '/AdminApi.ashx?Method=SaveActivation&_alias=' + encodeURIComponent(window.currentAlias);
                    dnnsfHttp(-1, {
                        method: 'POST',
                        url: url,
                        data: data
                    }).success(function (data, status) {
                        if (data && data.error) {
                            $scope.loading = false;
                            $scope.response = data.error;
                            return;
                        }

                        fnDone && fnDone(data);
                    });
                };

                var fnActivate = function () {
                    fnRegcCoreRequest('https://www.dnnsharp.com/DesktopModules/RegCore/Api3/Activate.aspx', {
                        productCode: $scope.app.Code,
                        versionCode: $scope.app.Build,
                        licenseKey: $scope.invoiceNo,
                        publicKey: $scope.app.Key,
                        host: $scope.host,
                        machine: $scope.app.MachineName,
                        hostid: $scope.app.HostGuid
                    }, function (data) {
                        fnSaveKey(data, function () {
                            window.location = $scope.returnUrl;
                        });
                    });
                };

                $scope.activate = function () {


                    if (!$scope.host || !$scope.app.Key || !$scope.invoiceNo) {
                        $scope.errInput = true;
                        return;
                    }

                    if (!$scope.licenseType) {
                        fnRegcCoreRequest('https://www.dnnsharp.com/DesktopModules/RegCore/Api3/GetLicenseType.aspx', {
                            productCode: $scope.app.Code,
                            versionCode: $scope.app.Build,
                            licenseKey: $scope.invoiceNo,
                            publicKey: $scope.app.Key
                        }, function (data) {
                            $scope.licenseType = data;
                            // if additional info not required, proceed to activation
                            if ($scope.licenseType.code == 'DOM' || $scope.licenseType.code == '3DOM' ||
                                $scope.licenseType.code == 'XDOM' || $scope.licenseType.code == '3XDOM' ||
                                $scope.licenseType.code == 'STD' || $scope.licenseType.code == '3STD' || $scope.licenseType.code == 'SRV') {
                                $scope.loading = false;
                                $scope.isEnterprise = false;
                            } else {
                                $scope.isEnterprise = true;
                                fnActivate();
                            }
                        });
                        return;
                    }


                    // if license type is set, activate
                    fnActivate();

                };

                $scope.unlockTrial = function () {

                    if (!$scope.host || !$scope.username || !$scope.password) {
                        $scope.errInput = true;
                        return;
                    }

                    fnRegcCoreRequest('https://www.dnnsharp.com/DesktopModules/RegCore/Api3/UnlockTrial.aspx', {
                        productCode: $scope.app.Code,
                        versionCode: $scope.app.Build,
                        host: $scope.host,
                        username: $scope.username,
                        password: $scope.password
                    }, function (data) {
                        fnSaveKey(data, function () {
                            window.location = $scope.returnUrl;
                        });
                    });

                };

            }]
        );

    // this autosizes admin iframe so it doesn't have a scrollbar
    if (window.postMessage && window.top) {
        var $ = window.dnnsfjQuery || window.$;
        var __prevHeight = 0;
        setInterval(function () {
            var bodyHeight = $('body').height() + 50;
            if (bodyHeight != __prevHeight) {
                __prevHeight = bodyHeight;
                // console.log("admin.js, dnn-ua-height: ", bodyHeight);
                window.top.postMessage(JSON.stringify({
                    type: dnnsf.urlParam('comm-prefix') + "-height",
                    height: __prevHeight
                }), "*");
            }
        }, 200);

        // scroll into view
        window.top.postMessage(JSON.stringify({
            type: dnnsf.urlParam('comm-prefix') + "-scroll",
            offset: -80
        }), "*");
    }

})(window.dnnsfAngular15 || window.angular);
