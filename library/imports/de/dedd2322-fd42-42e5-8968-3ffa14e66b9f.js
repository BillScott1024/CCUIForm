"use strict";
cc._RF.push(module, 'dedd2Mi/UJC5YloP/oU5muf', 'EventDispatch');
// Scripte/UIFormwork/EventDispatch.ts

/**
 *    Title: UI框架项目
 *           主题: 事件调度器
 *    Description:
 *           功能：解耦界面之间的数据传递。
 *
 *
 *    Date: 2018.6.11
 *    Version: 0.1版本
 *    by : wxy
 */
Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatch = /** @class */ (function () {
    function EventDispatch() {
    }
    /**
     * 注册事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    EventDispatch.register = function (name, callback, context) {
        var observers = EventDispatch.listeners[name];
        if (!observers) {
            EventDispatch.listeners[name] = [];
        }
        EventDispatch.listeners[name].push(new Observer(callback, context));
    };
    /**
     * 移除事件
     * @param name 事件名称
     * @param callback 回调函数
     * @param context 上下文
     */
    EventDispatch.remove = function (name, callback, context) {
        var observers = EventDispatch.listeners[name];
        if (!observers)
            return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
            var observer = observers[i];
            if (observer.compar(context)) {
                observers.splice(i, 1);
                break;
            }
        }
        if (observers.length == 0) {
            delete EventDispatch.listeners[name];
        }
    };
    /**
     * 发送事件
     * @param name 事件名称
     */
    EventDispatch.fire = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var observers = EventDispatch.listeners[name];
        if (!observers)
            return;
        var length = observers.length;
        for (var i = 0; i < length; i++) {
            var observer = observers[i];
            observer.notify.apply(observer, [name].concat(args));
        }
    };
    /** 监听数组 */
    EventDispatch.listeners = {};
    return EventDispatch;
}());
exports.default = EventDispatch;
/**
 * 观察者
 */
var Observer = /** @class */ (function () {
    function Observer(callback, context) {
        /** 回调函数 */
        this.callback = null;
        /** 上下文 */
        this.context = null;
        var self = this;
        self.callback = callback;
        self.context = context;
    }
    /**
     * 发送通知
     * @param args 不定参数
     */
    Observer.prototype.notify = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _a;
        var self = this;
        (_a = self.callback).call.apply(_a, [self.context].concat(args));
    };
    /**
     * 上下文比较
     * @param context 上下文
     */
    Observer.prototype.compar = function (context) {
        return context == this.context;
    };
    return Observer;
}());

cc._RF.pop();