/// <reference path="./../../../typings/index.d.ts" />

declare module 'yes' {
    export = yesUi;
}

declare var requirejs: any;
declare var require: any;
declare var moment: any;
declare var define: any;
declare var yesUi: yes.IYesStatic;
declare var watch: yes.WatchStatic;
declare var setValue: yes.SetValueStatic;
declare var getValue: yes.GetValueStatic;
declare var setStatus: yes.SetStatusStatic;

declare namespace yes {

    interface SetValueStatic {
        (id: string, value: any): any,
        (id: string, valuesMapping: Object, watchedValue: any): any
    }

    interface GetValueStatic {
        (id: string): any
    }

    interface SetStatusStatic {
        (id: string, status: any, value: any): any
    }
    /**
     * 监视表单控件的值变动。
     * 
     * @interface WatchStatic
     */
    interface WatchStatic {

        /**
         * 监视表单控件变量
         * 
         * @id 表单的ID
         */
        (id: string): {
            change: (fn: Function) => void;
        },

        /**
           * 监视多个表单控件变量
           * 
           * @id 表单的ID
           */
        (ids: string[]): {
            change: (fn: Function) => void;
        }
    }

    interface IYesStatic {
        createApp: (settings: ISettings) => void
    }

    interface IRouters {
        [key: string]: {
            url: string,
            template?: string,
            templateUrl?: string,
            abstract: boolean,
            controller: string,
            dependencies: string[]
        }
    }

    interface ISettings {
        appName: string,
        host: string,
        apiPrefix: string,
        uiGrid: string,
        pluginDefaultName: string
    }

    interface IController extends Function {

    }

    interface IRegController {

    }

    interface IHelper {
        setClassicalScope: (scope: IClassicalViewScope, option?: IClassicalView) => IClassicalViewScope,
        setDefaultGridOptions: (scope: IGridViewScope, option?: IActionInitOption) => void,
        setDefaultActions: (scope: IActionViewScope, option?: IGripInitOption) => void,
        findFormNode: (name, items: IForm[]) => IForm
    }

    interface IGripInitOption {
        load?: () => void,
    }

    interface IMockApiConfig {
        config: string,
        list: string,
        detail: string
    }

    interface IActionInitOption {
        commonApiUrl?: string,
        mock?: IMockApiConfig
    }

    interface IForm {
        key?: string,
        type?: string,
        title?: string,
        titleMap?: any,
        readonly?: any,
        disibled?: boolean,
        singleLine?: boolean,
        placeholder?: string,
        required?: boolean,
        pattern?: string,
        patternMessage?: string,
        css?: string,
        maxLength?: number,
        minLength?: number,
        items?: IForm[],
        onChange?: any
    }

    interface IActionView {
        action?: {
            cancel?: (event, data) => void,
            add?: (event, data) => void,
            save?: (event, data) => void,
            edit?: (event, data) => void,
            reset?: (event, data) => void,
            del?: (event, data) => void,
            close?: () => void,
            back?: () => void,
            bulk?: () => any[],
            editOpenDialog: (entity) => void,
            rowsActionCheck?: (count?) => any[]
        },
        gridApi?: IGridApi,
        dialogResult?: any,
        model?: {},
        load?: () => void,
        loadDetail?: (entity) => void,
        detailTemplateUrl?: string,
        detailUrl?: string,
        commonApiUrl?: string,
        unloadDetail?: () => void
    }

    interface IGridView {
        entries?: any[],
        gridOptions?: IGridOptions,
        gridApi?: IGridApi,
        filter?: {
            page?: number,
            count?: number
        },
        load?: () => void,
        loadDetail?: (row) => void
    }

    interface IGridViewScope extends IGridView, IScope {

    }

    interface IClassicalView extends IActionView, IGridView {
        onReload?: () => void,
        copy_model?: any,
        onConfigReady?: () => void,
        onAddOrEdit?: (model) => void,
        reloadEntity?: (entity, callback) => void,
        listOperations?: any,
        config?: IMeta,
        commonApiUrl?: string,
        mock?: IMockApiConfig,
        detailTemplateUrl?: string,
        detailUrl?: string,
        model?: any,
        load?: () => void,
        loadDetail?: (entity) => void,
        unloadDetail?: () => void,
        loadConfig?: <T>() => IAjax<T>,
        init?: () => void,
        filter?: {
            page?: number,
            count?: number
        },
        headers?: any,
        filterItems?: IQuery[],
        entries?: any[],
        disableDblClick?: boolean,
        removeRow?: (event, row) => void,
        editRow?: (event, row) => void,
        resetFilter?: () => void,
        apiConfigUrl?: string
    }

    interface IMeta {
        headers: {
            [x: string]: IHeader
        },
        queries?: IQuery[],
        form?: [IForm],
        enums?: Object,
        operations?: any[],
        populate?: string[]
    }

    interface IHeader extends uiGrid.IColumnDef {

    }

    interface IQuery {
        name: string,
        type?: string,
        title?: string,
        titleMap?: any
    }

    interface IClassicalViewScope extends IClassicalView {
        resetFilter?: any,
        isFirstLoad?: any,
        commonMockApiUrl?: string
    }

    interface IActionViewScope extends IActionView, IScope {
        copy_model?: any,
        onAddOrEdit?: (model) => void,
        onAfterSave?: any,
        filter?: any,
        resetFilter?: any,
        isFirstLoad?: any
    }

    interface IMenu {
        uid: string,
        name: string,
        tip?: string,
        color?: string,
        tag?: string,
        icon?: string,
        order?: number,
        url: string,
        state?: boolean,
        parent?: string,
        type?: string,
        home?: boolean,
        blank?: boolean,
        expanded?: boolean,
        roles?: string[]
    }

    interface IScope extends ng.IScope {
        init?: () => void
    }

    interface ILocation extends ng.ILocationService {

    }

    interface IUtils {
        ajax: <T>(option: IAjaxOption) => IAjax<T>,
        camelCase: (str: string) => string;
        capitalize: (str: string) => string;
        snakeCase: (str: string) => string;
        parseUrl: (str: string) => any;
        isAbsoluteUrl: (url: string) => boolean;
        isRelativeUrl: (url: string) => boolean;
        isCrossDomain: (url: string) => boolean;
        setIteration: (str: string) => boolean;
        port: () => number;
        host: () => string;
        gridDefine: <TEntity>(headers, id) => Array<uiGrid.IColumnDefOf<TEntity>>
    }

    interface IAjax<T> extends ng.IHttpPromise<T> {

    }

    interface IAjaxOption extends ng.IRequestConfig {
        mockUrl?: string,
        method: string
    }

    interface IGridOptions extends uiGrid.IGridOptions {

    }

    interface IGridApi extends uiGrid.IGridApi {

    }

    interface IApiRespone {
        body?: any,
        error?: number,
        message?: string
    }

    interface IDialogOption {
        template?: string,
        className?: string,
        controller?: any,
        resolve?: any,
        scope?: IScope
    }

    interface IDialogResult {
        close(): void;
    }

    interface IDialog {
        open(option: IDialogOption): IDialogResult;
    }

    interface ImodalConfig {
        title?: string,//标题
        size?: string,//大小
        templateUrl: string,//模版路径
        postMapping: string,//更新路径
        form: {//schema-form信息
            form: IForm,
            schema: {}
        },
        model?: {},//初始model,
        retfn?: (model) => void//返回调用
       

    }

   
    
    interface ItreeOption {
        parent:string,//父级id
        id:string,//本级id
        name:string,//本级名称
        clicknode?:(item)=>void,
        addfn?: (item) => void,
        editfn?: (item) => void
    }
}