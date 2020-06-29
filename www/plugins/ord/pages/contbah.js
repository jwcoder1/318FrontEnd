define(function() {
    angular.module('app').controller('ord.contbah',
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
                gridkey: "contbah",
                title: "合約管理",
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
                        displayName: "案件編號",
                        width: 120
                    }
                     ,
                    "group_nbr": {
                        displayName: "組別",
                        width: 120
                    }
                     ,
                    "date": {
                        displayName: "日期",
                        width: 120
                    }
                     ,
                    "nbr": {
                        displayName: "合約編號",
                        width: 120
                    }
                     ,
                    "cus_nbr": {
                        displayName: "客戶編號",
                        width: 120
                    }
                     ,
                    "desc": {
                        displayName: "合約描述",
                        width: 120
                    }
                     ,
                    "work_desc": {
                        displayName: "工作細項",
                        width: 120
                    }
                     ,
                    "status": {
                        displayName: "狀態",
                        width: 120
                    }
                     ,
                    "plan_date": {
                        displayName: "預計完成日期",
                        width: 120
                    }
                     ,
                    "inv_date": {
                        displayName: "委任日期",
                        width: 120
                    }
                     ,
                    "over_date": {
                        displayName: "完成日期",
                        width: 120
                    }
                     ,
                    "close_date": {
                        displayName: "結案日期",
                        width: 120
                    }
                },
                filterItems: {
                    status: {
                        type: "",
                        lovtype:"",
                        name: "status",
                        label: "狀態"
                    }
                     ,
                    nbr: {
                        type: "basDefault",
                        lovtype:"",
                        name: "nbr",
                        label: "合約編號"
                    }
                     ,
                    con_nbr: {
                        type: "basDefault",
                        lovtype:"",
                        name: "con_nbr",
                        label: "案件編號"
                    }
                     ,
                    cus_nbr: {
                        type: "basDefault",
                        lovtype:"",
                        name: "cus_nbr",
                        label: "客戶編號"
                    }
                     ,
                    plan_date: {
                        type: "basEsydatetime",
                        lovtype:"",
                        name: "plan_date",
                        label: "預計完成日期"
                    }
                     ,
                    group_nbr: {
                        type: "basDefault",
                        lovtype:"",
                        name: "group_nbr",
                        label: "組別"
                    }
                }
                ,
                filtermoreItems: {
                    status_name: {
                        type: "",
                        lovtype:"",
                        name: "status_name",
                        label: "核准人員姓名"
                    }
                     ,
                    appo_letter: {
                        type: "",
                        lovtype:"",
                        name: "appo_letter",
                        label: "委任書上傳"
                    }
                     ,
                    status_user: {
                        type: "",
                        lovtype:"",
                        name: "status_user",
                        label: "核准人員"
                    }
                     ,
                    proj_status: {
                        type: "",
                        lovtype:"",
                        name: "proj_status",
                        label: "核准否"
                    }
                     ,
                    close_user: {
                        type: "",
                        lovtype:"",
                        name: "close_user",
                        label: "結案人員"
                    }
                     ,
                    close_flag: {
                        type: "",
                        lovtype:"",
                        name: "close_flag",
                        label: "結案否"
                    }
                     ,
                    close_name: {
                        type: "",
                        lovtype:"",
                        name: "close_name",
                        label: "結案人員姓名"
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
                        name: "",
                        url: 'ord/contbah.detail'
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
