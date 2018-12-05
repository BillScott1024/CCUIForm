(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripte/UIFormwork/ResourcesMar.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2fdf857nGZAlaw61u8SNXpJ', 'ResourcesMar', __filename);
// Scripte/UIFormwork/ResourcesMar.ts

/**
 *    Title: UI框架项目
 *           主题: 资源管理器
 *    Description:
 *           功能：资源加载辅助工具类。
 *
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ResourcesMar = /** @class */ (function (_super) {
    __extends(ResourcesMar, _super);
    function ResourcesMar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 窗体加载 -暂时没用
     * @param packetPath
     * @param resName
     */
    ResourcesMar.LoadUIForm = function (packetPath, resName) {
        cc.loader.loadRes(packetPath + "/" + resName, function (err, prefab) {
            return cc.instantiate(prefab);
        });
        return null;
    };
    ResourcesMar = __decorate([
        ccclass
    ], ResourcesMar);
    return ResourcesMar;
}(cc.Component));
exports.default = ResourcesMar;

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
        //# sourceMappingURL=ResourcesMar.js.map
        