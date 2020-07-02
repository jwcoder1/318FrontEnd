define(function() {
    angular.module('app').controller('bas.basgroup',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = {};
            scope.model = {
                records: 0,
                content: []
            }
            scope.datapage = {
                page: 0,
                size: 20,
                sort: "created,desc"
            }
            scope.promise = null;
            scope.listUrl = "plugins/bas/templates/list.html";
            scope.config = {
                gridkey: "basgroup",
                title: "組別項目",
                listoperation: {
                    add: {
                        name: "新增",
                        icon: "fa-calendar-check-o",
                        action: function(event, scope) {
                            scope.action.add();
                        }
                    }
                },
                headers: {
                    "group_nbr": {
                        displayName: "組別代號",
                        width: 120
                    },
                    "group_name": {
                        displayName: "組別名稱",
                        width: 120
                    }
                },
                filterItems: {
                    group_name: {
<<<<<<< .mine
                        type: "basLov",
                        lovtype:"getgroup",
=======
                        type: "basDefault",
                        lovtype: "",
>>>>>>> .r19
                        name: "group_name",
                        label: "組別名稱"
                    },
                    group_nbr: {
<<<<<<< .mine
                        type: "basLov",
                        lovtype:"getgroup",
=======
                        type: "basLov",
                        lovtype: "getgroup",
>>>>>>> .r19
                        name: "group_nbr",
                        label: "組別代號"
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "bas/basgroup/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        scope.model = res.data.body;
                    });

                },
                reset: function() {
                    scope.filter = {

                    };

                },
                changepage: function(page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    if (sort) {
                        scope.datapage.sort = sort;
                    }
                    scope.action.load();
                },
                rowclick: function(entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function() {
                    var node = {
                        name: "組別項目明細",
                        url: 'bas/basgroup.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshbasgroup', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});