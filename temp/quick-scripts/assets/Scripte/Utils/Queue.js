(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Scripte/Utils/Queue.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd2102kIoDVO2IKZXZ7Jjq5n', 'Queue', __filename);
// Scripte/Utils/Queue.ts

/**
 *    Title: UI框架项目
 *           主题: 队列
 *           功能: 先进先出
 *
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Queue = /** @class */ (function () {
    function Queue() {
        this.length = 0;
    }
    /**
     * 尾部添加元素（进队）
     * @param items 元素列表
     * @returns 长度
     */
    Queue.prototype.enqueue = function () {
        var _this = this;
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        items.forEach(function (item) {
            var node = { item: item, next: null };
            if (_this.last)
                _this.last.next = node;
            _this.last = node;
            if (!_this.first)
                _this.first = node;
            _this.length++;
        });
        return this.length;
    };
    /**
     * 头部移除元素（出队）
     */
    Queue.prototype.dequeue = function () {
        var removeitem = this.first ? this.first.item : undefined;
        if (this.length == 1)
            this.first = this.last = null;
        if (this.first)
            this.first = this.first.next;
        return removeitem;
    };
    /**
     * 转换为数组
     */
    Queue.prototype.toArray = function () {
        var arr = [];
        var node = this.first;
        while (node) {
            arr.push(node.item);
            node = node.next;
        }
        return arr;
    };
    /**
     * 从数组初始化链表
     */
    Queue.prototype.fromArray = function (array) {
        this.first = this.last = null;
        this.enqueue.apply(this, array);
        return this;
    };
    Queue = __decorate([
        ccclass
    ], Queue);
    return Queue;
}());
exports.default = Queue;

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
        //# sourceMappingURL=Queue.js.map
        