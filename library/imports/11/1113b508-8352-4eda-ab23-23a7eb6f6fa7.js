"use strict";
cc._RF.push(module, '1113bUIg1JO2qsjI6frb2+n', 'UIMaskMgr');
// Scripte/UIFormwork/UIMaskMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
/***
 *
 *    Title: UI框架项目
 *           主题：   UI遮罩管理器
 *    Description:
 *           功能： 负责“弹出窗体”模态显示实现
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 *
 */
var Constant_1 = require("./Constant");
var CCCompentHelper_1 = require("./CCCompentHelper");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var E_UIForm_1 = require("./E_UIForm");
var UIMaskMgr = /** @class */ (function (_super) {
    __extends(UIMaskMgr, _super);
    function UIMaskMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        //根节点Canvas
        _this.mCanvas = null;
        //该脚本父节点
        _this.mScriptsParentNode = null;
        //遮罩节点
        _this.mMaskPanel = null;
        _this.mMaskColor = null;
        _this.mMaskStarZinde = 50;
        _this.mOldMaskZinde = 0;
        return _this;
    }
    UIMaskMgr_1 = UIMaskMgr;
    UIMaskMgr.instance = function () {
        if (this.mInstance == null) {
            var root = cc.find("Canvas");
            var maskManagerNode = new cc.Node("_UIMaskMgr");
            this.mInstance = maskManagerNode.addComponent(UIMaskMgr_1);
            root.getChildByName(Constant_1.default.mScriptMgr).addChild(maskManagerNode);
            maskManagerNode.setPosition(0, 0);
        }
        return this.mInstance;
    };
    UIMaskMgr.prototype.onLoad = function () {
        this.mScriptsParentNode = this.node.parent;
        this.mCanvas = cc.find("Canvas");
        var popNode = this.mCanvas.getChildByName(Constant_1.default.mPopUp);
        this.mMaskPanel = CCCompentHelper_1.default.FindChildNode(popNode, Constant_1.default.m_UIMaskPanel);
        this.mOldMaskZinde = this.mMaskPanel.zIndex;
    };
    /**
     * 设置遮罩透明样式
     * @param goDisplayUIForms
     * @param lucenyType
     */
    UIMaskMgr.prototype.SetMaskNode = function (goDisplayUIForms, lucenyType) {
        switch (lucenyType) {
            case E_UIForm_1.UIFormLucenyType.Lucency:
                this.mMaskPanel.active = true;
                this.mMaskPanel.opacity = 0;
                break;
            case E_UIForm_1.UIFormLucenyType.Translucence:
                this.mMaskPanel.active = true;
                this.mMaskPanel.opacity = 125;
                break;
            case E_UIForm_1.UIFormLucenyType.ImPenetrable:
                this.mMaskPanel.active = true;
                this.mMaskPanel.opacity = 90;
                break;
            case E_UIForm_1.UIFormLucenyType.Pentrate:
                if (this.mMaskPanel.active) {
                    this.mMaskPanel.active = false;
                }
                break;
            case E_UIForm_1.UIFormLucenyType.NoLucency:
                this.mMaskPanel.opacity = 255;
                break;
        }
        this.mMaskPanel.zIndex = this.mMaskStarZinde;
        this.mMaskStarZinde += 1;
        goDisplayUIForms.zIndex = this.mMaskStarZinde;
    };
    /**
     * 关闭遮罩
     */
    UIMaskMgr.prototype.CancelMaskNode = function () {
        if (this.mMaskPanel.active) {
            this.mMaskStarZinde = 50;
            this.mMaskPanel.zIndex = this.mOldMaskZinde;
            this.mMaskPanel.active = false;
        }
    };
    var UIMaskMgr_1;
    UIMaskMgr.mInstance = null;
    __decorate([
        property(cc.Label)
    ], UIMaskMgr.prototype, "label", void 0);
    __decorate([
        property
    ], UIMaskMgr.prototype, "text", void 0);
    UIMaskMgr = UIMaskMgr_1 = __decorate([
        ccclass
    ], UIMaskMgr);
    return UIMaskMgr;
}(cc.Component));
exports.default = UIMaskMgr;

cc._RF.pop();