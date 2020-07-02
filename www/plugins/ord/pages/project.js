define(function() {
    angular.module('app').controller('ord.project',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;
            scope.filter = { 
                proj_nbr:""
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
                gridkey: "project",
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
                    "con_nbr": {
                        displayName: "案號",
                        width: 120
                    }
                     ,
                    "inv_date": {
                        displayName: "委任日期",
                        width: 120
                    }
                     ,
                    "nbr": {
                        displayName: "合約編號",
                        width: 120
                    }
                     ,
                    "cus_nbr": {
                        displayName: "客戶代號",
                        width: 120
                    }
                     ,
                     "cus_name": {
                        displayName: "客戶名稱", //虛擬欄位
                        width: 120
                    },
                    "items_desc": {
                        displayName: "工作內容",
                        width: 120
                    }
                     ,
                    "work_desc": {
                        displayName: "工作細項",
                        width: 120
                    }
                     ,
                    "plan_date": {
                        displayName: "預計完成日",
                        width: 120
                    }
                     ,
                    "proj_status": {
                        displayName: "核准情形",
                        width: 120
                    }
                     ,
                    "close_flag": {
                        displayName: "結案情形",
                        width: 120
                    }
                },
                filterItems: {
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
                    
                    inv_date: {
                        type: "basEsydatetime",
                        lovtype:"",
                        name: "inv_date",
                        label: "委任日期F"
                    }
                     ,
                     inv_dateb: {
                        type: "basEsydatetime",
                        lovtype:"",
                        name: "inv_dateb",
                        label: "委任日期T"
                    }
                     ,
                     close_flag: {
                        type: "basLov",
                        lovtype: "select",
                        titleMap: [{
                                value: 1,
                                name: "已結案"
                            },
                            {
                                value: 2,
                                name: "未結案"
                            },
                        ],
                        name: "close_flag",
                        label: "結案否"
                    }
                     ,
                    close_date: {
                        type: "basEsydatetime",
                        lovtype:"",
                        name: "close_date",
                        label: "結案日期F"
                    },
                    close_dateb: {
                        type: "basEsydatetime",
                        lovtype:"",
                        name: "close_dateb",
                        label: "結案日期T"
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
                        url: "ord/contcase/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort="+ scope.datapage.sort,
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
                        url: 'ord/project.detail'
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
