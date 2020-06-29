define(function() {
    angular.module('app').controller('ord.projcet',
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
                gridkey: "projcet",
                title: "專案管理",
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
                    "nbr": {
                        displayName: "合約編號",
                        width: 120
                    }
                     ,
                    "con_nbr": {
                        displayName: "案件編號",
                        width: 120
                    }
                     ,
                    "cus_nbr": {
                        displayName: "客戶編號",
                        width: 120
                    }
                     ,
                    "plan_date": {
                        displayName: "預計完成日期",
                        width: 120
                    }
                     ,
                    "items_desc": {
                        displayName: "合約描述",
                        width: 120
                    }
                     ,
                    "work_desc": {
                        displayName: "工作細項",
                        width: 120
                    }
                     ,
                    "inv_date": {
                        displayName: "委任日期",
                        width: 120
                    }
                     ,
                    "proj_status": {
                        displayName: "核准否",
                        width: 120
                    }
                     ,
                    "close_flag": {
                        displayName: "結案否",
                        width: 120
                    }
                },
                filterItems: {
                    group_nbr: {
                        type: "basLov",
                        lovtype:"getmtype",
                        name: "group_nbr",
                        label: "組別"
                    }
                     ,
                    inv_date: {
                        type: "basEsydatetime",
                        lovtype:"",
                        name: "inv_date",
                        label: "委任日期"
                    }
                     ,
                    close_date: {
                        type: "basEsydatetime",
                        lovtype:"",
                        name: "close_date",
                        label: "結案日期"
                    }
                     ,
                    close_flag: {
                        type: "basLov",
                        lovtype:"getmtype",
                        name: "close_flag",
                        label: "結案否"
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
                        url: "ord/contbah/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort="+ scope.datapage.sort,
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
                        name: "專案資料維護",
                        url: 'ord/projcet.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshcontbah', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});
