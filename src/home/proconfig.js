angular.module('app.core.proconfig', [])
    .factory('proconfig', ['utils', 'ngDialog', 'settings', '$sce',
        function(utils, ngDialog, settings, $sce) {
            return {
                lov: {
                    getgroup: {
                        title: "獲取組別資料",
                        queryUrl: "bas/basgroup/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: true, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "group_nbr",
                            nameField: "group_nbr",
                            smallField: "group_name"
                        },
                    },
                    getcus: {
                        title: "獲取客戶資料",
                        queryUrl: "bas/cuscus/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: true, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "cus_nbr",
                            nameField: "cus_nbr",
                            smallField: "cus_alias"
                        },
                    },
                    gettemp: {
                        title: "獲取代墊資料",
                        queryUrl: "bas/bastemp/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: true, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "temp_nbr",
                            nameField: "temp_nbr",
                            smallField: "temp_desc"
                        },
                    },
                    getwork: {
                        title: "獲取工作資料",
                        queryUrl: "bas/salebat/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: true, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "s_nbr",
                            nameField: "s_nbr",
                            smallField: "work_desc"
                        },
                    },
                    getstaff: {
                        title: "獲取員工資料",
                        queryUrl: "bas/staff/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: true, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "s_nbr",
                            nameField: "s_nbr",
                            smallField: "s_name"
                        },
                    },
                    getcontract: {
                        title: "獲取合約",
                        queryUrl: "ord/contbah/query", //查询地址
                        initLoad: false, //加载时是否初始化数据
                        small: false, //速查是否显示编号
                        showField: { //速查基本栏位
                            valueField: "nbr",
                            nameField: "nbr",
                        },
                    },
                }
            }
        }
    ]
);