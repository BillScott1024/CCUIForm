(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripte/UIFormwork/CCCompentHelper.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ecf37c41JhD5Z1pybgqbIn0', 'CCCompentHelper', __filename);
// Scripte/UIFormwork/CCCompentHelper.ts

/***
 *
 *    Title: UI框架项目
 *           主题： 节点辅助工具类
 *    Description:
 *           功能： 提供程序用户一些常用的功能方法实现，方便程序员快速开发。
 *
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var CCCompentHelper = /** @class */ (function (_super) {
    __extends(CCCompentHelper, _super);
    function CCCompentHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 获取父类下任意子孙节点
     * @param parentNode 父节点名称
     * @param childName 子孙节点名称
     */
    CCCompentHelper.FindChildNode = function (parentNode, childName) {
        var self = this;
        var chaildNodes = null;
        var childNode = null;
        chaildNodes = parentNode.getComponentsInChildren(cc.Component);
        for (var i = 0; i < chaildNodes.length; i++) {
            var element = chaildNodes[i];
            var curNodeName = element.name;
            var index = curNodeName.indexOf('<');
            if (index >= 0) {
                curNodeName = curNodeName.substr(0, index);
            }
            if (curNodeName == childName) {
                childNode = element.node;
                break;
            }
        }
        return childNode;
    };
    /**
     * 重新设置任意节点的父对象
     * @param newParent 新父节点
     * @param childName 子节点名称
     * @param oldParent 旧父节点,可选,不填从Canvas查找,耗!
     */
    CCCompentHelper.SetNodeParent = function (newParent, childName, oldParent) {
        if (oldParent == null) {
            oldParent = cc.find("Canvas") || cc.find("Root");
        }
        var chaildNode = this.FindChildNode(oldParent, childName);
        chaildNode.parent = newParent;
    };
    CCCompentHelper = __decorate([
        ccclass
    ], CCCompentHelper);
    return CCCompentHelper;
}(cc.Component));
exports.default = CCCompentHelper;

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
        //# sourceMappingURL=CCCompentHelper.js.map
        