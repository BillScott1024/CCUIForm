"use strict";
cc._RF.push(module, 'c5334uSdjJBZKYIOOhAPNp/', 'BaseUIForm');
// Scripte/UIFormwork/BaseUIForm.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 *    Title: UI框架项目
 *           主题: UI窗体的父类
 *    Description:
 *           功能：定义所有UI窗体的父类。
 *           定义四个生命周期
 *
 *           1：Display 显示状态。
 *           2：Hiding 隐藏状态
 *           3：ReDisplay 再显示状态。
 *           4：Freeze 冻结状态。
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */
var UIType_1 = require("./UIType");
var UIMaskMgr_1 = require("./UIMaskMgr");
var UIManager_1 = require("./UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CCCompentHelper_1 = require("./CCCompentHelper");
var E_UIForm_1 = require("./E_UIForm");
var BaseUIForm = /** @class */ (function (_super) {
    __extends(BaseUIForm, _super);
    function BaseUIForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //窗体类型
        _this.uiType = new UIType_1.default();
        _this.label = null;
        return _this;
    }
    Object.defineProperty(BaseUIForm.prototype, "GetUIType", {
        get: function () {
            return this.uiType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseUIForm.prototype, "SetUIType", {
        set: function (e_type) {
            this.uiType = e_type;
        },
        enumerable: true,
        configurable: true
    });
    BaseUIForm.prototype.onLoad = function () {
    };
    /**
     * 当前窗体显示
     */
    BaseUIForm.prototype.ActiveUIForm = function () {
        //当前无动画直接显示,有动画,在动画中显示
        if (this.GetUIType.UIForm_AnimType == E_UIForm_1.AnimType.Normal) {
            this.node.active = true;
        }
        //设置模态窗体调用(必须是弹出窗体)
        if (this.GetUIType.UIForms_Type == E_UIForm_1.UIFormType.PopUp) {
            //UIMaskMgr.GetInstance().SetMaskWindow(this.gameObject, _CurrentUIType.UIForm_LucencyType);
            UIMaskMgr_1.default.instance().SetMaskNode(this.node, this.uiType.UIForm_LucencyType);
        }
    };
    /**
     * 当前窗体隐藏
     */
    BaseUIForm.prototype.UnActiveUIForm = function () {
        //当前无动画直接显示,有动画,在动画中显示
        if (this.uiType.UIForm_AnimType == E_UIForm_1.AnimType.Normal) {
            this.node.active = false;
        }
        //取消模态窗体调用
        if (this.uiType.UIForms_Type == E_UIForm_1.UIFormType.PopUp) {
            UIMaskMgr_1.default.instance().CancelMaskNode();
        }
    };
    /**
     * 重新显示当前窗体
     */
    BaseUIForm.prototype.Redisplay = function () {
        this.node.active = true;
        //设置模态窗体调用(必须是弹出窗体)
        if (this.uiType.UIForms_Type == E_UIForm_1.UIFormType.PopUp) {
            UIMaskMgr_1.default.instance().SetMaskNode(this.node, this.uiType.UIForm_LucencyType);
        }
    };
    //冻结当前窗体
    BaseUIForm.prototype.Freeze = function () {
        this.node.active = true;
    };
    /**
     * 注册按钮事件-子类直接调用
     * @param parent 按钮父根节点
     * @param btnName 按钮名称
     * @param callBack 回调
     */
    BaseUIForm.prototype.RigisterButtonObjectEvent = function (parent, btnName, callBack) {
        var btnNode = CCCompentHelper_1.default.FindChildNode(parent, btnName);
        btnNode.on(cc.Node.EventType.TOUCH_START, function () {
            //btnNode.runAction(cc.scaleTo(0.9, 0.9));
        });
        btnNode.on(cc.Node.EventType.TOUCH_END, function () {
            callBack();
            //btnNode.runAction(cc.scaleTo(0.1,1.1, 1.1));
            //btnNode.runAction(cc.scaleTo(0.2,1, 1));
        });
    };
    /**
     * 打开窗体
     * @param uiFormName
     */
    BaseUIForm.prototype.OpenUIForm = function (uiFormName) {
        UIManager_1.default.instance().ShowUIForms(uiFormName);
    };
    /**
     * 关闭当前窗体
     * @param uiFormName
     */
    BaseUIForm.prototype.CloseUIForm = function (uiFormName) {
        UIManager_1.default.instance().CloseUIForms(uiFormName);
    };
    __decorate([
        property(cc.Label)
    ], BaseUIForm.prototype, "label", void 0);
    BaseUIForm = __decorate([
        ccclass
    ], BaseUIForm);
    return BaseUIForm;
}(cc.Component));
exports.default = BaseUIForm;

cc._RF.pop();