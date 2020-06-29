define(function() {
    angular.module('app').controller('bas.bastemp',
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
                gridkey: "bastemp",
                title: "代墊項目",
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
                    "temp_nbr": {
                        displayName: "項目代號",
                        width: 120
                    }
                     ,
                    "temp_desc": {
                        displayName: "項目內容",
                        width: 120
                    }
                },
                filterItems: {
                    temp_desc: {
                        type: "basDefault",
                        lovtype:"",
                        name: "temp_desc",
                        label: "項目內容"
                    }
                     ,
                    // temp_nbr: {
                    //     type: "basLov",
                    //     lovtype:"gettemp",
                    //     name: "temp_nbr",
                    //     label: "項目代號"
                    // }
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
                        url: "bas/bastemp/query?page=" + scope.datapage.page + "&size=" + scope.datapage.size + "&sort="+ scope.datapage.sort,
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
                        name: "代墊項目明細",
                        url: 'bas/bastemp.detail'
                    }
                    $scope.$emit('opencusdetail', node);
                }
            }
            $scope.$on('refreshbastemp', function(event, message) {
                scope.action.load()
            });
            scope.action.load();
        });

});
