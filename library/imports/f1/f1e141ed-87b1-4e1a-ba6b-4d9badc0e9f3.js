"use strict";
cc._RF.push(module, 'f1e14Hth7FOGrprTZutwOnz', 'TestUIForm');
// Scripte/TestUIForm.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIManager_1 = require("./UIFormwork/UIManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TestUIForm = /** @class */ (function (_super) {
    __extends(TestUIForm, _super);
    function TestUIForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //预加载的所有预制
        _this.mUIFromsArry = new Array();
        _this.label = null;
        _this.mFillAmount = null;
        _this.mTestMap = new Map();
        //所有窗体Map集合1.名字|2,节点
        _this.mUIFromsMap = new Map();
        _this.mUIFormArryCount = null;
        _this.mUIFormMapSize = null;
        return _this;
    }
    TestUIForm.prototype.onLoad = function () {
        var _this = this;
        //this.constructor();
        this.mUIFormArryCount = this.mUIFromsArry.length;
        this.mUIFromsArry.forEach(function (element) {
            var newPrefab = null;
            newPrefab = cc.instantiate(element);
            var newNode = newPrefab;
            _this.mUIFromsMap.set(newNode.name, newNode);
            _this.mUIFormMapSize = _this.mUIFromsMap.size;
            UIManager_1.default.instance().mAllUIFormMap.set(newNode.name, newNode);
            var fill = _this.mUIFormMapSize / _this.mUIFormArryCount * 100;
            _this.label.string = "加载资源中..." + fill + "%";
            _this.mFillAmount.fillRange += fill;
        });
        //加载完成进入场景,创建游戏主界面Canvas
        UIManager_1.default.instance().InitUIRoot();
    };
    TestUIForm.prototype.update = function () {
        if (this.mUIFormArryCount > this.mUIFromsMap.size) {
            this.label.string = this.mUIFromsMap.size.toString();
        }
        else {
            var self = this;
            this.scheduleOnce(function () {
                UIManager_1.default.instance().ShowUIForms("MainUIForm");
                self.node.active = false;
            }, 0.5);
            //UIManager.instance().ShowUIForms("MainUIForm");
            //this.node.active = false;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], TestUIForm.prototype, "mUIFromsArry", void 0);
    __decorate([
        property(cc.Label)
    ], TestUIForm.prototype, "label", void 0);
    __decorate([
        property(cc.Sprite)
    ], TestUIForm.prototype, "mFillAmount", void 0);
    TestUIForm = __decorate([
        ccclass
    ], TestUIForm);
    return TestUIForm;
}(cc.Component));
exports.default = TestUIForm;

cc._RF.pop();