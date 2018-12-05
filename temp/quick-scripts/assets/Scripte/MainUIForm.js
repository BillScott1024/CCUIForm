(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripte/MainUIForm.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6951eZlnetKDKC/AJLqqUSZ', 'MainUIForm', __filename);
// Scripte/MainUIForm.ts

/**
 * 一般窗体演示
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BaseUIForm_1 = require("./UIFormwork/BaseUIForm");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var E_UIForm_1 = require("./UIFormwork/E_UIForm");
var MainUIForm = /** @class */ (function (_super) {
    __extends(MainUIForm, _super);
    function MainUIForm() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainUIForm.prototype.onLoad = function () {
        this.GetUIType.UIForms_ShowMode = E_UIForm_1.UIFormShowMode.Normal;
        this.GetUIType.UIForm_AnimType = E_UIForm_1.AnimType.Normal;
        this.GetUIType.UIForm_LucencyType = E_UIForm_1.UIFormLucenyType.ImPenetrable;
        this.GetUIType.UIForms_Type = E_UIForm_1.UIFormType.Normal;
        this.GetUIType.IsClearStack = true;
        //只要使用父类的RigisterButtonObjectEvent注册按钮事件,必须带有一个参数
        //参考下方:OpenOther
        this.RigisterButtonObjectEvent(this.node, "openPopUpUIForm", this.OpenOther.bind(this));
    };
    MainUIForm.prototype.start = function () {
        cc.log(this.node.parent.name);
    };
    /**
    * 此事件为本节点下的按钮节点注册事件,参数与方法体的指向必须使用self,
    * 此self为上层注册事件时this的代指
    * @param self
    */
    MainUIForm.prototype.OpenOther = function () {
        this.OpenUIForm("PopUpUIForm");
    };
    MainUIForm = __decorate([
        ccclass
    ], MainUIForm);
    return MainUIForm;
}(BaseUIForm_1.default));
exports.default = MainUIForm;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=MainUIForm.js.map
        