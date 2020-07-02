define(function () {
    angular.module('app').controller('acr.contacr',
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
                gridkey: "contacr",
                title: "應收帳款查詢",
                listoperation: {
                    // add: {
                    //     name: "新增",
                    //     icon: "fa-calendar-check-o",
                    //     action: function (event, scope) {
                    //         scope.action.add();
                    //     }
                    // }
                },
                headers: {
                    "cus_nbr": {
                        displayName: "客戶編號",
                        width: 120
                    },
                    "cus_alias": {
                        displayName: "客戶簡稱",
                        type: "basString",
                        width: 120
                    },
                    "coin_nbr": {
                        displayName: "合約編號",
                        type: "basString",
                        width: 120
                    },
                    "attname3": {
                        displayName: "主辦會計",
                        type: "basString",
                        width: 120
                    },
                    "*acr_amt": {
                        displayName: "前期未收金額",
                        type: "basNumber",
                        width: 120
                    },
                    "*tax_amt": {
                        displayName: "本期公費金額",
                        type: "basNumber",
                        width: 120
                    },
                    "*rec_amt": {
                        displayName: "本期已收公費",
                        type: "basNumber",
                        width: 120
                    },
                    "*tot_amt": {
                        displayName: "未收代墊款",
                        type: "basNumber",
                        width: 120
                    },
                    "*tot_amt": {
                        displayName: "本期餘額",
                        type: "basNumber",
                        width: 120
                    }
                },
                filterItems: {
                    acr_mon: {
                        type: "basEsydatetime",
                        format:"YYYYMM",
                        name: "acr_mon",
                        label: "結帳月份"
                    },
                    group_nbr: {
                        type: "basLov",
                        lovtype: "getgroup",
                        name: "group_nbr",
                        label: "組別F"
                    },
                    group_nbrb: {
                        type: "basLov",
                        lovtype: "getgroup",
                        name: "group_nbrb",
                        label: "組別T"
                    },
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
                        url: "acr/contacr/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "",
                        url: 'acr/contacr.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshcontacr', function (event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});