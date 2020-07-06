define(function () {
    angular.module('app').controller('ord.contyear',
        function ($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys, sysconstant) {
            var scope = $scope;
            scope.uid = "";
            if ($rootScope.uid) {
                scope.uid = $rootScope.uid;
                $rootScope.uid = "";
            };
            scope.model = {
                formstatus: "add" //edit,view
            };
            scope.promise = null;
            scope.detailUrl = "plugins/bas/templates/detail.html";
            scope.config = {
                listoperation: {
                    save: {
                        name: "保存",
                        icon: "fa-save",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "add,edit"
                                }, //表单为新增，修改状态
                            ]
                        },
                        action: function (event, form) {
                            scope.action.save(event, form);
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
                    del: { //分配状态下还可以删除
                        name: "删除",
                        icon: "fa-remove",
                        htmlClass: "deletestyle",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "view"
                                } //表单查询状态                             
                            ]
                        },
                        action: function (event, form) {
                            scope.action.del(event);
                        }
                    },
                    refresh: {
                        name: "刷新",
                        icon: "fa-refresh",
                        htmlClass: "refresh",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "view"
                                }, //表单为新增，修改状态
                            ]
                        },
                        action: function (event, form) {
                            scope.action.load();
                        }
                    }
                },
                form: {
                    schema: {
                        "type": "object",
                        "properties": {
                            "cus_nbr": {
                                "title": "客戶編號",
                                "type": "string"
                            },
                            "cus_name": {
                                "title": "客戶名稱", //虛擬欄位
                                "type": "string"
                            },
                            "date": {
                                "title": "合約日期",
                                "type": "string"
                            },
                            "items_desc": {
                                "title": "合約內容",
                                "type": "string"
                            },
                            "plan_date": {
                                "title": "預計完成日期",
                                "type": "string"
                            },
                            "edit_user1": {
                                "title": "處理人員1",
                                "type": "string"
                            },
                            "edit_name1": {
                                "title": "處理人員姓名1",
                                "type": "string"
                            },
                            "amt": {
                                "title": "公費金額",
                                "type": "number"
                            },
                            "tot_amt": {
                                "title": "請款金額",
                                "type": "number"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "",
                            items: [{
                                    title: "合約日期(起)",
                                    key: 'date',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    lovtype: ''
                                },
                                {
                                    title: "合約日期(迄)",
                                    key: 'dateb',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    lovtype: ''
                                },
                                {
                                    title: "客戶代號(起)",
                                    key: 'cus_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'getcus'
                                },
                                {
                                    title: "客戶代號(迄)",
                                    key: 'cus_nbrb',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'getcus'
                                }
                            ]
                        },
                        //下面为行明细
                        {
                            type: 'basLine',
                            css: "cell100 ",
                            title: ""
                        },
                        {
                            title: "",
                            key: 'contyear',
                            type: "basEditgrid",
                            gridkey: "ord.contyear",
                            css: "cell100",
                            action: {
                                add: {
                                    editstatus: {
                                        relation: "or",
                                        editstatus: {
                                            relation: "and",
                                            filedlist: [{
                                                    field: "formstatus",
                                                    status: "add,edit"
                                                }, //表单为新增，修改状态
                                            ]
                                        }
                                    },
                                    click: function () {
                                        var item = {
                                            isdel: false
                                        }
                                        scope.model.contyear.push(item);
                                    }
                                },
                                del: {
                                    editstatus: {
                                        relation: "or",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            }, //表单新增状态
                                        ]
                                    },
                                    click: function (item) {
                                        item.isdel = true;
                                    }
                                }
                            },
                            headers: {
                                "cus_nbr": {
                                    displayName: "客戶編號",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'getcus',
                                    width: 110
                                },
                                //虛擬欄位
                                "cus_name": {
                                    displayName: "客戶名稱",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",           
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    width: 110
                                },
                                "date": {
                                    displayName: "合約日期",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    lovtype: '',
                                    width: 110
                                },
                                "items_desc": {
                                    displayName: "合約內容",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'input',
                                    lovtype: '',
                                    width: 110
                                },
                                "plan_date": {
                                    displayName: "預計完成日期",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    lovtype: '',
                                    width: 110
                                },
                                "edit_user1": {
                                    displayName: "主辦會計師",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 110
                                },
                                "edit_name1": {
                                    displayName: "姓名",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 110
                                },
                                "amt": {
                                    displayName: "公款金額",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                },
                                "tot_amt": {
                                    displayName: "請款金額",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basNumber',
                                    lovtype: '',
                                    width: 110
                                }
                            }

                        }


                    ]
                }
            };
            scope.action = {
                add: function (event) {
                    $scope.$broadcast('schemaFormRedraw');
                    scope.model = {
                        formstatus: "add" //edit,view
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
                            url: "ord/contyear/" + scope.model.uid,
                            mockUrl: "plugins/data/contyear.json"
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
                load: function () {
                    if (scope.uid) {
                        scope.promise = utils.ajax({
                            method: 'GET',
                            url: "ord/contyear/" + scope.uid,
                            mockUrl: "plugins/data/contyear.json"
                        }).then(function (res) {
                            var data = res.data;
                            scope.model = data.body;
                            scope.model.formstatus = "view";
                            for (var p in scope.model) {
                                if (scope.model[p] === null) {
                                    delete scope.model[p];
                                }
                            }
                            scope.bakmodel = angular.copy(scope.model);
                        });
                    } else {
                        scope.action.add();
                    }

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
                        url: "ord/contyear",
                        mockUrl: "plugins/data/contyear.json",
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
            scope.action.load();
        });

});