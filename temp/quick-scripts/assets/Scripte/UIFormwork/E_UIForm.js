(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripte/UIFormwork/E_UIForm.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a743e1KBw5GmrALWAmUTdR6', 'E_UIForm', __filename);
// Scripte/UIFormwork/E_UIForm.ts

/**
 *    Title: UI框架项目
 *           主题: 窗体枚举
 *
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 窗体类型
 */
var UIFormType;
(function (UIFormType) {
    /**
     * 普通窗体
     */
    UIFormType[UIFormType["Normal"] = 0] = "Normal";
    /**
     * 固定窗体
     */
    UIFormType[UIFormType["Fixed"] = 1] = "Fixed";
    /**
     * 弹出窗体
     */
    UIFormType[UIFormType["PopUp"] = 2] = "PopUp";
})(UIFormType || (UIFormType = {}));
exports.UIFormType = UIFormType;
/**
 * UI窗体的显示类型
 */
var UIFormShowMode;
(function (UIFormShowMode) {
    /**
     * 普通
     */
    UIFormShowMode[UIFormShowMode["Normal"] = 0] = "Normal";
    /**
    * 反向切换
    */
    UIFormShowMode[UIFormShowMode["ReverseChange"] = 1] = "ReverseChange";
    /**
     * 隐藏其他
     */
    UIFormShowMode[UIFormShowMode["HideOther"] = 2] = "HideOther";
})(UIFormShowMode || (UIFormShowMode = {}));
exports.UIFormShowMode = UIFormShowMode;
/**
 * 窗体动画类型
 */
var AnimType;
(function (AnimType) {
    /**
     * 无动画
     */
    AnimType[AnimType["Normal"] = 0] = "Normal";
    /**
     * 由大变小
     */
    AnimType[AnimType["BigToSmall"] = 1] = "BigToSmall";
    /**
     * 由小变大
     */
    AnimType[AnimType["SmallToBig"] = 2] = "SmallToBig";
    /**
     * 下拉
     */
    AnimType[AnimType["TopToBottom"] = 3] = "TopToBottom";
    /**
     * X缩放0
     */
    AnimType[AnimType["ScaleByX0"] = 4] = "ScaleByX0";
    /**
     * X缩放1
     */
    AnimType[AnimType["ScaleByX1"] = 5] = "ScaleByX1";
})(AnimType || (AnimType = {}));
exports.AnimType = AnimType;
/**
 * UI窗体透明度类型
 */
var UIFormLucenyType;
(function (UIFormLucenyType) {
    /**
     * 完全透明，屏蔽事件
     */
    UIFormLucenyType[UIFormLucenyType["Lucency"] = 0] = "Lucency";
    /**
     * 半透明，屏蔽事件
     */
    UIFormLucenyType[UIFormLucenyType["Translucence"] = 1] = "Translucence";
    /**
     * 低透明度，屏蔽事件
     */
    UIFormLucenyType[UIFormLucenyType["ImPenetrable"] = 2] = "ImPenetrable";
    /**
     * 高透明度，屏蔽事件
     */
    UIFormLucenyType[UIFormLucenyType["HightPenetrable"] = 3] = "HightPenetrable";
    /**
     * 窗体下的窗体事件不遮挡
     */
    UIFormLucenyType[UIFormLucenyType["Pentrate"] = 4] = "Pentrate";
    /**
     * 不透明
     */
    UIFormLucenyType[UIFormLucenyType["NoLucency"] = 5] = "NoLucency";
})(UIFormLucenyType || (UIFormLucenyType = {}));
exports.UIFormLucenyType = UIFormLucenyType;

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
        //# sourceMappingURL=E_UIForm.js.map
        