"use strict";
cc._RF.push(module, '932d3yqM4xK3Jfdf0iXmaLD', 'UIType');
// Scripte/UIFormwork/UIType.ts

/**
 *    Title: UI框架项目
 *           主题: 窗体类型
 *
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */
Object.defineProperty(exports, "__esModule", { value: true });
var E_UIForm_1 = require("./E_UIForm");
var UIType = /** @class */ (function () {
    function UIType() {
        /**
         * 是否清空“栈集合”
         */
        this.IsClearStack = false;
        /**
         * UI窗体（位置）类型
         */
        this.UIForms_Type = E_UIForm_1.UIFormType.Normal;
        /**
         * UI窗体显示类型
         */
        this.UIForms_ShowMode = E_UIForm_1.UIFormShowMode.Normal;
        /**
         * UI窗体弹出动画类型
         */
        this.UIForm_AnimType = E_UIForm_1.AnimType.Normal;
        /**
         * UI窗体透明度类型
         */
        this.UIForm_LucencyType = E_UIForm_1.UIFormLucenyType.Lucency;
    }
    return UIType;
}());
exports.UIType = UIType;
exports.default = UIType;

cc._RF.pop();