"use strict";
cc._RF.push(module, 'af3c9QrI5VAYIENRkE1esty', 'HideOtherUIForm');
// Scripte/HideOtherUIForm.ts

/**
 * 隐藏所有窗体演示
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BaseUIForm_1 = require("./UIFormwork/BaseUIForm");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var E_UIForm_1 = require("./UIFormwork/E_UIForm");
var HideOtherUIForm = /** @class */ (function (_super) {
    __extends(HideOtherUIForm, _super);
    function HideOtherUIForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HideOtherUIForm.prototype.onLoad = function () {
        this.GetUIType.UIForms_ShowMode = E_UIForm_1.UIFormShowMode.HideOther;
        this.GetUIType.UIForm_AnimType = E_UIForm_1.AnimType.Normal;
        this.GetUIType.UIForm_LucencyType = E_UIForm_1.UIFormLucenyType.NoLucency;
        this.GetUIType.UIForms_Type = E_UIForm_1.UIFormType.Normal;
        //只要使用父类的RigisterButtonObjectEvent注册按钮事件,必须带有一个参数
        //参考下方:CloseSelfUIForm
        this.RigisterButtonObjectEvent(this.node, "Close", this.CloseSelfUIForm.bind(this));
    };
    HideOtherUIForm.prototype.start = function () {
        cc.log(this.node.parent.name);
    };
    /**
     * 此事件为本节点下的按钮节点注册事件,参数与方法体的指向必须使用self,
     * 此self为上层注册事件时this的代指
     * @param self
     */
    HideOtherUIForm.prototype.CloseSelfUIForm = function () {
        this.CloseUIForm(this.node.name);
    };
    HideOtherUIForm = __decorate([
        ccclass
    ], HideOtherUIForm);
    return HideOtherUIForm;
}(BaseUIForm_1.default));
exports.default = HideOtherUIForm;

cc._RF.pop();