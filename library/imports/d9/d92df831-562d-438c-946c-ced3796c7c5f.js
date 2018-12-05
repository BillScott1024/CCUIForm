"use strict";
cc._RF.push(module, 'd92dfgxVi1DjJRsztN5bHxf', 'Stack');
// Scripte/Utils/Stack.ts

/**
 *    Title: UI框架项目
 *           主题: 栈
 *           功能: 后进先去
 *
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */
var Item = /** @class */ (function () {
    function Item(value, next) {
        if (next === void 0) { next = null; }
        this._value = value;
        this._next = next;
    }
    Object.defineProperty(Item.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (next) {
            this._next = next;
        },
        enumerable: true,
        configurable: true
    });
    return Item;
}());
var Stack = /** @class */ (function () {
    function Stack() {
        this._size = 0;
        this._header = new Item(null);
    }
    Stack.prototype.top = function () {
        if (this._size === 0) {
            return null;
        }
        return this._header.next.value;
    };
    /**
     * 入栈
     * @param item 添加的元素
     * 将header的下一个元素的引用赋值给新元素的next
     * 再将新元素赋值给header的next
     */
    Stack.prototype.push = function (item) {
        var newItem = new Item(item);
        newItem.next = this._header.next;
        this._header.next = newItem;
        this._size++;
    };
    /**
     * 出栈
     * 将header之后的第一个元素移除
     * 同时修改header的next到下一个元素
     */
    Stack.prototype.pop = function () {
        if (this._size === 0) {
            return null;
        }
        var item = this._header.next;
        this._header.next = item.next;
        this._size--;
        item.next = null; //清除引用
        return item.value;
    };
    Stack.prototype.empty = function () {
        return this._size === 0;
    };
    Stack.prototype.size = function () {
        return this._size;
    };
    return Stack;
}());

cc._RF.pop();