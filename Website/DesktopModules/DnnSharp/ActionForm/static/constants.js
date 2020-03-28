(function (angular) {
    angular.module("dnnsfConstants", [])
        .factory("constantsService", function () {
            return {
                requiresSvcframework: function () { return true; }
            }
        })

    window.dnnsfDependencies ? window.dnnsfDependencies.push("dnnsfConstants") : (window.dnnsfDependencies = ["dnnsfConstants"]);
})(dnnsfAngular15 || angular);