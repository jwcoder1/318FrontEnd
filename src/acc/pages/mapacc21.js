define(function () {
    angular.module('app').controller('acc.mapacc21',
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
                gridkey: "mapacc21",
                title: "傳票登入作業",
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
                    "date": {
                        displayName: "傳票日期",
                        width: 120
                    },
                    "nbr": {
                        displayName: "傳票號碼",
                        width: 120
                    },
                    "c_or_d": {
                        displayName: "借方或貸方",
                        width: 120
                    },
                    "acc_id": {
                        displayName: "會計科目",
                        width: 120
                    },
                    "acc_name": {
                        displayName: "科目名稱",
                        width: 120
                    },
                    "io_nbr": {
                        displayName: "客戶代號",
                        width: 120
                    },
                    "io_name": {
                        displayName: "客戶名稱",
                        width: 120
                    },
                    "mark_name": {
                        displayName: "摘要",
                        width: 120
                    }
                },
                filterItems: {
                    date: {
                        type: "basEsydatetime",
                        name: "date",
                        label: "傳票日期F"
                    },
                    dateb: {
                        type: "basEsydatetime",
                        name: "dateb",
                        label: "傳票日期T"
                    },
                    io_nbr: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "io_nbr",
                        label: "客戶代號F"
                    },
                    io_nbrb: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "io_nbrb",
                        label: "客戶代號T"
                    },
                    acc_id: {
                        type: "basLov",
                        lovtype: "getsubject",
                        name: "acc_id",
                        label: "會計科目F"
                    },
                    acc_idb: {
                        type: "basLov",
                        lovtype: "getsubject",
                        name: "acc_idb",
                        label: "會計科目T"
                    },
                    status: {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [{
                            value: "NA",
                            name: "未過帳"
                        },
                        {
                            value: "CL",
                            name: "已過帳"
                        },
                    ],
                        name: "status",
                        label: "傳票狀態"
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
                        url: "acc/accbat/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
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
                        name: "登入作業明細",
                        url: 'acc/mapacc21.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshaccbat', function (event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});