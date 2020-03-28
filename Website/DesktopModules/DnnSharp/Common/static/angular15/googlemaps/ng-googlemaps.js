(function (angular) {
    "use strict";
    angular.module("ngGooglemaps", ["ngMap"])

        .directive("ngGooglemaps", ["NgMap", "NavigatorGeolocation", "$interval", "$timeout", function (NgMap, NavigatorGeolocation, $interval, $timeout) {
            return {
                restrict: "E",
                templateUrl: dnnsf.commonUrl + '/static/angular15/googlemaps/googlemaps.html?v=' + dnnsf.commonVersion,
                scope: {
                    field: '=',
                    registerControl: '&',
                    updateField: '&'
                },
                link: {
                    pre: function ($scope) {
                        $scope.fieldParameters = $scope.field.Parameters;
                        $scope.fieldData = $scope.$parent.form.fields[$scope.field.TitleCompacted];

                        $scope.googleplacesField = _.find($scope.$parent.form.fields, function (afField) { return afField.type === "googleplaces" });
                        $scope.googleUrl = 'https://maps.googleapis.com/maps/api/js?key=';
                        $scope.googleUrlWithKey = 'https://maps.googleapis.com/maps/api/js?key=' + $scope.fieldData.apikey;
                    },
                    post: function ($scope) {
                        if ($scope.googleplacesField) {
                            var checkForGoogle = $interval(function () {
                                if (window.google) {
                                    $interval.cancel(checkForGoogle);
                                    $scope.googleLoaded = true;
                                }
                            }, 50);
                        }

                        NgMap.getMap('map' + $scope.fieldData.id).then(function (map) {
                            if ($scope.fieldData.centerType === "geolocation") {
                                NavigatorGeolocation.getCurrentPosition().then(function (position) {
                                    map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
                                });
                            }

                            var initialMapZoom = Number($scope.fieldData.zoom);
                            initialMapZoom && map.setZoom(initialMapZoom);

                            $scope.map = map;
                            var markerLimit = $scope.fieldParameters.Markers.length + 1;

                            $scope.markerArray = [];
                            google.maps.event.addListener(map, 'click', function (event) {
                                if ($scope.markerArray.length < markerLimit) {
                                    var marker = new google.maps.Marker({
                                        position: event.latLng,
                                        map: map,
                                        draggable: true
                                    });
                                    $scope.markerArray.push(marker);
                                }
                            });


                            $scope.adminCircleArray = [];
                            if ($scope.fieldData.circles.length) {
                                $scope.fieldData.circles.forEach(function (circle) {
                                    $scope.adminCircleArray.push({
                                        position: {
                                            lat: Number(circle.Latitude),
                                            lng: Number(circle.Longitude),
                                            radius: Number(circle.Radius)
                                        }
                                    });
                                });
                            }

                            $scope.adminMarkerArray = [];
                            if ($scope.fieldData.markers) {
                                $scope.fieldData.markers.forEach(function (marker) {
                                    var markerLat, markerLong;
                                    markerLat = Number(marker.Latitude);
                                    markerLong = Number(marker.Longitude);

                                    $scope.adminMarkerArray.push({
                                        position: {
                                            lat: markerLat,
                                            lng: markerLong
                                        }
                                    });

                                });
                            }

                            if ($scope.fieldData.centerType === "zoomtomarkers" && $scope.fieldParameters.Markers.length) {
                                $scope.zoomToMarkers = true;
                                var bounds = new google.maps.LatLngBounds();

                                $scope.adminMarkerArray.forEach(function (marker) {
                                    bounds.extend(new google.maps.LatLng(marker.position.lat, marker.position.lng));
                                });

                                var boundsChangedListener = map.addListener('bounds_changed', function (e) {
                                    // bounds_changed actually first triggers when the map is properly initialized with the default values
                                    // after this, we can remove the listener and zoom to markers
                                    google.maps.event.removeListener(boundsChangedListener);
                                    map.fitBounds(bounds);
                                    map.panToBounds(bounds);
                                });

                            }

                        });

                        $scope.registerControl({
                            control: {
                                field: $scope.field,
                                onSubmit: function (fnCallWhenDone, fnCallOnError) {
                                    fnCallWhenDone && fnCallWhenDone();
                                },
                                getValue: function () {
                                    var data = {
                                        markers: [],
                                        circles: [],
                                        center: { lat: $scope.map && $scope.map.getCenter().lat(), lng: $scope.map && $scope.map.getCenter().lng() },
                                        zoom: $scope.map && $scope.map.getZoom()
                                    };

                                    if ($scope.markerArray) {
                                        $scope.markerArray.forEach(function (marker) {
                                            data.markers.push({
                                                lat: marker.position.lat(),
                                                lng: marker.position.lng()
                                            });
                                        });
                                    }

                                    if ($scope.adminMarkerArray) {
                                        $scope.adminMarkerArray.forEach(function (marker) {
                                            data.markers.push({
                                                lat: marker.position.lat,
                                                lng: marker.position.lng
                                            });
                                        });
                                    }

                                    if ($scope.adminCircleArray) {
                                        $scope.adminCircleArray.forEach(function (circle) {
                                            data.circles.push({
                                                lat: circle.position.lat,
                                                lng: circle.position.lng,
                                                radius: circle.position.radius
                                            });
                                        });
                                    }

                                    return JSON.stringify(data);
                                }
                            }
                        });
                    }
                }
            }
        }]);
})(window.dnnsfAngular15 || window.angular);