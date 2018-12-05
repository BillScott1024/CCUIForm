"use strict";
cc._RF.push(module, '3d7a48iAhlGvovh42EtZ8yC', 'UIManager');
// Scripte/UIFormwork/UIManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Constant_1 = require("./Constant");
var BaseUIForm_1 = require("./BaseUIForm");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var E_UIForm_1 = require("./E_UIForm");
var UIManager = /** @class */ (function (_super) {
    __extends(UIManager, _super);
    function UIManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mDebugLabel = null;
        _this.testLabel = "1111";
        //unshift加入,[..]出是堆栈
        //push加入,[..]出是队列
        //-unshift加入 pop返回并删除/队列
        //所有窗体缓存集合
        _this.mAllUIFormMap = new Map();
        //当前堆栈显示的窗体集合-push加入  pop返回并删除/堆栈
        _this.mCurStackShowUIFormArry = new Array();
        //已经加载过的窗体-判断是否设置过父节点
        _this.mAlreadyOpenUIFormArry = new Array();
        //当前显示的集合(不包括堆栈中的集合)
        _this.mCurShowUIFromMap = new Map();
        _this.mGameCanvas = null;
        //全屏幕显示的节点
        _this.mNormalNode = null;
        //固定显示的节点
        _this.mFixedNode = null;
        //弹出节点
        _this.mPopUpNode = null;
        _this.isLoadAsses = true;
        return _this;
    }
    UIManager_1 = UIManager;
    UIManager.instance = function () {
        if (this.mInstance == null) {
            var root = cc.find("root");
            var uiManagerNode = new cc.Node("_UIManager");
            this.mInstance = uiManagerNode.addComponent(UIManager_1);
            root.addChild(uiManagerNode);
            uiManagerNode.setPosition(0, 0);
        }
        return this.mInstance;
    };
    UIManager.prototype.onLoad = function () {
    };
    /**
     * 实例化框架
     */
    UIManager.prototype.InitUIRoot = function () {
        if (this.mGameCanvas != null) {
            return;
        }
        var self = this;
        var canvas = null;
        this.mGameCanvas = this.mAllUIFormMap.get("Canvas");
        cc.director.getScene().addChild(self.mGameCanvas);
        self.mGameCanvas.setPosition(480, 320);
        self.node.parent = null;
        self.mGameCanvas.getChildByName(Constant_1.default.mScriptMgr).addChild(self.node);
        self.node.setPosition(0, 0);
        self.testLabel = self.node.name;
        self.mNormalNode = self.mGameCanvas.getChildByName(Constant_1.default.mNomal);
        self.mFixedNode = self.mGameCanvas.getChildByName(Constant_1.default.mFixed);
        self.mPopUpNode = self.mGameCanvas.getChildByName(Constant_1.default.mPopUp);
        self.mDebugLabel = self.mGameCanvas.getComponentInChildren(cc.Label);
    };
    /**
     * 打开窗体
     * @param uiFormName 窗体名称
     */
    UIManager.prototype.ShowUIForms = function (uiFormName) {
        var thisUIForm = null;
        thisUIForm = this.LoadFormsToAllUIFormsCatch(uiFormName);
        if (thisUIForm == null) {
            cc.log("没有将[" + uiFormName + "]加入到集合");
            return null;
        }
        //是否清空“栈集合”中得数据
        if (thisUIForm.GetUIType.IsClearStack) {
            this.ClearStackArray();
        }
        //根据窗体类型做处理
        switch (thisUIForm.GetUIType.UIForms_ShowMode) {
            case E_UIForm_1.UIFormShowMode.Normal:
                this.PushUIToCurrentCache(uiFormName);
                break;
            case E_UIForm_1.UIFormShowMode.ReverseChange:
                this.PushUIFormToStack(uiFormName);
                break;
            case E_UIForm_1.UIFormShowMode.HideOther:
                this.PushUIFormsAndHideOther(uiFormName);
                break;
        }
        //TODO-打开窗体动画事件
        switch (thisUIForm.GetUIType.UIForm_AnimType) {
            case E_UIForm_1.AnimType.TopToBottom:
                //TODO此处做窗体动画,并active
                break;
            case E_UIForm_1.AnimType.SmallToBig:
                thisUIForm.node.runAction(cc.scaleTo(0.2, 1, 1));
                //TODO此处做窗体动画,并active
                break;
            //.....
        }
    };
    /**
    * 关闭窗体
    * @param uiFormName 窗体名称
    */
    UIManager.prototype.CloseUIForms = function (uiFormName) {
        var thisCloseUIForm = null;
        thisCloseUIForm = this.LoadFormsToAllUIFormsCatch(uiFormName);
        if (thisCloseUIForm == null) {
            cc.log("没有将[" + uiFormName + "]加入到集合");
            return null;
        }
        //根据窗体类型做处理
        switch (thisCloseUIForm.GetUIType.UIForms_ShowMode) {
            case E_UIForm_1.UIFormShowMode.Normal:
                this.CloseNomalUIForm(uiFormName);
                break;
            case E_UIForm_1.UIFormShowMode.ReverseChange:
                this.ClosePopUIFrom(uiFormName);
                break;
            case E_UIForm_1.UIFormShowMode.HideOther:
                this.CloseAndDisplayOtherUIForms(uiFormName);
                break;
        }
        //TODO-关闭窗体动画事件
        switch (thisCloseUIForm.GetUIType.UIForm_AnimType) {
            case E_UIForm_1.AnimType.TopToBottom:
                //TODO此处做窗体动画,并UnActive
                break;
            case E_UIForm_1.AnimType.SmallToBig:
                thisCloseUIForm.node.runAction(cc.scaleTo(0.2, 0, 0));
                //TODO此处做窗体动画,并UnActive
                break;
            //.....
        }
    };
    /**
    * 从所有缓存中获取窗体
    * @param uiFormName 窗体名称
    */
    UIManager.prototype.LoadFormsToAllUIFormsCatch = function (uiFormName) {
        var thisUIForm = null;
        var thisUIFormNode = this.mAllUIFormMap.get(uiFormName);
        if (thisUIFormNode == null) {
            cc.log("没有将[" + uiFormName + "]加入到集合");
            return null;
        }
        thisUIForm = thisUIFormNode.getComponent(BaseUIForm_1.default);
        for (var index = 0; index < this.mAlreadyOpenUIFormArry.length; index++) {
            var element = this.mAlreadyOpenUIFormArry[index];
            if (element == thisUIFormNode.name) {
                return thisUIForm;
            }
        }
        this.mAlreadyOpenUIFormArry.push(thisUIFormNode.name);
        this.mGameCanvas.addChild(thisUIFormNode);
        thisUIFormNode.parent = null;
        switch (thisUIForm.GetUIType.UIForms_Type) {
            case E_UIForm_1.UIFormType.Normal:
                this.mNormalNode.addChild(thisUIFormNode);
                break;
            case E_UIForm_1.UIFormType.Fixed:
                this.mFixedNode.addChild(thisUIFormNode);
                break;
            case E_UIForm_1.UIFormType.PopUp:
                this.mPopUpNode.addChild(thisUIFormNode);
                break;
        }
        thisUIFormNode.setPosition(0, 0);
        return thisUIForm;
    };
    /*废弃
    LoadUIForm(uiFormName: string): BaseUIForm {
        var inCount: number = 0;
        var thisUIForm: BaseUIForm = null;
        var thisUIFormNode: cc.Node = null;
        var newNode: cc.Prefab = null;
        newNode = ResourcesMar.LoadUIForm<cc.Prefab>("UIForm", uiFormName);
        return thisUIForm;
    }*/
    /**
     * 加载窗体到mCurShowUIFromMap
     * @param uiFormName 窗体名称
     */
    UIManager.prototype.PushUIToCurrentCache = function (uiFormName) {
        if (!this.mCurShowUIFromMap.has(uiFormName)) {
            var curShowUIFromNode = this.mAllUIFormMap.get(uiFormName);
            var curShowUIFrom = curShowUIFromNode.getComponent(BaseUIForm_1.default);
            this.mCurShowUIFromMap.set(uiFormName, curShowUIFrom);
            curShowUIFrom.ActiveUIForm();
        }
    };
    /**
     * 加载窗体到mCurStackShowUIFormArry
     * @param uiFormName
     */
    UIManager.prototype.PushUIFormToStack = function (uiFormName) {
        var curShowUIFrom = null;
        for (var index = 0; index < this.mCurStackShowUIFormArry.length; index++) {
            curShowUIFrom = this.mCurStackShowUIFormArry[index];
            if (curShowUIFrom.node.name == uiFormName) {
                return;
            }
        }
        if (this.mCurStackShowUIFormArry.length > 0) {
            var topShowUIForm = this.mCurStackShowUIFormArry.pop();
            topShowUIForm.Freeze();
            this.mCurStackShowUIFormArry.push(topShowUIForm);
        }
        var curShowUIFromNode = this.mAllUIFormMap.get(uiFormName);
        curShowUIFrom = curShowUIFromNode.getComponent(BaseUIForm_1.default);
        if (curShowUIFrom != null) {
            //当前窗口显示状态
            curShowUIFrom.ActiveUIForm();
            //把指定的UI窗体，入栈操作。
            this.mCurStackShowUIFormArry.push(curShowUIFrom);
        }
    };
    /**
     * 打开隐藏其他窗体类型
     * @param uiFormName
     */
    UIManager.prototype.PushUIFormsAndHideOther = function (uiFormName) {
        this.mCurStackShowUIFormArry.forEach(function (v, k) {
            var curShowUIFromMap = v;
            curShowUIFromMap.UnActiveUIForm();
            curShowUIFromMap.node.active = false;
        });
        this.mCurShowUIFromMap.forEach(function (v, k) {
            var curUIFormNode = v;
            curUIFormNode.getComponent(BaseUIForm_1.default).UnActiveUIForm();
        });
        this.PushUIToCurrentCache(uiFormName);
    };
    /**
     * 普通窗体关闭
     * @param uiFormName
     */
    UIManager.prototype.CloseNomalUIForm = function (uiFormName) {
        var thisCloseUIForm = this.mCurShowUIFromMap.get(uiFormName);
        if (!thisCloseUIForm) {
            return;
        }
        thisCloseUIForm.getComponent(BaseUIForm_1.default).UnActiveUIForm();
        this.mCurShowUIFromMap.delete(uiFormName);
    };
    /**
     * 弹出窗体关闭
     * @param uiFormName
     */
    UIManager.prototype.ClosePopUIFrom = function (uiFormName) {
        var thisCloseUIForm = null;
        if (this.mCurStackShowUIFormArry.length >= 2) {
            thisCloseUIForm = this.mCurStackShowUIFormArry.pop();
            thisCloseUIForm.UnActiveUIForm();
            thisCloseUIForm = this.mCurStackShowUIFormArry.pop();
            thisCloseUIForm.Redisplay();
            this.mCurStackShowUIFormArry.push(thisCloseUIForm);
        }
        if (this.mCurStackShowUIFormArry.length == 1) {
            thisCloseUIForm = this.mCurStackShowUIFormArry.pop();
            thisCloseUIForm.UnActiveUIForm();
        }
    };
    /**
     * 隐藏其它窗体关闭
     * @param uiFormName
     */
    UIManager.prototype.CloseAndDisplayOtherUIForms = function (uiFormName) {
        this.CloseNomalUIForm(uiFormName);
        this.mCurStackShowUIFormArry.forEach(function (v, k) {
            var curShowUIFromMap = v;
            curShowUIFromMap.Redisplay();
        });
        this.mCurShowUIFromMap.forEach(function (v, k) {
            var curUIFormNode = v;
            curUIFormNode.getComponent(BaseUIForm_1.default).Redisplay();
        });
    };
    /**
     * 清空栈集合,并隐藏栈中所有窗体
     */
    UIManager.prototype.ClearStackArray = function () {
        if (this.mCurStackShowUIFormArry.length > 0) {
            this.mCurStackShowUIFormArry.forEach(function (v, k) {
                var curShowUIFromMap = v;
                curShowUIFromMap.UnActiveUIForm();
            });
            this.mCurStackShowUIFormArry.length = 0;
        }
    };
    var UIManager_1;
    UIManager.mInstance = null;
    __decorate([
        property(cc.Label)
    ], UIManager.prototype, "mDebugLabel", void 0);
    UIManager = UIManager_1 = __decorate([
        ccclass
    ], UIManager);
    return UIManager;
}(cc.Component));
exports.default = UIManager;

cc._RF.pop();