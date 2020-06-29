define(function() {
    angular.module('app').controller('bas.invpps',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;

            scope.data = [
                { id: "1", aaa: "", name: "11111" },
                { id: "11", aaa: "1", name: "11-111" },
                { id: "12", aaa: "1", name: "11-222" },
                { id: "2", aaa: "", name: "222222" }
            ];

            scope.treeOption = {
                lowerlevels: [],
                title: "用料结构",
                id: "id",
                parent: "aaa",
                name: "name",
                clicknode: function(item, level) { //tree内部固定

                },
                addfn: function(item) {

                },
                delfn: function() {

                },
                load: function() {


                }
            }

        });

});