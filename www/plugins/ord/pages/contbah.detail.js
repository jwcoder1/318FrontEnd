define(function () {
    angular.module('app').controller('ord.contbah.detail',
        function ($rootScope, $scope, $location, utils, path, getSingleView, settings,
            $timeout, dialog, toastr, ngDialog, uiGridConstants, qwsys, sysconstant) {
            var scope = $scope;
            scope.uid = "";
            if ($rootScope.uid) {
                scope.uid = $rootScope.uid;
                $rootScope.uid = "";
            };
            scope.model = {
                formstatus: "add", //edit,view
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
                            "nbr": {
                                "title": "合約編號",
                                "type": "string"
                            },
                            "cus_nbr": {
                                "title": "客戶編號",
                                "type": "string"
                            },
                            "cus_alias":{
                                "title":"客戶簡稱",
                                "type": "string"

                            },
                            "date": {
                                "title": "日期",
                                "type": "string"
                            },
                            "plan_date": {
                                "title": "預計完成日期",
                                "type": "string"
                            },
                            "group_nbr": {
                                "title": "組別",
                                "type": "string"
                            },
                            "cont_year": {
                                "title": "合約年度",
                                "type": "string"
                            },
                            "year_status": {
                                "title": "年度型合約",
                                "type": "Boolean"
                            },
                            "amt": {
                                "title": "公費金額",
                                "type": "number"
                            },
                            "tot_amt": {
                                "title": "請款金額",
                                "type": "number"
                            },
                            "s_nbr": {
                                "title": "工作代號",
                                "type": "string"
                            },
                            "status": {
                                "title": "狀態",
                                "type": "string"
                            },
                            "items_desc": {
                                "title": "請款內容",
                                "type": "string"
                            },
                            "amt": {
                                "title": "請款金額",
                                "type": "number"
                            },
                            "pi_nbr": {
                                "title": "帳單編號",
                                "type": "string"
                            },
                            "rec_amt": {
                                "title": "收款金額",
                                "type": "number"
                            },
                            "acr_mon": {
                                "title": "結帳月份",
                                "type": "string"
                            }
                        }
                    },
                    form: [{
                            type: "group",
                            title: "基本訊息",
                            items: [{
                                    title: "合約編號",
                                    key: 'nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basDefault',
                                    lovtype: ''
                                },
                                {
                                    title: "客戶編號",
                                    key: 'cus_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    relationfield: [{
                                        findfield: "cus_alias",
                                        tofield: "cus_alias"
                                    }, ],
                                    additionalField: {
                                        key: "cus_alias",
                                        readonly: true,
                                        type: "basString"
                                    },
                                    nameField: "cus_alias",
                                    type: 'basLov',
                                    lovtype: 'getcus'
                                },
                                {
                                    title: "日期",
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
                                },
                                {
                                    title: "預計完成日期",
                                    key: 'plan_date',
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
                                    title: "組別",
                                    key: 'group_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basLov',
                                    lovtype: 'getgroup'
                                },
                                {
                                    title: "合約年度",
                                    key: 'cont_year',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    format: "YYYY"
                                },
                                {
                                    title: "年度型合約",
                                    key: 'year_status',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    type: 'basCheckbox',
                                },
                                {
                                    title: "公費金額",
                                    key: 'amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "請款金額",
                                    key: 'tot_amt',
                                    readonly: true,
                                    type: 'basNumber',
                                    lovtype: ''
                                },
                                {
                                    title: "工作代號",
                                    key: 's_nbr',
                                    editstatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "add,edit"
                                            } //表单为新增，修改状态
                                        ]
                                    },
                                    relationfield: [{
                                        findfield: "work_desc",
                                        tofield: "work_desc"
                                    }, ],
                                    additionalField: {
                                        key: "work_desc",
                                        readonly: true,
                                        type: "basString"
                                    },
                                    nameField: "work_desc",
                                    type: 'basLov',
                                    lovtype: 'getwork'
                                },
                                {
                                    title: "狀態",
                                    key: 'status',
                                    readonly: true,
                                    titleMap: [{
                                            value: "10",
                                            name: "【尚未請款】"
                                        },
                                        {
                                            value: "20",
                                            name: "【部分請款】"
                                        },
                                        {
                                            value: "30",
                                            name: "【全部請款】"
                                        }
                                    ],
                                    type: 'basStatus'
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
                            key: 'contacrs',
                            type: "basEditgrid",
                            gridkey: "ord.contract.detail",
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
                                        scope.model.contacrs.push(item);
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
                                    //列表刪除後更新金額
                                    click: function (item) {
                                        item.isdel = true;
                                        scope.counttot_amt();
                                    }
                                }
                            },
                            headers: {
                                "acr_mon": {
                                    displayName: "預計請款月份",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    type: 'basEsydatetime',
                                    format: 'YYYYMM',
                                    width: 110
                                },
                                "items_desc": {
                                    displayName: "請款內容",
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
                                "amt": {
                                    displayName: "請款金額",
                                    readonlystatus: {
                                        relation: "and",
                                        filedlist: [{
                                                field: "formstatus",
                                                status: "view"
                                            }, //表单新增状态
                                        ]
                                    },
                                    onchange:(item)=>{
                                        scope.counttot_amt();
                                    },
                                    type: 'basNumber',
                                    width: 110
                                },
                                "pi_nbr": {
                                    displayName: "帳單編號",
                                    readonly: true,
                                    type: 'basDefault',
                                    lovtype: '',
                                    width: 110
                                },
                                "rec_amt": {
                                    displayName: "沖款金額",
                                    readonly: true,
                                    type: 'basNumber',
                                    width: 110
                                },

                            }

                        }


                    ]
                }
            };
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
                            url: "ord/contbah/" + scope.model.uid,
                            mockUrl: "plugins/data/contbah.detail.json"
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
                            url: "ord/contbah/" + scope.uid,
                            mockUrl: "plugins/data/contbah.detail.json"
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

                    console.log("Before Save Contract Model Struct===",scope.model);

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
                        url: "ord/contbah",
                        mockUrl: "plugins/data/contbah.detail.json",
                        data: scope.model
                    }).then(function (res) {
                        console.log("After Save Contract Response !",res);
                        
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
            scope.counttot_amt = function () {
                let tot_amt=0;
                scope.model.contacrs.forEach(function (item) {
                    if (!item.isdel) {
                        tot_amt = tot_amt + (item.amt ? item.amt : 0);
                        // rec_amt = rec_amt + (item.rec_amt ? item.rec_amt:0);
                    }
                }, this);
                // scope.model.tot_amt = rec_amt;
                scope.model.amt = tot_amt;
            }
            scope.action.load();
        });

});