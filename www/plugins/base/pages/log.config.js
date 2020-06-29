define(function() {
    return {
        listOperations: {
        },
        headers: {
            "updated": {
                displayName: "操作時間",
                width: 150
            },
            "moduleId": {
                displayName: "模塊編號",
                width: 100
            },
            "eventId": {
                displayName: "事件編號",
                width: 160
            },
            "remoteIp": {
                displayName: "遠程IP",
                width: 100
            },
            "remote": {
                displayName: "遠程紀錄",
                width: 80,
                filter: function(columns, rootScope) {
                    rootScope.remoteValues = {
                        "true": "是",
                        "false": "否"
                    };
                    this.cellFilter = "dict:'remoteValues'";
                    columns.push(this);
                }

            },
            "user": {
                displayName: "操作用戶",
                width: 80,
                filter: function(columns, rootScope) {
                    rootScope.userValues = {
                        "admin": "管理員",
                        "user": "用戶"
                    };
                    this.cellFilter = "dict:'userValues'";
                    columns.push(this);
                }
            },
            "info": {
                displayName: "事件訊息",
                minWidth: 200
            },
            "localIp": {
                displayName: "本地IP",
                width: 120
            }
        },
        filterItems: {
            0: {
                type: "select",
                name: "user$eq",
                title: "帳號類型",
                titleMap: [{
                    value: "admin",
                    name: "管理員"
                }, {
                    value: "user",
                    name: "用戶"
                }]
            },
            1: {
                type: "input",
                name: "moduleId$eq",
                title: "模塊編號"
            },
            2: {
                type: "input",
                name: "user$eq",
                title: "操作用戶"
            },
            3: {
                type: "input",
                name: "remoteIp$match",
                title: "遠程IP"
            },
            4: {
                type: "input",
                name: "localIp$match",
                title: "本地IP"
            },
            6: {
                type: "dateTimePicker",
                name: "updated$gte",
                title: "操作時間起"
            },
            7: {
                type: "dateTimePicker",
                name: "updated$lte",
                title: "操作時間止"
            }
        }
    }
});
