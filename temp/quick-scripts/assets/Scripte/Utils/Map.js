(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripte/Utils/Map.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd6801LkYftHV6goD9P8yN7G', 'Map', __filename);
// Scripte/Utils/Map.ts

/**
 *    Title: UI框架项目
 *           主题: 字典
 *           功能: key,value
 *
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */
Map.prototype.getKeys = function () {
    var keys = [];
    this.forEach(function (v, k) {
        keys.push(k);
    });
    return keys;
};
Map.prototype.getValues = function () {
    var values = [];
    this.forEach(function (v, k) {
        values.push(v);
    });
    return values;
};

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
        //# sourceMappingURL=Map.js.map
        