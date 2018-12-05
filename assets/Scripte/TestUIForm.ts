import EventDispatch from "./UIFormwork/EventDispatch";
import { Node, Float, FillType, Component, Scheduler, Label } from './../../creator.d';
import UIManager from './UIFormwork/UIManager';
import BaseUIForm from './UIFormwork/BaseUIForm';
import ResourcesMar from './UIFormwork/ResourcesMar';
const { ccclass, property } = cc._decorator;

@ccclass
export default class TestUIForm extends cc.Component {


    //预加载的所有预制
    @property(cc.Prefab)
    mUIFromsArry = new Array();
    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Sprite)
    mFillAmount: cc.Sprite = null;

    mTestMap = new Map();
    //所有窗体Map集合1.名字|2,节点
    mUIFromsMap: Map<string, cc.Node> = new Map();
    mUIFormArryCount: Float = null;
    mUIFormMapSize: Float = null;
    onLoad() {
        //this.constructor();
        this.mUIFormArryCount = this.mUIFromsArry.length;
        this.mUIFromsArry.forEach(element => {
            var newPrefab = null;
            newPrefab = cc.instantiate(element);
            var newNode: cc.Node = newPrefab;
            this.mUIFromsMap.set(newNode.name, newNode);
            this.mUIFormMapSize = this.mUIFromsMap.size;
            UIManager.instance().mAllUIFormMap.set(newNode.name, newNode);
            var fill = this.mUIFormMapSize / this.mUIFormArryCount * 100
            this.label.string = "加载资源中..." + fill + "%";
            this.mFillAmount.fillRange += fill;
        });

        //加载完成进入场景,创建游戏主界面Canvas
        UIManager.instance().InitUIRoot();
    }

    update() {
        if (this.mUIFormArryCount > this.mUIFromsMap.size) {
            this.label.string = this.mUIFromsMap.size.toString();
        } else {
            var self = this;
            this.scheduleOnce(function () {
                UIManager.instance().ShowUIForms("MainUIForm");
                self.node.active = false;
            }, 0.5)
            //UIManager.instance().ShowUIForms("MainUIForm");
            //this.node.active = false;
        }
    }
}
