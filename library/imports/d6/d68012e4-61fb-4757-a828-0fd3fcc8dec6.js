"use strict";
cc._RF.push(module, 'd6801LkYftHV6goD9P8yN7G', 'Map');
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