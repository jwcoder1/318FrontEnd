define(function () {
    angular.module('app').controller('acr.tempbat',
        function ($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
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
                gridkey: "tempbat",
                title: "代墊款登入",
                listoperation: {
                    add: {
                        name: "新增",
                        icon: "fa-calendar-check-o",
                        action: function (event, scope) {
                            scope.action.add();
                        }
                    }
                },
                headers: {
                    "temp_nbr": {
                        displayName: "項目編號",
                        width: 120
                    },
                    "temp_desc": {
                        displayName: "代墊內容",
                        width: 120
                    },
                    "amt": {
                        displayName: "金額",
                        width: 120
                    },
                    "acr_mon": {
                        displayName: "請款月份",
                        width: 120
                    },
                    "status": {
                        displayName: "狀態",
                        width: 120
                    }
                },
                filterItems: {
                    cus_nbr: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "cus_nbr",
                        label: "客戶編號"
                    },
                    // //虛擬欄位
                    // cus_name: {
                    //     type: "basLov",
                    //     lovtype: "getcus",
                    //     name: "cus_name",
                    //     label: "客戶名稱"
                    // },
                    nbr: {
                        type: "basLov",
                        lovtype: "getcontract",
                        name: "nbr",
                        label: "合約編號"
                    }
                }
            }

            scope.action = {
                add: function () {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function () {

                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "acr/tempbat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function (res) {
                        scope.model = res.data.body;
                    });

                },
                reset: function () {
                    scope.filter = {

                    };

                },
                changepage: function (page, size, sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    if (sort) {
                        scope.datapage.sort = sort;
                    }
                    scope.action.load();
                },
                rowclick: function (entity) {
                    $rootScope.uid = entity.uid;
                    scope.action.opendetail();
                },
                opendetail: function () {
                    var node = {
                        name: "代墊款登入作業明細",
                        url: 'acr/tempbat.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshtempbat', function (event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});