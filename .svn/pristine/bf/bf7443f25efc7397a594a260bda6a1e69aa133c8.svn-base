define(function() {
    angular.module('app').controller('bas.cuscus',
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
                gridkey: "cuscus",
                title: "客戶資料",
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
                    "cus_nbr": {
                        displayName: "客戶編號",
                        width: 120
                    }
                     ,
                    "cus_name": {
                        displayName: "客戶名稱",
                        width: 120
                    }
                     ,
                    "cus_tel1": {
                        displayName: "客戶電話1",
                        width: 120
                    }
                     ,
                    "big_key": {
                        displayName: "譯音碼",
                        width: 120
                    }
                     ,
                    "group_nbr": {
                        displayName: "組別",
                        width: 120
                    }
                     ,
                    "cus_addr": {
                        displayName: "客戶地址",
                        width: 120
                    }
                     ,
                    "sen_addr": {
                        displayName: "送貨地址",
                        width: 120
                    }
                     ,
                    "attname1": {
                        displayName: "聯絡人1",
                        width: 120
                    }
                     ,
                    "attname2": {
                        displayName: "聯絡人2",
                        width: 120
                    }
                     ,
                    "remark4": {
                        displayName: "廠商類別",
                        width: 120
                    }
                     ,
                    "l_update": {
                        displayName: "最近異動日期",
                        width: 120
                    }
                     ,
                    "l_shpdate": {
                        displayName: "最近交易日期",
                        width: 120
                    }
                },
                filterItems: {
                    cus_nbr: {
                        type: "basLov",
                        lovtype:"getcus",
                        name: "cus_nbr",
                        label: "客戶編號"
                    }
                     ,
                    group_nbr: {
                        type: "basLov",
                        lovtype:"getgroup",
                        name: "group_nbr",
                        label: "組別"
                    }
                }
            }

            scope.action = {
                add: function() {
                    $rootScope.uid = "";
                    scope.action.opendetail();
                },

                load: function() {

                    scope.promise=utils.ajax({
                        method: 'POST',
                        url: "bas/cuscus/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort="+ scope.datapage.sort,
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
                changepage: function(page, size,sort) {
                    scope.datapage.page = page;
                    scope.datapage.size = size;
                    if (sort){
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
                        name: "客戶資料維護",
                        url: 'bas/cuscus.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshcuscus', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});
