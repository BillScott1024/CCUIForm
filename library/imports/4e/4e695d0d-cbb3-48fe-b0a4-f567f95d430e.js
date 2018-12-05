"use strict";
cc._RF.push(module, '4e6950Ny7NI/rCk9Wf5XUMO', 'PopUpUIForm');
// Scripte/PopUpUIForm.ts

/**
 * 弹出窗体演示
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BaseUIForm_1 = require("./UIFormwork/BaseUIForm");
var UIMaskMgr_1 = require("./UIFormwork/UIMaskMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var E_UIForm_1 = require("./UIFormwork/E_UIForm");
var PopUpUIForm = /** @class */ (function (_super) {
    __extends(PopUpUIForm, _super);
    function PopUpUIForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PopUpUIForm.prototype.onLoad = function () {
        this.GetUIType.UIForms_ShowMode = E_UIForm_1.UIFormShowMode.ReverseChange;
        this.GetUIType.UIForm_AnimType = E_UIForm_1.AnimType.SmallToBig;
        this.GetUIType.UIForm_LucencyType = E_UIForm_1.UIFormLucenyType.ImPenetrable;
        this.GetUIType.UIForms_Type = E_UIForm_1.UIFormType.PopUp;
        //只要使用父类的RigisterButtonObjectEvent注册按钮事件,必须带有一个参数
        //参考下方:OpenOther/CloseSelfUIForm
        this.RigisterButtonObjectEvent(this.node, "OpenHideOther", this.OpenOther.bind(this));
        this.RigisterButtonObjectEvent(this.node, "Close", this.CloseSelfUIForm.bind(this));
        this.RigisterButtonObjectEvent(UIMaskMgr_1.default.instance().mMaskPanel, "_UIMaskPanel", this.CloseSelfUIForm.bind(this));
    };
    PopUpUIForm.prototype.start = function () {
        cc.log(this.node.parent.name);
    };
    /**
    * 此事件为本节点下的按钮节点注册事件,参数与方法体的指向必须使用self,
    * 此self为上层注册事件时this的代指
    * @param self
    */
    PopUpUIForm.prototype.OpenOther = function () {
        this.OpenUIForm("HideOtherUIForm");
    };
    /**
    * 此事件为本节点下的按钮节点注册事件,参数与方法体的指向必须使用self,
    * 此self为上层注册事件时this的代指
    * @param self
    */
    PopUpUIForm.prototype.CloseSelfUIForm = function () {
        cc.log(this.node.name);
        this.CloseUIForm(this.node.name);
    };
    PopUpUIForm = __decorate([
        ccclass
    ], PopUpUIForm);
    return PopUpUIForm;
}(BaseUIForm_1.default));
exports.default = PopUpUIForm;

cc._RF.pop();