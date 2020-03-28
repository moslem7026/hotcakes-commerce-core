//var angularFormsApp = angular.module('angularFormsApp', ['ui.router']);
var routerApp = angular.module('angularFormsApp', ['ui.router']);
routerApp.controller('GiftCard', function ($scope) {
    $scope.xss;
    $scope.lst1chnge = function () {
        alert($scope.cadr);
    };
    $scope.xs = [
        { id: 1, value: 'نوبت اول', selected: false },
        { id: 2, value: 'نوبت دوم', selected: false },
        { id: 3, value: 'نوبت سوم', selected: false }
    ];
    $scope.cadr = [];
    $scope.row = [
        { id: 1, value: 'نوبت اول', selected: false },
        { id: 2, value: 'نوبت دوم', selected: false },
        { id: 3, value: 'نوبت سوم', selected: false }
    ];
    $scope.btnAdd = function () {
        $scope.xs.push([
            { id: 4, value: 'نوبت اasdول', selected: false },
            { id: 5, value: 'نوبت دوadaم', selected: false },
            { id: 6, value: 'نوبت asd', selected: false }
        ]);
        return;
        //$.ajax({
        //    url: "/DesktopModules/MVC/NeyrizanAds/GiftCard/CheckGiftCard",
        //    type: "GET",
        //    beforeSend: sf.setModuleHeaders,
        //    data: { PassKey: $scope.giftInput },
        //    success: function (data2) {
        //        alert(data2);
        //        $('#ResultAfterCreditEnquery').html(data2);
        //        $scope.$apply();
        //    }
        //    , statusCode: {
        //        404: function (data) {
        //            alert(data);
        //            $scope.$apply();
        //        }
        //    }
        //});

    };
});
routerApp.controller('fiftyDiscount', function ($scope) {
    $scope.CheckRetiredText = "اعمال تخفیف 50 درصدی ویژه بازنشستگان";
    $scope.showSuccessAlert = false;
    $scope.showErrorAlert = false;
    $scope.asdasd = "در ارتباط با سیستم مرکزی مشکلی پیش آمده است. با پشتیبان فنی تماس بگیرید (Ip Is Invalid)";
    $scope.showSuccessAlert = true;
    $scope.ApplyTakhfif = function () {
        $scope.btnCheckDisable = true;
        $scope.CheckText = "لطفا صبر کنید";

        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $.ajax({
            url: "/DesktopModules/MVC/NeyrizanAds/GDS/ApplyFiftyDiscount",
            type: "GET",
            beforeSend: sf.setModuleHeaders,
            data: { NationalCode: $scope.codemelli, DaftarNumber: $scope.daftarNumber },
            success: function (data2) {
                if (data2 == "1") {
                    $scope.showSuccessAlert = true;
                    $scope.successTextAlert = "اطلاعات ورودی با موفقیت ثبت شد و شما مشمول 50% تخفیف می شوید. لطفا هتل خود را جستجو نمایید.";
                    $scope.CheckRetiredText = "مشمول 50% تخفیف هستید";
                    $scope.isDisabled = true;
                    $scope.CheckText = "ادامه جهت جستجو و رزرو";
                }
                else if (data2 == "104") {
                    $scope.showErrorAlert = true;
                    $scope.successTextAlert = "اطلاعات یافت نشد . لطفا مجدد بررسی بفرمایید";
                    $scope.btnCheckDisable = false;
                    $scope.CheckText = "بررسی اطلاعات";
                }
                else if (data2 == "102") {
                    $scope.showErrorAlert = true;
                    $scope.successTextAlert = "در ارتباط با سیستم مرکزی مشکلی پیش آمده است. با پشتیبان فنی تماس بگیرید (Ip Is Invalid).";
                    $scope.btnCheckDisable = false;
                    $scope.CheckText = "بررسی اطلاعات";
                }
                else {
                    $scope.showErrorAlert = true;
                    $scope.successTextAlert = "خطا . کد خطا : " + data2;
                    $scope.btnCheckDisable = false;
                    $scope.CheckText = "بررسی اطلاعات";
                }

                $scope.$apply();
            }
            , statusCode: {
                500: function (data) {
                    alert("لطفا از صحیح بودن اطلاعات مطمن شوید");
                    $scope.btnCheckDisable = false;
                    $scope.CheckText = "بررسی اطلاعات";
                    $scope.$apply();
                }
            }
        });

    };
    $scope.CheckText = "بررسی اطلاعات";
    $scope.showSuccessAlert = false;

});
routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/DesktopModules/MVC/NeyrizanAds/content/Angular/Home.html',
        controller: 'moslem'
    })
        .state('Rooms', {
            url: '/Rooms',
            views: {
                '': { template: 'partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    template: 'table-data.html',
                    controller: 'scotchController'
                }
            }
        });


});
routerApp.controller('moslem', function ($scope) {
    $scope.isValidForDiscount = false;
    $scope.usediscount = false;
    $scope.haspartner = false;
    $scope.AmountBeforeDiscount = $('#amount').val();
    $scope.calculateDiscount = function () {
        $scope.AmountAfterDiscount = $scope.AmountBeforeDiscount;
        if ($scope.usediscount && $scope.haspartner && $scope.isValidForDiscount) {
            if ($scope.AmountBeforeDiscount > 6600000) {
                $scope.AmountAfterDiscount = $scope.AmountBeforeDiscount - 6600000;
            }
            else
                $scope.AmountAfterDiscount = 0;
        }
        else if ($scope.usediscount && !($scope.haspartner) && $scope.isValidForDiscount) {
            if ($scope.AmountBeforeDiscount > 3300000) {
                $scope.AmountAfterDiscount = $scope.AmountBeforeDiscount - 3300000;
            }
            else
                $scope.AmountAfterDiscount = 0;
        }
        $('#AmountAfterDiscount').val($scope.AmountAfterDiscount);
        // alert($('#AmountAfterDiscount').val());
        //  alert($scope.AmountAfterDiscount);
    }
    $scope.$watch('AmountAfterDiscount', function (newValue, oldValue) {
        if (newValue === "")
            $('AmountAfterDiscount').val(newValue);
    });
    $scope.CheckText = "بررسی اطلاعات";
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };
    $scope.ApplyTakhfif = function () {
        if ($('#ContentPlaceHolder1_TKharidar_NationalID').val() == '') {
            show_error_panel('d_panel_kharidarinfo', 'ContentPlaceHolder1_TKharidar_NationalID', 'کد ملی را را وارد نمایید', 1000);
            return false;
        }
        if ($('#daftar').val() == '') {
            show_error_panel('d_panel_kharidarinfo', 'daftar', 'شماره دفتر را وارد نمایید', 1000);
            return false;
        }
        $scope.CheckText = "لطفا صبر کنید ...";
        $scope.isDisabled = true;
        $.ajax({
            url: "/DesktopModules/MVC/NeyrizanAds/GDS/RetiredIsValid",
            type: "GET",
            beforeSend: sf.setModuleHeaders,
            data: { NationalCode: $scope.NationalCode, DaftarNumber: $scope.daftarNumber },
            dataType: 'json',
            success: function (data) {
                $scope.calculateDiscount();
                $scope.CheckText = "بررسی اطلاعات";
                $scope.$apply();
                if (data == "102") {
                    $scope.isDisabled = false;
                    $scope.isValidForDiscount = false;
                    $scope.calculateDiscount();
                    $scope.successTextAlert = "در ارتباط با سیستم مرکزی مشکلی پیش آمده است. با پشتیبان فنی تماس بگیرید (Ip Is Invalid)";
                    $scope.showSuccessAlert = true;
                    $scope.$apply();
                }
                else if (data == "0") {
                    $scope.showSuccessAlert = true;
                    $scope.isDisabled = false;
                    $scope.isValidForDiscount = false;
                    $scope.calculateDiscount();
                    $scope.successTextAlert = "اطلاعات بازنشسته پیدا نشد";
                    $scope.showSuccessAlert = true;
                    $scope.$apply();
                }
                else if (data == "1") {

                    $.ajax({
                        url: "/DesktopModules/MVC/NeyrizanAds/GDS/retiredhascredit",
                        type: "GET",
                        beforeSend: sf.setModuleHeaders,
                        data: { NationalCode: $scope.NationalCode, DaftarNumber: $scope.daftarNumber },
                        success: function (data2) {
                            $scope.showSuccessAlert = false;
                            $scope.isDisabled = true;
                            $scope.switchBool('true');
                            $scope.CheckText = "شما مجاز به استفاده تور بازنشستگی هستید.";
                            $scope.isValidForDiscount = true;
                            $scope.calculateDiscount();
                            $('#ResultAfterCreditEnquery').html(data2);
                            $scope.$apply();
                        }
                    });
                }
                else if (data == "103") {
                    $scope.isDisabled = false;
                    $scope.isValidForDiscount = false;
                    $scope.calculateDiscount();
                    $scope.successTextAlert = " در ارتباط با سیستم مرکزی مشکلی پیش آمده است. با پشتیبان فنی تماس بگیرید (User Name/Password Invalid) ";
                    $scope.showSuccessAlert = true;
                    $scope.$apply();
                }
                else if (data == "104") {
                    $scope.isDisabled = false;
                    $scope.isValidForDiscount = false;
                    $scope.calculateDiscount();
                    $scope.successTextAlert = "کد ملی یا شماره دفتر کل نامعتبر است.";
                    $scope.showSuccessAlert = true;
                    $scope.$apply();
                }
                return false;
            },
            statusCode: {
                500: function (data) {
                    $scope.isValidForDiscount = false;
                    $scope.calculateDiscount();
                    $scope.isDisabled = false;
                    $scope.calculateDiscount();
                    $scope.CheckText = "بررسی اطلاعات";
                    $scope.successTextAlert = "خطای نا مشخصی پیش آمده است.";
                    $scope.showSuccessAlert = true;
                    $scope.$apply();
                }
            }
        });
    };

});
console.log('asd');

var routerApps = angular.module('angularFormsApps', ['ui.router']);
routerApps.controller('Search', function ($scope) {
    $scope.switchBool = function (value) {
        $scope[value] = !$scope[value];
    };
    $scope.showSuccessAlert = false;
    $scope.showErrorAlert = false;
    $scope.isDisabled = false;

    $scope.AddNotify = function () {
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;

        if ($scope.NameAndFamily == '' || $scope.Mobile == '') {
            $scope.showErrorAlert = true;
            $scope.successTextAlert = "لطفا نام و نام خانوادگی و شماره تماس را وارد نمایید.";
            if ($scope.NameAndFamily == '') {
                document.getElementById("NameAndFamily").focus();
            }
            else
                document.getElementById("Mobile").focus();
            return false;
        }
        $.ajax({
            url: "/DesktopModules/MVC/NeyrizanAds/GDS/AddNotify",
            type: "POST",
            beforeSend: sf.setModuleHeaders,
            data: { sDate: $scope.sdate, eDate: $scope.edate, NameAndFamily: $scope.NameAndFamily, Mobile: $scope.Mobile, Room: $scope.roomName, Hotel: $scope.HotelName },
            success: function (data2) {
                $scope.showSuccessAlert = true;
                $scope.successTextAlert = "درخواست شما با موفقیت ثبت شد. همکاران ما با شما تماس خواهند گرفت";
                $scope.isDisabled = true;
                $scope.$apply();
            }
            , statusCode: {
                500: function (data) {
                    $scope.showErrorAlert = true;
                    $scope.btnCheckDisable = false;
                    $scope.successTextAlert = "خطای داخلی رخ داده است";
                    $scope.$apply();
                },
                404: function (data) {
                    $scope.showErrorAlert = true;
                    $scope.btnCheckDisable = false;
                    $scope.successTextAlert = "خطای 404 رخ داده است";
                    $scope.$apply();
                }
            }
        });

    };
    $scope.btnShowNotifyModal = function (val) {
        $scope.roomName = val;
        $scope.showSuccessAlert = false;
        $scope.showErrorAlert = false;
        $scope.isDisabled = false;
        $scope.NameAndFamily = "";
        $scope.Mobile = "";
    };
});
