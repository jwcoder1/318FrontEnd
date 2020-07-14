define(function () {
    angular.module('app').controller('acc.mapacc21.detail',
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
                    add: {
                        name: "新增",
                        icon: "fa-plus",
                        readonlystatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "add,edit,read"
                                } //表单新增状态
                            ]
                        },
                        action: function (event, form) {
                            scope.action.add(event);
                        }
                    },
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
                    edit: {
                        name: "修改",
                        icon: "fa-edit",
                        editstatus: {
                            relation: "and",
                            filedlist: [{
                                    field: "formstatus",
                                    status: "view"
                                } //查询状态                              
                            ]
                        },
                        action: function (event, form) {
                            scope.action.edit(event);
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
                            "inv_type": {
                                "title": "傳票類別",
                                "type": "string"
                            },
                            "nbr": {
                                "title": "傳票號碼",
                                "type": "string"
                            },
                            "date": {
                                "title": "傳票日期",
                                "type": "string"
                            },
                            "d_amt": {
                                "title": "借方金額",
                                "type": "number"
                            },
                            "c_amt": {
                                "title": "貸方金額",
                                "type": "number"
                            },
                            "status": {
                                "title": "傳票狀態",
                                "type": "string"
                            },
                            "acc_id": {
                                "title": "會計科目",
                                "type": "string"
                            },
                            "acc_name": {
                                "title": "科目名稱",
                                "type": "string"
                            },
                            "c_or_d": {
                                "title": "借方或貸方",
                                "type": "string"
                            },
                            "amt": {
                                "title": "金額",
                                "type": "number"
                            },
                            "io_nbr": {
                                "title": "客戶代號/廠商代號",
                                "type": "string"
                            },
                            "io_name": {
                                "title": "客戶名稱/廠商名稱",
                                "type": "string"
                            },
                            "mark_name": {
                                "title": "摘要",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "傳票登入",
                            items: [{
                                    title: "傳票類別",
                                    key: 'inv_type',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype:'select',
                                    titleMap: [{
                                        value: "1",
                                        name: "現金收入"
                                    },
                                    {
                                        value: "2",
                                        name: "現金支出"
                                    },
                                    {
                                        value: "3",
                                        name: "轉帳傳票"
                                    }
                                ],

                                },
                                {
                                    title: "傳票號碼",
                                    key: 'nbr',
                                    readonly:true,
                                    placeholder:"傳票號碼自動生成",
                                    type: 'basDefault',
                                },
                                {
                                    title: "傳票日期",
                                    key: 'date',
                                    required:true,
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
                                    title: "借方金額",
                                    key: 'd_amt',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    readonly:true
                                },
                                {
                                    title: "貸方金額",
                                    key: 'c_amt',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    readonly:true
                                },
                                {
                                    title: "狀態",
                                    key: 'status',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'select',
                                    titleMap: [{
                                        value: "NA",
                                        name: "未過帳"
                                    },
                                    {
                                        value: "CL",
                                        name: "已過帳"
                                    },
                                ],
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
                            key: 'mapacc21',
                            type: "basEditgrid",
                            gridkey: "acc.mapacc21.detail",
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
                                        scope.model.mapacc21.push(item);
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
                                "acc_id": {
                                    displayName: "會計科目",
                                    required:true,
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    relationfield: [{
                                        findfield: "acc_name",
                                        tofield: "acc_name"
                                    }, ],
                                    additionalField: {
                                        key: "acc_name",
                                        readonly: true,
                                        type: "basString"
                                    },
                                    nameField: "acc_name",
                                    type: 'basLov',
                                    lovtype:'getsubject',
                                    width: 110
                                },
                                "acc_name": {
                                    displayName: "科目名稱",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    readonly:true,
                                    width: 110
                                },
                                "c_or_d": {
                                    displayName: "借方或貸方",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'select',
                                    titleMap: [{
                                        value: "D",
                                        name: "借方"
                                    },
                                    {
                                        value: "C",
                                        name: "貸方"
                                    },
                                ],
                                    width: 110
                                },
                                "amt": {
                                    displayName: "金額",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    onchange:(item)=>{
                                        if(item.c_or_d==="D"){  
                                            scope.countD_amt();
                                        }
                                        else if(item.c_or_d==="C"){
                                            scope.countC_amt();
                                        }
                                    },
                                    type: 'basNumber',
                                    width: 110
                                },
                                "io_nbr": {
                                    displayName: "客戶代號",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    relationfield: [{
                                        findfield: "cus_alias",
                                        tofield: "io_name"
                                    }, ],
                                    additionalField: {
                                        key: "io_name",
                                        readonly: true,
                                        type: "io_name"
                                    },
                                    nameField: "io_name",
                                    type: 'basLov',
                                    lovtype: 'getcus',
                                    width: 110
                                },
                                "io_name": {
                                    displayName: "客戶名稱",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    readonly:true,
                                    type: 'basDefault',
                                    width: 110
                                },
                                "mark_name": {
                                    displayName: "摘要",
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
                            url: "acc/accbah/" + scope.model.uid,
                            mockUrl: "plugins/data/mapacc21.detail.json"
                        }).then(function (res) {
                            toastr.info("数据删除成功!!!");
                            scope.uid = "";
                            scope.action.add();
                            scope.refreshtab("refreshaccbah", {});

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
                            url: "acc/accbah/" + scope.uid,
                            mockUrl: "plugins/data/mapacc21.detail.json"
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
                        url: "acc/accbah",
                        mockUrl: "plugins/data/mapacc21.detail.json",
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
                        scope.refreshtab("refreshaccbah", {});

                    }, function (error) {
                        $timeout(function () {
                            scope.model.formstatus = bakstatus
                        }, 100);

                    });
                }
            };
            scope.countC_amt = function () {
                let C_amt=0;
                scope.model.mapacc21.forEach(function (item) {
                    if (!item.isdel ) {  //
                        C_amt = C_amt + (item.amt ? item.amt : 0); //依照輸入的金額(x)或沒有輸入(0)來給item.amt值
                    }
                }, this);
               scope.model.c_amt = C_amt;
            };
            scope.countD_amt = function () {
                let D_amt=0;
                scope.model.mapacc21.forEach(function (item) {
                    if (!item.isdel ) {  //
                        D_amt = D_amt + (item.amt ? item.amt : 0); //依照輸入的金額(x)或沒有輸入(0)來給item.amt值
                    }
                }, this);
               scope.model.d_amt = D_amt;
            };
            
            scope.action.load();
        });

});