define(function() {
    angular.module('app').controller('ord.contyear',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;

            scope.filter = {
                // cus_nbr: " ",
                // cus_nbrb: " ",
            };
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
                gridkey: "contyear",
                title: "年度結轉",
                listoperation: {

                    save: {
                        name: "存檔",
                        icon: "fa-save",
                        action: function(event, scope) {
                            scope.action.save();
                        }
                    },

                },
                headers: {
                    "cus_nbr": {
                        displayName: "客戶代號",
                        width: 120
                    },
                    "cus_name": {
                        displayName: "客戶名稱",
                        width: 120
                    },
                    "date": {
                        displayName: "合約日期",
                        width: 120
                    },
                    "items_desc": {
                        displayName: "合約內容",
                        width: 120
                    },
                    "plan_date": {
                        displayName: "預計完成日期",
                        width: 120
                    },
                    "amt": {
                        displayName: "公費金額",
                        width: 120
                    },
                    "tot_amt": {
                        displayName: "請款金額",
                        width: 120
                    }
                },
                filterItems: {
                    cus_nbr: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "cus_nbr",
                        label: "客戶代號F"
                    },
                    cus_nbrb: {
                        type: "basLov",
                        lovtype: "getcus",
                        name: "cus_nbrb",
                        label: "客戶代號T"
                    },
                    date: {
                        type: "basEsydatetime",
                        name: "date",
                        label: "合約日期F"
                    },
                    dateb: {
                        type: "basEsydatetime",
                        name: "dateb",
                        label: "合約日期T"
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },
                save: function() {
                    if (!scope.config.gridApi) {
                        return
                    }
                    var rows = scope.config.gridApi.selection.getSelectedRows();
                    if (rows.length == 0) {
                        toastr.warning("請選擇紀錄");
                        return
                    }
                    var uids = [];
                    rows.forEach(element => {
                        uids.push(element.uid);
                    });
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "ord/contyear/savecontcase",
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: uids
                    }).then(function(res) {
                        scope.action.load();
                    });
                },
                load: function() {
                    console.log("see", scope.filter)
                    scope.promise = utils.ajax({
                        method: 'POST',
                        url: "ord/contyear/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort=" + scope.datapage.sort,
                        mockUrl: "plugins/base/data/orderlines.json",
                        data: scope.filter
                    }).then(function(res) {
                        console.log(res);
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

            }
            $scope.$on('refreshcontbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});