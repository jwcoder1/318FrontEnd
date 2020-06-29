define(function() {
    return {
        title: "企业管理",
        operation: {
            add: true,
            del: true
        },
        list: {
            headers: {
                "cname": {
                    displayName: "企業名稱",
                    minWidth: 230
                },
                "no": {
                    displayName: "編號"
                },
                "contact": {
                    displayName: "聯絡人"
                },
                "regTel": {
                    displayName: "聯絡號碼"
                },
                "admin": {
                    displayName: "管理員帳號",
                    minWidth: 105
                },
                "legalPerson": {
                    displayName: "法定代理人"
                },
                "enable": {
                    displayName: "狀態",
                    width: 70,
                    cellTemplate: "<div class='ui-grid-cell-contents'>{{row.entity.enable?'已啟用':'未啟用' | translate}}</div>"
                }
            },
            filters: [{
                type: "input",
                name: "cname$match",
                label: "名稱"
            }, {
                type: "input",
                name: "no$match",
                label: "編號"
            }, {
                type: "select",
                name: "enable$eq",
                label: "狀態",
                titleMap: [{
                    value: '1',
                    name: '已啟用'
                }, {
                    value: '0',
                    name: '未啟用'
                }]
            }]
        },
        form: {
            schema: {
                type: "object",
                properties: {
                    no: {
                        title: "編號",
                        type: "string"
                    },
                    cname: {
                        title: "中文名稱",
                        type: "string",
                        required: true
                    },
                    ename: {
                        title: "英文名稱",
                        type: "string"
                    },
                    csName: {
                        title: "中文簡稱",
                        type: "string"
                    },
                    orgCode: {
                        title: "組織機構代碼",
                        type: "string"
                    },
                    attachment: {
                        title: "企業營業執照",
                        type: "string"
                    },
                    regCode: {
                        title: "營業執政號碼",
                        type: "string"
                    },
                    regProvince: {
                        title: "註冊地（省）",
                        type: "string"
                    },
                    regCity: {
                        title: "註冊地（市）",
                        type: "string"
                    },
                    regDistrict: {
                        title: "註冊地（區）",
                        type: "string"
                    },
                    regAddr: {
                        title: "註冊地址",
                        type: "string"
                    },
                    website: {
                        title: "公司網址",
                        type: "string"
                    },
                    taxCode: {
                        title: "稅號",
                        type: "string"
                    },
                    legalPerson: {
                        title: "法定代理人",
                        type: "string"
                    },
                    regDate: {
                        title: "註冊時間",
                        type: "string"
                    },
                    regCapital: {
                        title: "註冊资本(萬元)",
                        type: "string"
                    },
                    contact: {
                        title: "聯絡人",
                        type: "string"
                    },
                    regTel: {
                        title: "連絡電話",
                        type: "string"
                    },
                    enable: {
                        title: "是否啟用",
                        type: "boolean",
                        'default': true
                    },
                    memo: {
                        title: "備註",
                        type: "string"
                    },
                    classify: {
                        title: "企業分類",
                        type: "string",
                        required: true
                    },
                    "admin": {
                        title: "帳號",
                        type: "string",
                        placeholder: "帳號自動生成"
                    }
                }
            },
            form: [{
                    type: "basRegion",
                    title: "基本訊息",
                    items: [{
                            key: 'no',
                            readonly: true
                        }, 'cname', 'ename', 'csName', 'orgCode',
                        {
                            key: 'classify',
                            type: 'select',
                            placeholder: '請選擇',
                            refresh: function(cfg, value) {
                                var $rootScope = angular.element('body').injector().get('$rootScope');
                                var titleMap = [];
                                $rootScope.dicDetails.forEach(function(item) {
                                    titleMap.push({
                                        name: item.name,
                                        value: item.value
                                    });
                                });
                                cfg.titleMap = titleMap;
                            }
                        },
                        {
                            key: 'enable'
                        }
                    ]
                },
                {
                    type: "basRegion",
                    title: "企業管理員訊息",
                    items: [{
                        key: 'admin',
                        readonly: true
                    }]
                },
                {
                    type: "basRegion",
                    title: "詳細訊息",
                    items: [{
                            key: "attachment",
                            type: "uploader",
                            css: "cell100",
                            options: {
                                multiple: 1,
                                maxMB: 20
                            }
                        }, 'regCode', 'legalPerson',
                        {
                            key: "regDate",
                            type: "date-picker"
                        }, {
                            key: 'regProvince',
                            type: "select",
                            onChange: function(selected, model) {
                                model.regProvinceShow = selected.name;
                            }
                        }, {
                            key: 'regCity',
                            type: "select",
                            onChange: function(selected, model) {
                                model.regCityShow = selected.name;
                            }
                        }, {
                            key: 'regDistrict',
                            type: "select",
                            onChange: function(selected, model) {
                                model.regDistrictShow = selected.name;
                            }
                        }, 'regAddr',
                        'website', 'taxCode', 'regTel', 'regCapital', 'contact',
                        {
                            key: 'memo',
                            type: 'textarea',
                            css: "cell100"
                        }
                    ]
                }
            ],
            resolves: [function(utils, path, ngDialog, toastr) {
                var context = this;
            }],
            model: {}
        }
    };

    function findByFormKey(form, key) {
        for (var i = 0, size = form.length; i < size; i++) {
            var cnf = form[i];
            if (angular.isObject(cnf)) {
                if (cnf.type == "group" || cnf.type == "list") {
                    var rs = findByFormKey(cnf.items, key);
                    if (rs) {
                        return rs;
                    }
                } else if (cnf.key == key) {
                    return cnf;
                }
            } else if (key == cnf) {
                return cnf;
            }
        }
    }
});