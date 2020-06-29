define(function () {
    angular.module('app').controller('acr.aprnbah',
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
                gridkey: "aprnbah",
                title: "客戶請款列印",
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
                    "nbr": {
                        displayName: "帳單編號",
                        width: 120
                    },
                    "prn_date": {
                        displayName: "帳單日期",
                        width: 120
                    },
                    "cus_nbr": {
                        displayName: "客戶代號",
                        width: 120
                    },
                    //虛擬欄位
                    "cus_name": {
                        displayName: "客戶名稱",
                        width: 120
                    },
                    "acr_mon": {
                        displayName: "結帳月份",
                        width: 120
                    },
                    "temp_desc": {
                        displayName: "帳單主旨",
                        width: 120
                    },
                    "amt": {
                        displayName: "帳單總額",
                        width: 120
                    },
                    "status": {
                        displayName: "列印情形",
                        width: 120
                    }
                },
                filterItems: {
                    group_nbr: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "group_nbr",
                        label: "組別F"
                    },
                    group_nbrb: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "group_nbrb",
                        label: "組別T"
                    },
                    status: {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [
                            { value: "1", name: "已列印" },
                            { value: "2", name: "未列印" },
                        ],
                        name: "status",
                        label: "列印情形"
                    },
                    prn_date: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "prn_date",
                        label: "帳單日期F"
                    },
                    prn_dateb: {
                        type: "basEsydatetime",
                        lovtype: "",
                        name: "prn_dateb",
                        label: "帳單日期T"
                    },
                    cus_nbr: {
                        type: "basDefault",
                        lovtype: "",
                        name: "cus_nbr",
                        label: "客戶代號F"
                    },
                    cus_nbrb: {
                        type: "basDefault",
                        lovtype: "",
                        name: "cus_nbrb",
                        label: "客戶代號T"
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
                        url: "acr/aprnbah/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "客戶帳單列印",
                        url: 'acr/aprnbah.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshaprnbah', function (event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});