define(function() {
    angular.module('app').controller('acc.acccd',
        function($rootScope, $scope, $location, uiGridConstants, utils, path, settings,
            $timeout, dialog, toastr, ngDialog, qwsys, $http) {
            var scope = $scope;

            scope.model = {
                formstatus: "view" //edit,view
            };

            scope.data = [
                { cd_type: "1", pid: "", cd_desc: "資產",eng_desc:"Asset",c_or_d:null,type_class:null },
                { cd_type: "1-1", pid: "1", cd_desc: "流動資產",eng_desc:"Current Assets",c_or_d:null,type_class:null },
                { cd_type: "1-2", pid: "1", cd_desc: "現金",eng_desc:"Cash",c_or_d:1,type_class:1 },
                { cd_type: "2", pid: "", cd_desc: "負債",eng_desc:"Debt",c_or_d:null,type_class:null },

            ];
            scope.config = {
                listoperation: {
        
                    save: {
                        name: "存檔",
                        icon: "fa-save",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "add,edit" }, //表單為新增，修改狀態
                            ]
                        },
                        action: function(event, form) {
                            scope.action.save(event, form);
                        }
                    },
                    
                    edit: {
                        name: "修改",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" } //查詢狀態                              
                            ]
                        },
                        action: function(event, form) {
                            scope.action.edit(event);
                        }
                    },
                    del: { //分配狀態下還可以刪除
                        name: "刪除",
                        icon: "fa-remove",
                        htmlClass: "deletestyle",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" } //表單查詢狀態                             
                            ]
                        },
                        action: function(event, form) {
                            scope.action.del(event);
                        }
                    },
                    refresh: {
                        name: "刷新",
                        icon: "fa-refresh",
                        htmlClass: "refresh",
                        editstatus: {
                            relation: "and",
                            filedlist: [
                                { field: "formstatus", status: "view" }, //表單為新增，修改狀態
                            ]
                        },
                        action: function(event, form) {
                            scope.action.load();
                        }
                    },
                    undo: {
                        name: "取消",
                        icon: "fa-undo",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "add,edit"
                                }, //表单为新增，修改状态
                            ]
                        },
                        action: function (event, form) {
                            scope.action.undo(event);
                        }
                    },
                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "group_nbr": {
                                "title": "組別代號",
                                "type": "string"
                            },
                        }
                    },
                    form: [{
                            type: "group",
                            items: [{
                                    title: "分類代號",
                                    key: 'cd_type',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "分類名稱",
                                    key: 'cd_desc',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "分類英文名稱",
                                    key: 'eng_desc',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "借貸別",
                                    key: 'c_or_d',
                                    type: 'basRadiosinline',
                                    required: true,
                                    css: "cell2",
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    titleMap: [
                                        { value: "1", name: "借" },
                                        { value: "2", name: "貸" },
                                    ],
                                },
                                {
                                    title: "分層類別",
                                    key: 'type_class',
                                    type: 'basRadiosinline',
                                    css: "cell2",
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "add,edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    titleMap: [
                                        { value: "1", name: "大分類" },
                                        { value: "2", name: "中分類" },
                                        { value: "3", name: "小分類" },
                                    ],
                                },
                                {
                                    title: "上層分類",
                                    key: 'pid',
                                    required: true,
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [
                                            { field: "formstatus", status: "edit" } //表單為新增，修改狀態
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                
                            ]
                        }
                        //下面為分組B
                        //下面為分組C
                    ]
                }
            };

            scope.treeOption = {
                lowerlevels: [],
                title: "會計科目表",
                id: "cd_type", //分類代號
                parent: "pid",
                name: "cd_desc", //會計名稱
                clicknode: function(item, level) { //tree内部固定
                    scope.model=item 
                    scope.model.formstatus="view" 
                },
                addfn: (item)=> {
                    scope.model=[]
                    scope.model.pid=item.cd_type //上層ID
                    scope.model.formstatus="add" 
                },
                delfn: (item)=> {
                    
                },
                load: function() {


                }
            }
            
            scope.action = {
                add: function (event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add", //edit,view
                        status: "10"
                    }
                },
                edit: function () {
                    scope.model.formstatus = "edit"
                    $scope.$broadcast('schemaFormRedraw');
                },
                del: function () {
                    dialog.confirm('确定删除当前数据?').then(function () {
                        scope.promise = utils.ajax({
                            method: 'DELETE',
                            url: "ord/contract/" + scope.model.uid,
                            mockUrl: "plugins/data/contract.detail.json"
                        }).then(function (res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshcontbah", {});

                        });
                    });
                },
                undo: function () {
                    if (scope.model.formstatus == "add") {
                        scope.model = angular.copy(scope.bakmodel);
                    } else {
                        scope.model = angular.copy(scope.bakmodel);
                        scope.$broadcast("GridRedraw");
                    }
                    scope.model.formstatus = "view";
                },
                save: function (event, form) {
                    for (var p in scope.model) {
                        if (scope.model[p] === null) {
                            delete scope.model[p];
                        }
                    }
                    scope.$broadcast("schemaFormValidate");
                    if (!form.base_form.$valid) {
                        toastr.warning("请输入必填项！");
                        return
                    }
                    var type = scope.model.uid ? "edit" : "add";
                    var bakstatus = scope.model.formstatus
                    scope.model.formstatus = "read";
                    scope.promise = utils.ajax({
                        method: "POST",
                        url: "ord/contract",
                        mockUrl: "plugins/data/contract.detail.json",
                        data: scope.model
                    }).then(function (res) {
                        scope.uid = res.data.body.uid
                        if (type == "add") {
                            toastr.info("新增成功！");
                        } else {
                            toastr.info("修改成功！");
                        }
                        scope.action.load();
                        $scope.$broadcast('schemaFormRedraw');
                        scope.refreshtab("refreshcontbah", {});

                    }, function (error) {
                        $timeout(function () {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                }
            };

        });

});